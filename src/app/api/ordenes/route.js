import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { auth, pool } from '@/auth'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const address = formData.get('address')
    const paymentMethod = formData.get('paymentMethod')
    const total = formData.get('total')
    const cart = formData.get('cart')
    const capture = formData.get('capture')

    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 })
    }

    console.log('Debug - Session completa:', session)
    console.log('Debug - Session.user:', session.user)
    console.log('Debug - codclie:', session.user?.codclie)

    // Obtener el cliente desde la sesión
    const codclie = session.user.codclie
    if (!codclie) {
      return new Response(JSON.stringify({ 
        error: 'Cliente no identificado',
        session: session.user,
        codclie: session.user?.codclie
      }), { status: 400 })
    }

    // Guardar el archivo en /public/captures con nombre único
    if (!capture || typeof capture === 'string') {
      return new Response(JSON.stringify({ error: 'Archivo de comprobante inválido.' }), { status: 400 })
    }
    const buffer = Buffer.from(await capture.arrayBuffer())
    const ext = capture.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2,8)}.${ext}`
    const capturesDir = path.join(process.cwd(), 'public', 'captures')
    await mkdir(capturesDir, { recursive: true })
    const filePath = path.join(capturesDir, fileName)
    await writeFile(filePath, buffer)

    // Parsear el carrito
    const cartItems = JSON.parse(cart)
    const totalAmount = parseFloat(total)

    // Iniciar transacción para asegurar consistencia
    const client = await pool.connect()
    
    try {
      await client.query('BEGIN')

      // 1. VERIFICAR STOCK DISPONIBLE
      for (const item of cartItems) {
        const stockResult = await client.query(
          'SELECT existen FROM saprod WHERE codprod = $1',
          [item.codprod]
        )
        
        if (stockResult.rows.length === 0) {
          throw new Error(`Producto ${item.codprod} no encontrado`)
        }
        
        const currentStock = parseInt(stockResult.rows[0].existen)
        if (currentStock < item.quantity) {
          throw new Error(`Stock insuficiente para ${item.descrip}. Disponible: ${currentStock}, Solicitado: ${item.quantity}`)
        }
      }

      // 2. REDUCIR STOCK DE PRODUCTOS
      for (const item of cartItems) {
        await client.query(
          'UPDATE saprod SET existen = existen - $1 WHERE codprod = $2',
          [item.quantity, item.codprod]
        )
      }

      // 3. CREAR FACTURA EN safact
      const facturaResult = await client.query(`
        INSERT INTO safact (codclie, numerod, fechae, fechav, nroctrol, monto, estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `, [
        codclie,
        `F${Date.now()}`, // Número de factura único
        new Date().toISOString().split('T')[0], // Fecha emisión (hoy)
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Vencimiento en 30 días
        fileName.split('.')[0], // Número de control (ID de la orden)
        totalAmount, // Monto en bolívares
        'PENDIENTE' // Estado inicial
      ])

      const facturaId = facturaResult.rows[0].id

      // 4. CREAR ITEMS DE FACTURA EN saitemfac
      for (const item of cartItems) {
        await client.query(`
          INSERT INTO saitemfac (coditem, numerod, cantidad, precio, id)
          VALUES ($1, $2, $3, $4, $5)
        `, [
          item.codprod,
          facturaResult.rows[0].numerod,
          item.quantity,
          item.precio1ds, // Precio unitario
          facturaId
        ])
      }

      // 5. CREAR CUENTA POR COBRAR EN saacxc
      await client.query(`
        INSERT INTO saacxc (codclie, fechae, fechav, numerod, nroctrol, monto, estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        codclie,
        new Date().toISOString().split('T')[0], // Fecha emisión
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Vencimiento en 30 días
        facturaResult.rows[0].numerod,
        fileName.split('.')[0], // Número de control
        totalAmount, // Monto en bolívares
        'PENDIENTE' // Estado inicial
      ])

      // Confirmar transacción
      await client.query('COMMIT')

      // Guardar la orden en /data/ordenes (para referencia local)
      const ordenesDir = path.join(process.cwd(), 'data', 'ordenes')
      await mkdir(ordenesDir, { recursive: true })
      const ordenData = {
        id: fileName.split('.')[0],
        facturaId: facturaId,
        numerod: facturaResult.rows[0].numerod,
        name,
        email,
        address,
        paymentMethod,
        total: totalAmount,
        cart: cartItems,
        capturePath: `/captures/${fileName}`,
        codclie,
        createdAt: new Date().toISOString(),
        status: 'PROCESADA'
      }
      const ordenFile = path.join(ordenesDir, `${ordenData.id}.json`)
      await writeFile(ordenFile, JSON.stringify(ordenData, null, 2))

      return new Response(JSON.stringify({ 
        success: true, 
        facturaId: facturaId,
        numerod: facturaResult.rows[0].numerod,
        message: 'Orden procesada exitosamente. Stock actualizado y factura creada.'
      }), {
        headers: { 'content-type': 'application/json' },
        status: 200
      })

    } catch (error) {
      // Revertir transacción en caso de error
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }

  } catch (err) {
    console.error('Error en /api/ordenes:', err)
    return new Response(JSON.stringify({ 
      error: err.message || 'Error interno del servidor.' 
    }), { status: 500 })
  }
}

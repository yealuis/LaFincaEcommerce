import { NextResponse } from 'next/server'
import { auth, pool } from '@/auth'

export async function PUT(request) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const codclie = session.user.codclie
    if (!codclie) {
      return NextResponse.json({ error: 'Cliente no identificado' }, { status: 400 })
    }

    const { numerod, nuevoEstado, montoPago } = await request.json()

    if (!numerod || !nuevoEstado) {
      return NextResponse.json({ error: 'Número de factura y estado son requeridos' }, { status: 400 })
    }

    // Iniciar transacción
    const client = await pool.connect()
    
    try {
      await client.query('BEGIN')

      // 1. Verificar que la factura pertenece al cliente
      const facturaResult = await client.query(
        'SELECT id, monto, estado FROM safact WHERE numerod = $1 AND codclie = $2',
        [numerod, codclie]
      )

      if (facturaResult.rows.length === 0) {
        throw new Error('Factura no encontrada o no pertenece al cliente')
      }

      const factura = facturaResult.rows[0]

      // 2. Actualizar estado de la factura
      await client.query(
        'UPDATE safact SET estado = $1 WHERE numerod = $2',
        [nuevoEstado, numerod]
      )

      // 3. Si se marca como pagada, crear registro de pago
      if (nuevoEstado === 'PAGADO' && montoPago) {
        await client.query(`
          INSERT INTO sapagcxc (nroppal, numerod, monto, descrip, fechae)
          VALUES ($1, $2, $3, $4, $5)
        `, [
          `P${Date.now()}`, // Número de pago único
          numerod,
          montoPago,
          'Pago realizado por el cliente',
          new Date().toISOString().split('T')[0]
        ])

        // 4. Actualizar estado de la cuenta por cobrar
        await client.query(
          'UPDATE saacxc SET estado = $1 WHERE numerod = $2',
          ['PAGADO', numerod]
        )
      }

      // Confirmar transacción
      await client.query('COMMIT')

      return NextResponse.json({
        success: true,
        message: `Estado de factura ${numerod} actualizado a ${nuevoEstado}`,
        factura: {
          numerod,
          estado: nuevoEstado,
          monto: factura.monto
        }
      })

    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }

  } catch (error) {
    console.error('Error en PUT /api/perfil/facturas/estado:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}

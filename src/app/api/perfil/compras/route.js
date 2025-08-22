import { NextResponse } from 'next/server'
import { auth, pool } from '@/auth'

export async function GET(request) {
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

    // Obtener historial de compras del usuario
    const comprasQuery = `
      SELECT 
        f.id,
        f.numerod,
        f.fechae,
        f.fechav,
        f.monto,
        f.estado,
        f.nroctrol,
        COUNT(i.id) as total_items,
        STRING_AGG(p.descrip, ', ') as productos
      FROM safact f
      LEFT JOIN saitemfac i ON f.numerod = i.numerod
      LEFT JOIN saprod p ON i.coditem = p.codprod
      WHERE f.codclie = $1
      GROUP BY f.id, f.numerod, f.fechae, f.fechav, f.monto, f.estado, f.nroctrol
      ORDER BY f.fechae DESC
    `

    const result = await pool.query(comprasQuery, [codclie])

    // Formatear las fechas y montos
    const compras = result.rows.map(compra => ({
      id: compra.id,
      numerod: compra.numerod,
      fechaEmision: compra.fechae,
      fechaVencimiento: compra.fechav,
      monto: parseFloat(compra.monto),
      estado: compra.estado,
      nroctrol: compra.nroctrol,
      totalItems: parseInt(compra.total_items),
      productos: compra.productos || 'Sin descripción'
    }))

    return NextResponse.json({
      compras,
      total: compras.length,
      cliente: codclie
    })

  } catch (error) {
    console.error('Error en GET /api/perfil/compras:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}

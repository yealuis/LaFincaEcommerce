import { NextResponse } from 'next/server'
import { auth, pool } from '@/auth'

export async function GET(request) {
  try {
    // Verificar autenticación usando NextAuth.js v5
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Obtener codclie del query parameter
    const { searchParams } = new URL(request.url)
    const codclie = searchParams.get('codclie')

    if (!codclie) {
      return NextResponse.json({ error: 'Código de cliente requerido' }, { status: 400 })
    }

    // Obtener cuentas por cobrar (saacxc)
    const cuentasQuery = `
      SELECT codclie, fechae, fechav, numerod, nroctrol, monto, id
      FROM saacxc 
      WHERE codclie = $1
      ORDER BY fechae DESC
    `
    const cuentasResult = await pool.query(cuentasQuery, [codclie])

    // Obtener facturas (safact)
    const facturasQuery = `
      SELECT codclie, numerod, fechae, fechav, nroctrol, monto, id
      FROM safact 
      WHERE codclie = $1
      ORDER BY fechae DESC
    `
    const facturasResult = await pool.query(facturasQuery, [codclie])

    // Obtener items de facturas (saitemfac)
    const itemsQuery = `
      SELECT coditem, numerod, cantidad, precio, id
      FROM saitemfac 
      WHERE coditem = $1
      ORDER BY id DESC
    `
    const itemsResult = await pool.query(itemsQuery, [codclie])

    // Obtener pagos (sapagcxc)
    const pagosQuery = `
      SELECT nroppal, numerod, monto, descrip, fechae, id
      FROM sapagcxc 
      WHERE numerod IN (
        SELECT numerod FROM safact WHERE codclie = $1
      )
      ORDER BY fechae DESC
    `
    const pagosResult = await pool.query(pagosQuery, [codclie])

    // Preparar respuesta
    const response = {
      cuentasPorCobrar: cuentasResult.rows || [],
      facturas: facturasResult.rows || [],
      items: itemsResult.rows || [],
      pagos: pagosResult.rows || []
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error en GET /api/perfil/financiero:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}

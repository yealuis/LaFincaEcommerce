"use server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_LOCAL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
})

export async function query(text, params) {
  const client = await pool.connect()
  try {
    return await client.query(text, params)
  } finally {
    client.release()
  }
}

function productFilters(searchTerm, filters) {
  const conditions = ["s.existen >= 0"]
    const params = []
    let paramIndex = 1
    
    if (searchTerm) {
      conditions.push(`s.descrip ILIKE $${paramIndex}`)
      params.push(`%${searchTerm}%`)
      paramIndex++
    } 
    if (filters.lab) {
      conditions.push(`m.marca = $${paramIndex}`)
      params.push(filters.lab)
      paramIndex++
    }
    if (filters.min) {
      conditions.push(`s1.precio1ds >= $${paramIndex}`)
      params.push(filters.min)
      paramIndex++
    }
    if (filters.max) {
      conditions.push(`s1.precio1ds <= $${paramIndex}`)
      params.push(filters.max)
      paramIndex++
    }

  return {
    whereClause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    params,
    paramCount: paramIndex - 1

  }
}

export async function getFilteredProducts(filterType, page = 1, limit, searchTerm = "", filters = {}) {
  if (filterType === "featured") {
    const result = await query(`
      SELECT s.codprod, s.descrip, s.pedido, s.marca, s1.precio1ds, encode(p.imagen, 'base64') AS imagen1, encode(m.imagen, 'base64') AS imagenmarca
      FROM saprod s
      JOIN saprod_01 s1 ON s.codprod = s1.codprod
      JOIN productosinfo p ON s.codprod = p.codprod
      JOIN marcasinfo m ON s.marca = m.marca
      WHERE s.existen > 0
      ORDER BY pedido DESC 
      LIMIT 5
    `)
    return result.rows

  } else if (filterType === "news") {
    const result = await query(`
      SELECT s.codprod, s.descrip, s.pedido, s.marca, s1.precio1ds, encode(p.imagen, 'base64') AS imagen1, encode(m.imagen, 'base64') AS imagenmarca
      FROM saprod s
      JOIN saprod_01 s1 ON s.codprod = s1.codprod
      JOIN productosinfo p ON s.codprod = p.codprod
      JOIN marcasinfo m ON s.marca = m.marca
      WHERE s.existen > 0
      ORDER BY fechauv DESC 
      LIMIT 5
    `)
    return result.rows

  } else if (filterType === "all") {
    
    const { whereClause, params, paramCount } = productFilters(searchTerm, filters)
    const offset = (page - 1) * limit

  let orderBy = "s.codprod ASC";
  if (filters.sort === 'asc price') orderBy = "s1.precio1ds ASC"
  if (filters.sort === 'desc price') orderBy = "s1.precio1ds DESC"
  if (filters.sort === 'asc mostRelevant') orderBy = "s.pedido ASC"

  const result = await query(`
      SELECT s.codprod, s.descrip, s.pedido, s.marca, s1.precio1ds, 
             encode(p.imagen, 'base64') AS imagen1, 
             encode(m.imagen, 'base64') AS imagenmarca
      FROM saprod s
      JOIN saprod_01 s1 ON s.codprod = s1.codprod
      JOIN productosinfo p ON s.codprod = p.codprod
      JOIN marcasinfo m ON s.marca = m.marca
      ${whereClause}
      ORDER BY ${orderBy}
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `, [...params, limit, offset])
    return result.rows

  }
  return []
}

export async function getTotalProducts(searchTerm = "", filters = {}) {
  const { whereClause, params } = productFilters(searchTerm, filters)
  const queryText = `
    SELECT COUNT(*) AS total
    FROM saprod s
    JOIN saprod_01 s1 ON s.codprod = s1.codprod
    ${whereClause}
  `
  
  try {
    const result = await query(queryText, params)
    return parseInt(result.rows[0]?.total) || 0
  } catch (error) {
    console.error("Error en getTotalProducts:", error)
    return 0
  }
}

export async function getProductInfo(codprod) {
  const result = await query(`
  SELECT s.codprod, s.descrip, s.marca, s.existen, s1.precio1ds, p.composicion, p.indicaciones, p.administracion, p.unidadesxcaja, encode(p.imagen, 'base64') AS imagen1, encode(p.imagen2, 'base64') AS imagen2, encode(p.imagen3, 'base64') AS imagen3
  FROM saprod s
  JOIN saprod_01 s1 ON s.codprod = s1.codprod
  JOIN productosinfo p ON s.codprod = p.codprod
  WHERE s.codprod = $1
  `, [codprod])
    return result.rows
}

export async function getLabInfo() {
  const result = await query(`
  SELECT marca, encode(imagen, 'base64') AS imagen1
  FROM marcasinfo
  ORDER BY marca
  `)
    return result.rows
}
"use server"
import postgres from "postgres";
//saprod, saprod_01, 
const sql = postgres(process.env.DATABASE_URL_LOCAL)

export async function getFilteredProducts(filterType, page = 1, limit, searchTerm = "", filters = {}) {
  if (filterType === "featured") {
    return await sql`
      SELECT s.codprod, s.descrip, s.pedido, s.marca, s1.precio1ds, encode(p.imagen, 'base64') AS imagen1
      FROM saprod s
      JOIN saprod_01 s1 ON s.codprod = s1.codprod
      JOIN productosinfo p ON s.codprod = p.codprod
      ORDER BY pedido DESC 
      LIMIT 5
    `
  } else if (filterType === "news") {
    return await sql`
      SELECT s.codprod, s.descrip, s.pedido, s.marca, s1.precio1ds, encode(p.imagen, 'base64') AS imagen1
      FROM saprod s
      JOIN saprod_01 s1 ON s.codprod = s1.codprod
      JOIN productosinfo p ON s.codprod = p.codprod
      ORDER BY fechauv DESC 
      LIMIT 5
    `
  } else if (filterType === "all") {
  const offset = (page - 1) * limit;
  return await sql`
    SELECT s.codprod, s.descrip, s.pedido, s.marca, s.descrip2, s.activo, s1.precio1ds, encode(p.imagen, 'base64') AS imagen1
    FROM saprod s
    JOIN saprod_01 s1 ON s.codprod = s1.codprod
    JOIN productosinfo p ON s.codprod = p.codprod
    ${searchTerm ? sql`AND s.descrip ILIKE ${'%' + searchTerm + '%'}` : sql``}
    ${filters.lab ? sql`AND s.marca = ${filters.lab}` : sql``}
    ${filters.cat ? sql`AND s.descrip2 = ${filters.cat}` : sql``}
    ${filters.min ? sql`AND s1.precio1ds >= ${filters.min}` : sql``}
    ${filters.max ? sql`AND s1.precio1ds <= ${filters.max}` : sql``}
    ORDER BY
      ${filters.sort === 'asc price' ? sql`s1.precio1ds ASC` :
        filters.sort === 'desc price' ? sql`s1.precio1ds DESC` :
        filters.sort === 'asc mostRelevant' ? sql`s.pedido ASC` :
        sql`s.codprod ASC`}
    LIMIT ${limit} OFFSET ${offset}
  `;
  }
  return [];
}

export async function getTotalProducts(searchTerm = "", filters = {}) {
   const result = await sql`
    SELECT COUNT(*) AS total
    FROM saprod s
    JOIN saprod_01 s1 ON s.codprod = s1.codprod
    ${searchTerm ? sql`AND s.descrip ILIKE ${'%' + searchTerm + '%'}` : sql``}
    ${filters.lab ? sql`AND s.marca = ${filters.lab}` : sql``}
    ${filters.cat ? sql`AND s.descrip2 = ${filters.cat}` : sql``}
    ${filters.min ? sql`AND s1.precio1ds >= ${filters.min}` : sql``}
    ${filters.max ? sql`AND s1.precio1ds <= ${filters.max}` : sql``}
    `
    return result[0].total
}

export async function getProductInfo(codprod) {
  return await sql`
  SELECT s.codprod, s.descrip, s.descrip2, s.marca, s.existen, s1.precio1ds, p.composicion, p.indicaciones, p.administracion, p.unidadesxcaja, encode(p.imagen, 'base64') AS imagen1, encode(p.imagen2, 'base64') AS imagen2, encode(p.imagen3, 'base64') AS imagen3
  FROM saprod s
  JOIN saprod_01 s1 ON s.codprod = s1.codprod
  JOIN productosinfo p ON s.codprod = p.codprod
  WHERE s.codprod = ${codprod}
  `
}

export async function getLabInfo() {
  return await sql`
  SELECT DISTINCT marca
  FROM saprod
  WHERE marca != ''
  ORDER BY marca
  `
}

export async function getCategoryInfo() {
  return await sql`
  SELECT DISTINCT descrip2
  FROM saprod
  WHERE marca != ''
  `
}
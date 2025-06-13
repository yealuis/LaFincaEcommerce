"use server"
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL_LOCAL)

export async function getFilteredProducts(filterType, page = 1, limit, searchTerm = "") {
  if (filterType === "featured") {
    return await sql`
      SELECT s.codprod, s.descrip, s.pedido, s.marca, s1.precio1ds
      FROM saprod s
      INNER JOIN saprod_01 s1 ON s.codprod  = s1.codprod
      ORDER BY pedido DESC 
      LIMIT 5
    `
  } else if (filterType === "news") {
    return await sql`
      SELECT s.codprod, s.descrip, s.pedido, s.marca, s1.precio1ds
      FROM saprod s
      INNER JOIN saprod_01 s1 ON s.codprod  = s1.codprod
      ORDER BY fechauv DESC 
      LIMIT 5
    `
  } else if (filterType = "all") {
  const offset = (page - 1) * limit;
  return await sql`
    SELECT s.codprod, s.descrip, s.pedido, s.marca, s1.precio1ds
    FROM saprod s
    INNER JOIN saprod_01 s1 ON s.codprod = s1.codprod
    WHERE s.activo = 1
    ${searchTerm ? sql`AND s.descrip ILIKE ${'%' + searchTerm + '%'}` : sql``}
    ORDER BY codprod ASC 
    LIMIT ${limit} OFFSET ${offset}
  `;
  }
  return [];
}

export async function getTotalProducts(searchTerm = "") {
   const result = await sql`
  SELECT COUNT(*) AS total
  FROM saprod
  WHERE activo = 1
  ${searchTerm ? sql`AND s.descrip ILIKE ${'%' + searchTerm + '%'}` : sql``}
  `
   return result[0].total
}

export async function getProductInfo(codprod) {
  return await sql`
  SELECT s.codprod, s.descrip, s.descrip2, s.marca, s.existen, s1.precio1ds
  FROM saprod s
  INNER JOIN saprod_01 s1 ON s.codprod = s1.codprod
  WHERE s.codprod = ${codprod}
  `
}

export async function getLabInfo(filterType) {
  if (filterType === "labs") {
    return await sql`
    SELECT DISTINCT marca
    FROM saprod
    WHERE marca != ''
    `
  }
}
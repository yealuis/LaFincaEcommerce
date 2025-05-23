"use server"

import { neon } from "@neondatabase/serverless";

export async function getFilteredProducts(filterType) {
  const sql = neon(process.env.DATABASE_URL)
  if (filterType === "featured") {
    return await sql`
      SELECT codprod, descrip, precio1, pedido
      FROM saprod 
      ORDER BY pedido DESC 
      LIMIT 4
    `;
  } else if (filterType === "news") {
    return await sql`
      SELECT codprod, descrip, precio1, fechauv 
      FROM saprod 
      ORDER BY fechauv DESC 
      LIMIT 4
    `;
  }
  return [];
}

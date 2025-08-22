
import { auth, pool } from "@/auth"
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "No autenticado. Sesión no encontrada o incompleta.", session }, { status: 401 })
    }

    // Busca el usuario en la tabla usuarios para obtener codclie y email
    const userResult = await pool.query(
      "SELECT codclie, email FROM usuarios WHERE email = $1 LIMIT 1",
      [session.user.email]
    )
    if (userResult.rowCount === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }
    const user = userResult.rows[0]
    const codclie = user.codclie

    // Busca los datos en saclie usando codclie
    const saclieResult = await pool.query(
      "SELECT * FROM saclie WHERE codclie = $1 LIMIT 1",
      [codclie]
    )
    if (saclieResult.rowCount === 0) {
      return NextResponse.json({ error: "Datos de cliente no encontrados" }, { status: 404 })
    }
    const saclie = saclieResult.rows[0]

    // Mapea los campos para el frontend según la estructura real de la tabla
    return NextResponse.json({
      codclie: saclie.codclie || "",
      descrip: saclie.descrip || "",         // Nombre de la empresa
      email: user.email || "",
      id3: saclie.id3 || "",                // Documento de identidad
      represent: saclie.represent || "",    // Representante de la empresa
      direc1: saclie.direc1 || "",         // Dirección 1
      direc2: saclie.direc2 || "",         // Dirección 2
      pais: saclie.pais || "",              // País
      estado: saclie.estado || "",          // Estado
      ciudad: saclie.ciudad || "",          // Ciudad
      municipio: saclie.municipio || "",    // Municipio
      zipcode: saclie.zipcode || "",        // Código postal
      telef: saclie.telef || "",            // Teléfono
      movil: saclie.movil || "",            // Móvil
      escredito: saclie.escredito || 0,     // Si posee crédito
      limitecred: saclie.limitecred || 0,   // Límite de crédito
      diascred: saclie.diascred || 0,       // Días de crédito
      saldo: saclie.saldo || 0              // Saldo disponible
    })
  } catch (error) {
    console.error("Error en /api/perfil:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "No autenticado. Sesión no encontrada o incompleta." }, { status: 401 })
    }

    const body = await req.json()
    
    // Validar que al menos haya un campo para actualizar
    if (Object.keys(body).length === 0) {
      return NextResponse.json({ error: "No hay campos para actualizar" }, { status: 400 })
    }
    
    // Validar campos requeridos si están presentes
    if (body.descrip === null || body.represent === null) {
      return NextResponse.json({ error: "Nombre de empresa y representante no pueden estar vacíos" }, { status: 400 })
    }

    // Buscar el usuario para obtener codclie
    const userResult = await pool.query(
      "SELECT codclie FROM usuarios WHERE email = $1 LIMIT 1",
      [session.user.email]
    )
    if (userResult.rowCount === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }
    const codclie = userResult.rows[0].codclie

    // Construir la consulta SQL dinámicamente basada en los campos enviados
    const updateFields = []
    const updateValues = []
    let paramIndex = 1

    // Mapear campos del frontend a campos de la base de datos
    const fieldMapping = {
      descrip: 'descrip',           // Nombre de la empresa
      represent: 'represent',       // Representante de la empresa
      direc1: 'direc1',            // Dirección 1
      direc2: 'direc2',            // Dirección 2
      pais: 'pais',                // País
      estado: 'estado',            // Estado
      ciudad: 'ciudad',            // Ciudad
      municipio: 'municipio',      // Municipio
      zipcode: 'zipcode',          // Código postal
      telef: 'telef',              // Teléfono
      movil: 'movil',              // Móvil
      email: 'email'               // Email
    }

    // Construir la consulta dinámicamente
    Object.keys(body).forEach(field => {
      if (fieldMapping[field] && body[field] !== undefined) {
        updateFields.push(`${fieldMapping[field]} = $${paramIndex}`)
        updateValues.push(body[field])
        paramIndex++
      }
    })

    // Agregar el WHERE clause
    updateFields.push(`codclie = $${paramIndex}`)
    updateValues.push(codclie)

    if (updateFields.length === 1) {
      return NextResponse.json({ error: "No hay campos válidos para actualizar" }, { status: 400 })
    }

    // Construir y ejecutar la consulta SQL
    const updateQuery = `UPDATE saclie SET ${updateFields.slice(0, -1).join(', ')} WHERE ${updateFields[updateFields.length - 1]}`

    const updateResult = await pool.query(updateQuery, updateValues)

    if (updateResult.rowCount === 0) {
      return NextResponse.json({ error: "No se pudo actualizar el perfil" }, { status: 500 })
    }

    // Obtener el perfil actualizado para devolverlo
    const updatedSaclieResult = await pool.query(
      "SELECT * FROM saclie WHERE codclie = $1 LIMIT 1",
      [codclie]
    )
    
    const updatedSaclie = updatedSaclieResult.rows[0]
    
    // Devolver el perfil actualizado
    return NextResponse.json({
      codclie: updatedSaclie.codclie || "",
      descrip: updatedSaclie.descrip || "",
      email: session.user.email,
      id3: updatedSaclie.id3 || "",
      represent: updatedSaclie.represent || "",
      direc1: updatedSaclie.direc1 || "",
      direc2: updatedSaclie.direc2 || "",
      pais: updatedSaclie.pais || "",
      estado: updatedSaclie.estado || "",
      ciudad: updatedSaclie.ciudad || "",
      municipio: updatedSaclie.municipio || "",
      zipcode: updatedSaclie.zipcode || "",
      telef: updatedSaclie.telef || "",
      movil: updatedSaclie.movil || "",
      escredito: updatedSaclie.escredito || 0,
      limitecred: updatedSaclie.limitecred || 0,
      diascred: updatedSaclie.diascred || 0,
      saldo: updatedSaclie.saldo || 0
    })

  } catch (error) {
    console.error("Error en PUT /api/perfil:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

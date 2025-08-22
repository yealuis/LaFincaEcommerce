import bcrypt from 'bcryptjs'
import { pool } from '@/auth'

export async function POST(req) {
  try {
    const { docType, docNumber, docSuffix, email, password } = await req.json()
    if (!email || !password || !docNumber) {
      return new Response(JSON.stringify({ error: 'Datos obligatorios faltantes' }), { status: 400 })
    }

    const client = await pool.connect()
    try {
      // Buscar cliente en saclie
      const saclieRes = await client.query(
        'SELECT codclie FROM saclie WHERE email = $1',
        [email]
      )
      let codclie
      if (saclieRes.rows.length > 0) {
        // Cliente ya existe en saclie
        codclie = saclieRes.rows[0].codclie
      } else {
        // Crear nuevo cliente en saclie con todos los campos requeridos
        const newCodclie = `${docNumber}${docSuffix}`
        const newId3 = `${docType}-${docNumber}-${docSuffix}`
        await client.query(
          `INSERT INTO saclie (
            codclie, descrip, id3, represent, direc1, direc2, pais, estado, ciudad, municipio, zipcode, telef, movil, email, fechae, escredito, limitecred, diascred, saldo
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
          )`,
          [
            newCodclie,         // codclie
            '',                 // descrip
            newId3,             // id3
            '',                 // represent
            '',                 // direc1
            '',                 // direc2
            1,                  // pais
            5,                  // estado
            0,                  // ciudad
            0,                  // municipio
            '',                 // zipcode
            '',                 // telef
            '',                 // movil
            email,              // email
            new Date(),         // fechae
            0,                  // escredito
            0,                  // limitecred
            0,                  // diascred
            0                   // saldo
          ]
        )
        codclie = newCodclie
      }

      // Verificar si ya existe en usuarios por codclie o email
      const userRes = await client.query(
        'SELECT codclie, email, passwordhash FROM usuarios WHERE codclie = $1 OR email = $2',
        [codclie, email]
      )
      if (userRes.rows.length > 0) {
        const existing = userRes.rows[0]
        if (!existing.passwordhash) {
          // Si existe pero no tiene contraseña, actualiza el hash y el email
          const passwordHash = await bcrypt.hash(password, 10)
          await client.query(
            'UPDATE usuarios SET email = $1, passwordhash = $2, esadmin = $3, updatedat = NOW() WHERE codclie = $4',
            [email, passwordHash, false, codclie]
          )
          // Crear usuario en tabla users de NextAuth si no existe
          const userExistsRes = await client.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
          )
          if (userExistsRes.rows.length === 0) {
            await client.query(
              'INSERT INTO users (name, email, emailVerified, image, passwordhash) VALUES ($1, $2, $3, $4, $5)',
              [email, email, null, null, passwordHash]
            )
          }
          return new Response(JSON.stringify({ success: true, updated: true }), { status: 200 })
        } else {
          return new Response(JSON.stringify({ error: 'El usuario ya está registrado' }), { status: 400 })
        }
      }

      // Crear usuario en usuarios
      const passwordHash = await bcrypt.hash(password, 10)
      await client.query(
        'INSERT INTO usuarios (codclie, email, passwordhash, esadmin, createdat, updatedat) VALUES ($1, $2, $3, $4, NOW(), NOW())',
        [codclie, email, passwordHash, false]
      )

      // Crear usuario en tabla users de NextAuth si no existe
      const userExistsRes = await client.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      )
      if (userExistsRes.rows.length === 0) {
        await client.query(
          'INSERT INTO users (name, email, emailVerified, image, passwordhash) VALUES ($1, $2, $3, $4, $5)',
          [email, email, null, null, passwordHash]
        )
      }

      return new Response(JSON.stringify({ success: true }), { status: 200 })
    } finally {
      client.release()
    }
  } catch (err) {
    console.error('[REGISTRO][ERROR]', err);
    return new Response(JSON.stringify({ error: 'Error en el registro', details: err.message }), { status: 500 })
  }
}

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { Pool } from "pg"
import PostgresAdapter from "@auth/pg-adapter"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from 'uuid'

export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "email",
          placeholder: "luis@gmail.com"
        },
        password: {
          type: "password",
          label: "password",
          placeholder: "********"
        }
      },
      authorize: async (credentials) => {
        return await getUserFromDb(credentials.email, credentials.password)
      }
    })
  ],
  debug: false,
  callbacks: {
    async jwt({ token, user }) {
      console.log('Debug Auth - JWT Callback - user:', user)
      console.log('Debug Auth - JWT Callback - token antes:', token)
      
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name || null
        token.image = user.image || null
        token.esadmin = user.esadmin
        token.codclie = user.codclie
        console.log('Debug Auth - JWT Callback - token después:', token)
      }
      return token
    },
    async session({ session, token }) {
      console.log('Debug Auth - Session Callback - token:', token)
      console.log('Debug Auth - Session Callback - session antes:', session)
      
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.image
        session.user.esadmin = token.esadmin
        session.user.codclie = token.codclie
        console.log('Debug Auth - Session Callback - session después:', session)
      }
      return session
    }
  }
})

async function getUserFromDb(email, password) {
  const client = await pool.connect()
  try {
    console.log('Debug Auth - Buscando usuario con email:', email)
    
    const res = await client.query(
      `SELECT codclie, email, passwordhash, imagen, esadmin FROM usuarios WHERE email = $1`,
      [email]
    )
    const user = res.rows[0]
    console.log('Debug Auth - Usuario encontrado en tabla usuarios:', user)
    
    if (!user) {
      console.log('Debug Auth - Usuario no encontrado')
      return null
    }
    
    if (!user.passwordhash) {
      console.log('Debug Auth - Usuario sin password hash')
      return null
    }

    const isValid = await bcrypt.compare(password, user.passwordhash)
    if (!isValid) {
      console.log('Debug Auth - Password inválido')
      return null
    }

    console.log('Debug Auth - Password válido, buscando en tabla users')

    // Buscar el id de la tabla users de NextAuth
    let userIdRes = await client.query(
      `SELECT id FROM users WHERE email = $1`,
      [user.email]
    )
    let userRow = userIdRes.rows[0]
    if (!userRow) {
      console.log('Debug Auth - Creando nuevo usuario en tabla users')
      // Crear usuario en tabla users si no existe
      const newId = uuidv4()
      await client.query(
        `INSERT INTO users (id, email, emailVerified, image, name) VALUES ($1, $2, $3, $4, $5)`,
        [newId, user.email, null, user.imagen || null, user.email]
      )
      userRow = { id: newId }
    }
    
    console.log('Debug Auth - ID de usuario en tabla users:', userRow.id)
    
    // Crear objeto de usuario completo con todos los campos necesarios
    const fullUser = {
      id: userRow.id,
      email: user.email,
      emailVerified: null,
      image: user.imagen || null,
      name: user.email, // Usar email como nombre por defecto
      esadmin: user.esadmin,
      codclie: user.codclie
    }
    
    console.log('Debug Auth - Usuario completo a retornar:', fullUser)
    return fullUser
  } finally {
    client.release()
  }
}

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { Pool } from "pg"
import PostgresAdapter from "@auth/pg-adapter"

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const {handlers, signIn, singOut, auth} = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Credentials ({
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
        const user = await getUserFromDb(credentials.email, credentials.password)

        if (!user) {
          throw new Error("Credenciales Invalidas.")
        }

        return user
      }
    })
  ],
})



/*export const authOptions = {
  providers:[
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email"},
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          return await authenticateUser(credentials.email, credentials.password)
        } catch (error) {
          const errorMessage = error.errorMessage
          if (errorMessage === "Usuario no encontrado") {
            throw new Error("Usuario no encontrado")
          } else if (errorMessage === "Contraseña incorrecta") {
            throw new Error("Contraseña incorrecta")
          } else {
            throw new Error("Error de autenticación")
          }
        }
      }
    })
  ],

  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user}) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login?error=true"
  }
}

const handlers = NextAuth(authOptions)

export const GET = handlers.GET
export const POST = handlers.POST

export default handlers*/
'use client'
import { useState } from "react"
import styles from './auth.module.css'
import Button from "../UI/Button"
import { signIn } from "next-auth/react"
import Link from "next/link"

const MODES = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  RESET_PASSWORD: "RESET_PASSWORD",
  EMAIL_VERIFICATION: "EMAIL_VERIFICATION"
}

const Login = () => {
  const [mode, setMode] = useState(MODES.LOGIN)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailCode, setEmailCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const [docType, setDocType] = useState('V')
  const [docNumber, setDocNumber] = useState('')
  const [docSuffix, setDocSuffix] = useState('')

   const formTitle =
    mode === MODES.REGISTER ? "Registrarse" :
    mode === MODES.RESET_PASSWORD ? "Recupera tu contraseña" :
    "Verifica tu Email"

  const buttonTitle =
    mode === MODES.REGISTER ? "Registrarse" :
    mode === MODES.RESET_PASSWORD ? "Recuperar" :
    "Verificar"
/*  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      if (mode === MODES.LOGIN) {
        if (!email || !password) {
          setError("Email y contraseña son obligatorios")
          setIsLoading(false)
          return
        }

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          if (result.error.includes("Usuario no encontrado")) {
            setError('Usuario no encontrado')
          } else if (result.error.includes("Contraseña incorrecta")) {
            setError('Contraseña incorrecta')
          } else {
            setError('Error en la autenticación')
          }
        } else {
          setMessage('Inicio de sesión exitoso')
          router.push('/perfil')
        }
      }
      else if (mode === MODES.REGISTER) {
        if (!docNumber) {
          setError('El número de documento es obligatorio')
          setIsLoading(false)
          return
        }
        if (!email || !password) {
          setError("Email y contraseña son obligatorios")
          setIsLoading(false)
          return
        }

        const result = await fetch('/api/register', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ docType, docNumber, docSuffix, email, password })
        })

        const data = await result.json()
        if (result.ok) {
          setMessage('Registro exitoso')
          setMode(MODES.EMAIL_VERIFICATION)
        } else {
          setError(data.error || 'Error al registrarse')
        }
      }
      else if (mode == MODES.RESET_PASSWORD) {
        const response = await fetch('/api/reset-password', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        })

        const data = await response.json()
        if (response.ok) {
          setMessage('Se ha enviado un enlace de recuperación a tu email')
        } else {
          setError(data.error || 'Error al solicitar recuperación')
        }
      }
      else if (mode === MODES.EMAIL_VERIFICATION) {
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: emailCode })
        })
        
        const data = await response.json()
        if (response.ok) {
          setMessage('Email verificado correctamente')
          setMode(MODES.LOGIN)
        } else {
          setError(data.error || 'Código de verificación inválido')
        }
      }

    } catch (err) {
      console.error("Error en conexion: ", err)
      setError('Error en la conexion con el servidor')
    } finally {
      setIsLoading(false)
    }
  }*/


  return (
    <div className={styles.loginContainer}>
      <div className={styles.mask}></div>
      <form className={styles.loginForm} action={async (formData) => {await signIn("credentials", formData)}}>
        <h1 className={styles.formTitle} >Iniciar Sesión</h1>
        <div className={styles.modeDiv}>
          <label className={styles.modeLabel}>E-mail</label>
          <input type="email" name="email" className={styles.modeInput} required />
        </div>
        <div className={styles.modeDiv}>
          <label className={styles.modeLabel}>Contraseña</label>
          <input type="password" name="password" className={styles.modeInput} required minLength={6}/>
        </div>
        <div className={styles.modeChange} onClick={() => setMode(MODES.RESET_PASSWORD)}>
          ¿Olvidaste tu contraseña?
        </div>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </Button>
        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.message}>{message}</div>}
        <Link href={"/auth/register"} className={styles.modeChange}>
          ¿No tienes una cuenta? <span>Regístrate</span>
        </Link>
      </form>
    </div>
  )

/*  return (
    <div className={styles.loginContainer}>
      {/* Gradiente Superpuesto }
      <div className={styles.mask}></div>
      <form className={styles.loginForm} action={async (formData) => {
        await signIn("credentials", formData)
      }}>
        <h1 className={styles.formTitle} >{formTitle}</h1>
        {mode === MODES.REGISTER ? (
          <div className={styles.modeDiv}>
            <label className={styles.modeLabel}>Documento de Identidad</label>
            <div className={styles.idDiv}>
              <select value={docType} onChange={(e) => setDocType(e.target.value)} className={styles.modeInput} required >
                  <option value="V">V</option>
                  <option value="J">J</option>
                </select>
              <input type="text" name="docNumber" placeholder="12345678" className={styles.modeInput} value={docNumber} onChange={(e) => setDocNumber(e.target.value.replace(/\D/g, ''))} required minLength={7} maxLength={9}/>
              <input type="text" name="docSuffix" placeholder="9" className={styles.modeInput} value={docSuffix} onChange={(e) => setDocSuffix(e.target.value.replace(/[^0-9]/g, '').slice(0,1))} />
            </div>
          </div>
        ) : null}
        {mode !== MODES.EMAIL_VERIFICATION ? (
          <div className={styles.modeDiv}>
            <label className={styles.modeLabel}>E-mail</label>
            <input type="email" name="email" className={styles.modeInput} required />
          </div>
        ) : (
          <div className={styles.modeDiv}>
            <label className={styles.modeLabel}>Codigo de Verificacion</label>
            <input type="text" name="emailCode" placeholder="Codigo" className={styles.modeInput} value={emailCode} onChange={(e) => setEmailCode(e.target.value)} required/>
          </div>
        )}
        {mode === MODES.LOGIN || mode === MODES.REGISTER ? (
          <div className={styles.modeDiv}>
            <label className={styles.modeLabel}>Contraseña</label>
            <input type="password" name="password" className={styles.modeInput} required minLength={6}/>
          </div>
        ) : null}
        {mode === MODES.LOGIN && (
          <div className={styles.modeChange} onClick={() => setMode(MODES.RESET_PASSWORD)}>
            ¿Olvidaste tu contraseña?
          </div>
        )}
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Cargando..." : buttonTitle}
        </Button>
        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.message}>{message}</div>}

        {mode === MODES.LOGIN && (
          <div className={styles.modeChange} onClick={() => setMode(MODES.REGISTER)}>
            ¿No tienes una cuenta? <span>Regístrate</span>
          </div>
        )}
        {mode === MODES.REGISTER && (
          <div className={styles.modeChange} onClick={() => setMode(MODES.LOGIN)}>
            ¿Ya tienes una cuenta? <span>Inicia sesión</span>
          </div>
        )}
        {mode === MODES.RESET_PASSWORD && (
          <div className={styles.modeChange} onClick={() => setMode(MODES.LOGIN)}>
            ¿Vuelve a Iniciar Sesion? <span>Inicia sesión</span>
          </div>
        )}
      </form>
    </div>
  )*/
}

export default Login
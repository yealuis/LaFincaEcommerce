'use client'
import { signIn } from "next-auth/react"
import styles from "./auth.module.css"
import Link from "next/link"
import Button from "../UI/Button"
import { useState } from "react"

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  return (
    <div className={styles.loginContainer}>
      <div className={styles.mask}></div>
      <form className={styles.loginForm} action={async (formData) => {await signIn("credentials", formData)}}>
        <h1 className={styles.formTitle} >Registrarse</h1>
        <div className={styles.modeDiv}>
          <label className={styles.modeLabel}>Documento de Identidad</label>
          <div className={styles.idDiv}>
            <select className={styles.modeInput} required >
                <option value="V">V</option>
                <option value="J">J</option>
              </select>
            <input type="text" name="docNumber" placeholder="12345678" className={styles.modeInput} required minLength={7} maxLength={9}/>
            <input type="text" name="docSuffix" placeholder="9" className={styles.modeInput} />
          </div>
        </div>
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
        <Link href={"/auth/login"} className={styles.modeChange}>
            ¿Ya tienes una cuenta? <span>Inicia sesión</span>
        </Link>
      </form>
    </div>
  )
}

export default Register
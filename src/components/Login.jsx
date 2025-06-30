'use client'
import { useState } from "react"
import styles from './login.module.css'
import Button from "./UI/Button"

var MODE
(function(MODE) {
  MODE["LOGIN"] = "LOGIN"
  MODE["REGISTER"] = "REGISTER"
  MODE["RESET_PASSWORD"] = "RESET_PASSWORD"
  MODE["EMAIL_VERIFICATION"] = "EMAIL_VERIFICATION"
})(MODE || (MODE = {}))

const Login = () => {
  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

   const formTitle =
    mode === MODE.LOGIN ? "Iniciar Sesión" : mode === MODE.REGISTER ? "Registrarse" : mode === MODE.RESET_PASSWORD ? "Recupera tu contraseña" : "Verifica tu Email"

  const buttonTitle =
    mode === MODE.LOGIN ? "Iniciar Sesión" : mode === MODE.REGISTER ? "Registrarse" : mode === MODE.RESET_PASSWORD ? "Recuperar" : "Verificar"

  return (
    <div className={styles.loginContainer}>
      {/* Gradiente Superpuesto */}
      <div className={styles.mask}></div>
      <form className={styles.loginForm} >
        <h1 className={styles.formTitle} >{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className={styles.modeDiv}>
            <label className={styles.modeLabel}>Nombre de Usuario</label>
            <input type="text" name="username" placeholder="luis" className={styles.modeInput} onChange={(e) => setUsername(e.target.value)} />
          </div>
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className={styles.modeDiv}>
            <label className={styles.modeLabel}>E-mail</label>
            <input type="email" name="email" placeholder="ejemplo@gmail.com" className={styles.modeInput} onChange={(e) => setEmail(e.target.value)} />
          </div>
        ) : (
          <div className={styles.modeDiv}>
            <label className={styles.modeLabel}>Codigo de Verificacion</label>
            <input type="text" name="emailCode" placeholder="Codigo" className={styles.modeInput} onChange={(e) => setEmailCode(e.target.value)} />
          </div>
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className={styles.modeDiv}>
            <label className={styles.modeLabel}>Contrasena</label>
            <input type="password" name="password" placeholder="Ingresa tu contrasena" className={styles.modeInput} onChange={(e) => setPassword(e.target.value)} />
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div className={styles.modeChange} onClick={() => setMode(MODE.RESET_PASSWORD)}>
            Olvidaste tu contrasena?
          </div>
        )}
        <Button variant="primary" disabled={isLoading}>
          {isLoading ? "Cargando..." : buttonTitle}
        </Button>
        {error && <div className={styles.error}>{error}</div>}
        {mode === MODE.LOGIN && (
          <div className={styles.modeChange} onClick={() => setMode(MODE.REGISTER)}>
            No tienes una cuenta?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div className={styles.modeChange} onClick={() => setMode(MODE.LOGIN)}>
            Ya tienes una cuenta?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div className={styles.modeChange} onClick={() => setMode(MODE.LOGIN)}>
            Vuelve a Iniciar Sesion
          </div>
        )}
        {message && <div className={styles.message}>{message}</div>}
      </form>
    </div>
  )
}

export default Login
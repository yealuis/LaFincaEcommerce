import styles from "./not-found.module.css"
import Link from "next/link"

export default function Custom404() {
  return (
    <div className={styles.cBody}>
      <div className={styles.cow}>
        <div className={styles.head}>
          <div className={styles.face}></div>
        </div>
        <div className={`${styles.leg} ${styles.b} ${styles.l}`}></div>
        <div className={`${styles.leg} ${styles.b} ${styles.r}`}></div>
        <div className={`${styles.leg} ${styles.f} ${styles.l}`}></div>
        <div className={`${styles.leg} ${styles.f} ${styles.r}`}></div>
        <div className={styles.tail}></div>
      </div>
      <div className={styles.well}></div>
      <div className={styles.textBox}>
        <h1>404</h1>
        <p>Lo siento, La página que esta buscando no existe...</p>
        <Link href={"/"} className={styles.homeBtn}>Ir al Inicio</Link>
      </div>
    </div>
  )
}
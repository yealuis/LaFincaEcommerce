import styles from "./footer.module.css"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faYoutube, faPinterest, faXTwitter, faCcDiscover, faPaypal, faCcMastercard, faCcVisa, faBitcoin } from "@fortawesome/free-brands-svg-icons" 

const Footer = () => {
  return (
    <>
      <div className={styles.divSeparator}/>
      <div className={styles.footer}>
        {/*Superior*/}
        <div className={styles.top}>
          {/*Izquierda*/}
          <div className={styles.sides}>
            <Link href="/">
              <Image src="/lafincaLogoH.webp" alt="La Finca" width={110} height={50} />
            </Link>
            <p>El Vigia estado Merida</p>
            <span className={styles.span}>lafinca.prodserv@gmail.com</span>
            <span className={styles.span}>0414-6682610</span>
            <span className={styles.span}>0414-7231789</span>
            <div className={styles.icons}>
              {/*<FontAwesomeIcon icon={faFacebook} className={styles.awesomeIcons}/>*/}
              <Link href="https://www.instagram.com/lafinca.agro/">
                <FontAwesomeIcon icon={faInstagram} className={styles.awesomeIcons}/>
              </Link>
              {/*<FontAwesomeIcon icon={faYoutube} className={styles.awesomeIcons}/>
              <FontAwesomeIcon icon={faPinterest} className={styles.awesomeIcons}/>
              <FontAwesomeIcon icon={faXTwitter} className={styles.awesomeIcons}/>*/}
            </div>
          </div>
          {/*Centro*/}
          <div className={styles.center}>
          <div className={styles.centerColumns}>
              <h1 className={styles.h1}>COMPAÑIA</h1>
              <div className={styles.centerInfo}>
                <Link href="/sobre-nosotros">Sobre Nosotros</Link>
                <Link href="/sobre-nosotros#aliados">Aliados</Link>
                <Link href="/sobre-nosotros#contacto">Contactanos</Link>
              </div>
            </div>
            <div className={styles.centerColumns}>
              <h1 className={styles.h1}>TIENDA</h1>
              <div className={styles.centerInfo}>
                <Link href="/productos">Nuevos Productos</Link>
                <Link href="/productos">Laboratorios</Link>
                <Link href="/productos">Todos los Productos</Link>
              </div>
            </div>
          </div>
        </div>
        {/*Inferior*/}
        <div className={styles.bottom}>
          <div>© 2025 La Finca Productos y Servicios Agropecuarios C.A.</div>
          <div className={styles.bottomDiv}>
            <div>
              <span className={styles.span1}>Idioma</span>
              <span className={styles.span2}>Venezuela | Español</span>
            </div>
            <div className="">
              <span className={styles.span1}>Moneda</span>
              <span className={styles.span2}>$ USD</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
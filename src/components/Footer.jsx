import styles from "./footer.module.css"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faYoutube, faPinterest, faXTwitter, faCcDiscover, faPaypal, faCcMastercard, faCcVisa, faBitcoin } from "@fortawesome/free-brands-svg-icons" 

const Footer = () => {
  return (
    <div className={styles.footer}>
      {/*Superior*/}
      <div className={styles.top}>
        {/*Izquierda*/}
        <div className={styles.sides}>
          <Link href="/">
            <Image src="/lafincaLogoH.webp" alt="La Finca" width={110} height={50} />
          </Link>
          <p>El Vigia estado Merida</p>
          <span className={styles}>lafinca.prodserv@gmail.com</span>
          <span className={styles}>0414-6682610</span>
          <div className={styles.socialIcons}>
            <FontAwesomeIcon icon={faFacebook} size="1x"/>
            <FontAwesomeIcon icon={faInstagram} size="1x"/>
            <FontAwesomeIcon icon={faYoutube} size="1x"/>
            <FontAwesomeIcon icon={faPinterest} size="1x"/>
            <FontAwesomeIcon icon={faXTwitter} size="1x"/>
          </div>
        </div>
        {/*Centro*/}
        <div className={styles.center}>
        <div className={styles.centerColumns}>
            <h1 className={styles.h1}>COMPAÑIA</h1>
            <div className={styles.centerInfo}>
              <Link href="">Sobre Nosotros</Link>
              <Link href="">Aliados Comerciales</Link>
              <Link href="">Vendedores</Link>
              <Link href="">Blog</Link>
              <Link href="">Contactanos</Link>
            </div>
          </div>
          <div className={styles.centerColumns}>
            <h1 className={styles.h1}>TIENDA</h1>
            <div className={styles.centerInfo}>
              <Link href="">Nuevos Productos</Link>
              <Link href="">Mascotas</Link>
              <Link href="">Granja</Link>
              <Link href="">Agricola</Link>
              <Link href="">Todos los Productos</Link>
            </div>
          </div>
          <div className={styles.centerColumns}>
            <h1 className={styles.h1}>AYUDA</h1>
            <div className={styles.centerInfo}>
              <Link href="">Servicio al Cliente</Link>
              <Link href="">Mi Cuenta</Link>
              <Link href="">Encuentra en Nuestra Tienda</Link>
              <Link href="">Privacidad</Link>
              <Link href="">Tarjetas de Regalo</Link>
            </div>
          </div>
        </div>
        {/*Derecha*/}
        <div className={`${styles.sides} ${styles.rightSide}`}>
          <h1 className={styles.h1}>SUSCRIBETE</h1>
          <p>¡Se el primero en recibir información sobre nuestras ultimas ofertas, promociones y mucho más!</p>
          <div className={styles.subscribeDiv}>
            <input type="text" placeholder="Email" />
            <button>UNETE</button>
          </div>
          <span>Formas de pago</span>
          <div className={styles.paymentsIcons}>
            <FontAwesomeIcon icon={faCcDiscover} size="1x"/>
            <FontAwesomeIcon icon={faPaypal} size="1x"/>
            <FontAwesomeIcon icon={faCcMastercard} size="1x"/>
            <FontAwesomeIcon icon={faCcVisa} size="1x"/>
            <FontAwesomeIcon icon={faBitcoin} size="1x"/>
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
  )
}

export default Footer
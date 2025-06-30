import Image from 'next/image'
import Link from 'next/link'
import styles from './aboutUs.module.css'
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faEye, faHeart, faPhone, faTruck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Allies from './mainPage/Allies'

const AboutUs = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Sobre Nosotros</h1>
          <p className={styles.heroSubtitle}>Venta al mayor y detal de insumos, Medicinas Veterianarias y todo lo relacionada con el campo</p>
        </div>
        <div className={styles.heroImage}>
          <Image src="/granja.webp" alt="Medicina veterinaria" layout="fill" objectFit="cover" priority />
        </div>
      </section>

      {/* Quiénes Somos */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Quiénes Somos</h2>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <p>
              Somos una distribuidora mayorista de medicinas veterinarias con sede en El Vigía, estado Mérida, Venezuela. 
              Tenemos mas de 20 años dedicandonos a proveer productos de calidad para clínicas veterinarias, agropecuarias y profesionales del sector.
            </p>
          </div>
          
          <div className={styles.imageWrapper}>
            <Image src="/granja.webp" alt="Distribución veterinaria" width={500} height={350} objectFit="cover" className={styles.roundedImage}/>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Nuestra Filosofía</h2>
          <div className={styles.divider}></div>
        </div>
        
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <h3>Misión</h3>
            <p>
              Proporcionar medicamentos veterinarios de calidad a precios competitivos, asegurando una distribución eficiente y un servicio al cliente excepcional.
            </p>
          </div>
          
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <FontAwesomeIcon icon={faEye} />
            </div>
            <h3>Visión</h3>
            <p>
              Ser la distribuidora líder en medicina veterinaria en la zona sur del lago de Maracaibo, reconocida por nuestra confiabilidad, variedad de productos y compromiso con nuestros clientes.
            </p>
          </div>
          
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h3>Compromiso</h3>
            <p>
              Contribuir al bienestar animal a través de productos de calidad y asesoramiento profesional, apoyando al sector agropecuario en su labor diaria.
            </p>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className={`${styles.section} ${styles.contactSection}`} id='contacto'>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Contáctanos</h2>
          <div className={styles.divider}></div>
          <p className={styles.sectionSubtitle}>Estamos a tu disposición para cualquier consulta</p>
        </div>
        
        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <FontAwesomeIcon icon={faPhone}/>
            </div>
            <h3>Teléfono</h3>
            <p>0414-6682610</p>
            <p>0414-7231789</p>
            <p>Lunes a Viernes: 8:00 AM - 5:00 PM</p>
          </div>
          
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <FontAwesomeIcon icon={faEnvelope}/>
            </div>
            <h3>Correo Electrónico</h3>
            <p>lafinca.prodserv@gmail.com</p>
          </div>
          
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <FontAwesomeIcon icon={faInstagram}/>
            </div>
            <h3>Instagram</h3>
            <p>@lafinca.agro</p>
            <p>Síguenos para promociones y novedades</p>
          </div>
        </div>
        
        <div className={styles.locationInfo}>
          <h3>Área de Distribución</h3>
          <p>Principalmente la zona sur del lago del Maracaibo, pero contamos con distribucion a todo el pais</p>
          <div className={styles.mapPlaceholder}>
            <Image src="/granja.webp" alt="Mapa de distribución" width={600} height={300} objectFit="cover"/>
          </div>
        </div>
      </section>

      <section className={styles.section} id='aliados'>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Nuestros Aliados Comerciales</h2>
          <div className={styles.divider}></div>
        </div>
        <Allies/>
      </section>
    </div>
  )
}

export default AboutUs
import styles from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Menu from './Menu'
import SearchBar from './SearchBar'
import NavIcons from './NavIcons'

const Navbar = () => {
  return (
    <div className= {styles.navContainer}>
      {/*Pantallas Pequeñas*/}
      <div className={styles.navMobile}>
        <Link href="/">
          <Image src="/lafincaLogoHB.webp" alt="La Finca" width={100} height={50} />
        </Link>
        <Menu />
      </div>
      {/*Pantallas Grandes*/}
      <div className={styles.navComputer}>
        {/*Izquierda*/}
          <div className={styles.navLeft}>
            <Link href="/" className={styles}>
              <Image src="/lafincaLogoBlanco.webp" alt="La Finca" width={25} height={50} />
            </Link>
            <div className={styles.navMenu}>
              <Link href="/">Inicio</Link>
              <Link href="/productos">Productos</Link>
              <Link href="/sobre-nosotros">Sobre Nosotros</Link>
              <Link href="/login">Iniciar Sesión</Link>
            </div>
          </div>
        {/*Derecha*/}
        <div className={styles.navRight}>
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  )
}
 export default Navbar
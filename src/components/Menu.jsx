"use client"
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from './menu.module.css'

const Menu = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="">
      <FontAwesomeIcon icon={faBars} className={styles.menuIcon} onClick={() => setOpen((prev) => !prev)} />
      {open && (
        <div className={styles.menuBar}>
          <Link href="/">Inicio</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/">Ofertas</Link>
          <Link href="/">Sobre Nosotros</Link>
          <Link href="/">Contacto</Link>
          <Link href="/">Cerrar Sesion</Link>
          <Link href="/">Carrito</Link>
        </div>
      )}
    </div>
  )
}

export default Menu
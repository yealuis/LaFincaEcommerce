"use client"
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from './menu.module.css'
import SearchBar from './SearchBar'

const Menu = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="">
      <FontAwesomeIcon icon={faBars} className={styles.menuIcon} onClick={() => setOpen((prev) => !prev)} />
      {open && (
        <div className={styles.menuBar}>
          <div className={styles.searchBar}>
            <SearchBar setOpen={setOpen} />
          </div>
          <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link href="/productos" onClick={() => setOpen(false)}>Productos</Link>
          <Link href="/sobre-nosotros" onClick={() => setOpen(false)}>Sobre Nosotros</Link>
        </div>
      )}
    </div>
  )
}

export default Menu
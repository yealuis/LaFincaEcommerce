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
      <FontAwesomeIcon icon={faBars} size='2x' className={styles.menuIcon} onClick={() => setOpen((prev) => !prev)} />
      {open && (
        <div className={styles.menuBar}>
          <Link href="/">Homepage</Link>
          <Link href="/">Shop</Link>
          <Link href="/">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Logout</Link>
          <Link href="/">Cart</Link>
        </div>
      )}
    </div>
  )
}

export default Menu
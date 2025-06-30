"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import styles from "./navbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import CartModal from "./CartModal"
import { usePathname } from "next/navigation"
import { useCart } from "../cart/CartContext"

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()
  const profileRef = useRef(null)
  const cartRef = useRef(null)

  const { cartItems } = useCart()
  const cartCount = cartItems.length

  useEffect(() => {
    setIsCartOpen(false)
    setIsProfileOpen(false)
  }, [pathname])

  const handleProfile = () => {
    {//if (!isLoggedIn) {
      //router.push("/login")
    }//}
      setIsProfileOpen((prev) => !prev)
  }

  return (
    <div className={styles.navIcons}>
      <FontAwesomeIcon icon={faUser} className={styles.awesomeIcons} onClick={handleProfile}/>
      {isProfileOpen && (
        <div className={styles.profileBar}>
          <Link href="/perfil">Perfil</Link>
          <div className={styles.div} >Cerrar Sesión</div>
        </div>
      )}
      <div className={styles.cartContainer} onClick={() => setIsCartOpen((prev) => !prev)}>
        <FontAwesomeIcon icon={faCartShopping} className={styles.awesomeIcons} />
        <div className={styles.cartCounter}>
          {cartCount}
          {/*counter*/}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  )
}

export default NavIcons
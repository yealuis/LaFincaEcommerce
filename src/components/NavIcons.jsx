"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./navbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import CartModal from "./CartModal"

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const isLoggedIn = false

  const handleProfile = () => {
    {//if (!isLoggedIn) {
      //router.push("/login")
    }//}
      setIsProfileOpen((prev) => !prev)
  }

  return (
    <div className={styles.navIcons}>
      <FontAwesomeIcon icon={faUser} size="2x" className={styles.awesomeIcons} onClick={handleProfile} />
      {isProfileOpen && (
        <div className={styles.profileBar}>
          <Link href="/profile">Perfil</Link>
          <div className={styles.div} >Cerrar Sesión</div>
        </div>
      )}
      <FontAwesomeIcon icon={faBell} size="2x" className={styles.awesomeIcons} />
      <div className={styles.cartContainer}>
        <FontAwesomeIcon icon={faCartShopping} size="2x" className={styles.awesomeIcons} onClick={() => setIsCartOpen((prev) => !prev)} />
        <div className={styles.cartCounter}>
          2
          {/*counter*/}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  )
}

export default NavIcons
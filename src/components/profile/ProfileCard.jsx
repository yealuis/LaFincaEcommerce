import styles from './profile.module.css'
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faBriefcase } from '@fortawesome/free-solid-svg-icons'

const ProfileCard = () => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileImageContainer}>
          <Image alt="Perfil" className={styles.profileImage} src="/user.webp" width={140} height={140} priority/>
      </div>

      <div className={styles.profileCardBody}>
        <div className={styles.profileStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>22</span>
            <span className={styles.statLabel}>Compras</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>1</span>
            <span className={styles.statLabel}>Facturas a pagar</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>354.60 $</span>
            <span className={styles.statLabel}>Saldo a pagar</span>
          </div>
        </div>
        <hr className={styles.profileDivider} />
        
        <div className={styles.profileInfo}>
          <h3 className={styles.profileName}>
            La Finca
          </h3>
          <div className={styles.profileDetail}>
            <FontAwesomeIcon icon={faCalendar} />
            Cliente desde 2020
          </div>
          <div className={styles.profileDetail}>
            <FontAwesomeIcon icon={faBriefcase} />
            Representante: Luis Perez
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
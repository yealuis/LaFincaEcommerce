'use client'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import styles from './profile.module.css'
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faBriefcase, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons'

const ProfileCard = ({ perfil }) => {
  const { data: session } = useSession()
  
  // Memoizar toda la información del perfil
  const profileInfo = useMemo(() => {
    // Información de la empresa
    const companyName = perfil?.descrip || 'La Finca'
    
    // Representante
    const representative = perfil?.represent || session?.user?.name || 'No especificado'
    
    // Ubicación
    const locationParts = []
    if (perfil?.ciudad) locationParts.push(perfil.ciudad)
    if (perfil?.estado) locationParts.push(perfil.estado)
    if (perfil?.pais) locationParts.push(perfil.pais)
    const location = locationParts.length > 0 ? locationParts.join(', ') : 'Ubicación no especificada'
    
    // Teléfono principal
    const phone = perfil?.telef || perfil?.movil || 'No especificado'
    
    // Años como cliente
    let clientSince = '2020' // Fallback
    if (perfil?.fechae) {
      const fecha = new Date(perfil.fechae)
      const currentYear = new Date().getFullYear()
      const clientYear = fecha.getFullYear()
      clientSince = currentYear - clientYear
    }
    
    // Formatear saldo de crédito
    const creditBalance = perfil?.saldo !== undefined && perfil?.saldo !== null ? `${perfil.saldo} bs` : '0.00 bs'
    
    // Formatear límite de crédito
    const creditLimit = perfil?.limitecred !== undefined && perfil?.limitecred !== null ? `${perfil.limitecred} bs` : '0.00 bs'
    
    return {
      companyName,
      representative,
      location,
      phone,
      clientSince,
      creditBalance,
      creditLimit,
      hasCredit: perfil?.escredito || false,
      hasBalance: perfil?.saldo > 0
    }
  }, [perfil, session?.user?.name])

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileImageContainer}>
          <Image alt="Perfil" className={styles.profileImage} src="/user.webp" width={140} height={140} priority/>
      </div>

      <div className={styles.profileCardBody}>
        <div className={styles.profileStats}>
          <div className={styles.statItem}>
            <span className={`${styles.statValue} ${profileInfo.hasCredit ? styles.creditActive : styles.creditInactive}`}>
              {profileInfo.hasCredit ? '✓' : '✗'}
            </span>
            <span className={styles.statLabel}>Crédito Activo</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {profileInfo.creditLimit}
            </span>
            <span className={styles.statLabel}>Límite de Crédito</span>
          </div>
          <div className={styles.statItem}>
            <span className={`${styles.statValue} ${profileInfo.hasBalance ? styles.positiveBalance : styles.zeroBalance}`}>
              {profileInfo.creditBalance}
            </span>
            <span className={styles.statLabel}>Saldo Disponible</span>
          </div>
        </div>
        <hr className={styles.profileDivider} />
        
        <div className={styles.profileInfo}>
          <h3 className={styles.profileName}>
            {profileInfo.companyName}
          </h3>
          <div className={styles.profileDetail}>
            <FontAwesomeIcon icon={faCalendar} />
            Cliente desde {profileInfo.clientSince}
          </div>
          <div className={styles.profileDetail}>
            <FontAwesomeIcon icon={faBriefcase} />
            Representante: {profileInfo.representative}
          </div>
          <div className={styles.profileDetail}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {profileInfo.location}
          </div>
          <div className={styles.profileDetail}>
            <FontAwesomeIcon icon={faPhone} />
            {profileInfo.phone}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
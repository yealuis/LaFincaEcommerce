'use client'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import styles from './profile.module.css'

const ProfileHeader = ({ perfil }) => {
  const { data: session } = useSession()
  
  // Memoizar el nombre de visualización
  const displayName = useMemo(() => {
    if (perfil?.represent) {
      return perfil.represent
    }
    if (session?.user?.name) {
      return session.user.name
    }
    if (session?.user?.email) {
      return session.user.email.split('@')[0]
    }
    return 'Usuario'
  }, [perfil?.represent, session?.user?.name, session?.user?.email])

  // Memoizar el nombre de la empresa
  const companyName = useMemo(() => {
    if (perfil?.descrip) {
      return perfil.descrip
    }
    return 'Mi Compañia'
  }, [perfil?.descrip])

  return (
  <>
    {/* Encabezado */}
    <div className={styles.profileHeader}>
      <div className={styles.headerBackground}>
        {/* Gradiente Superpuesto */}
        <div className={styles.mask}></div>
        
        {/* Contenedor principal del encabezado */}
        <div className={styles.headerContainer}>
          <div className={styles.headerRow}>
            <div className={styles.headerCol}>
              <h1 className={styles.heading}>Hola {displayName}</h1>
              <p className={styles.subheading}>
                Esta es tu página de perfil de {companyName}. Puedes ver tus datos personales y modificarlos, además de poder ver cuentas por pagar y facturas anteriores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default ProfileHeader
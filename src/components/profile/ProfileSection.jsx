'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useMemo, useCallback } from 'react'
import styles from './profile.module.css'
import ProfileHeader from './ProfileHeader'
import ProfileCard from './ProfileCard'
import AccountForm from './AccountForm'
import FinancialSection from './FinancialSection'
import PurchaseHistory from './PurchaseHistory'

const ProfileSection = () => {
  const { data: session, status } = useSession()
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Memoizar el estado de autenticación
  const isAuthenticated = useMemo(() => status === "authenticated", [status])
  
  // Memoizar la función de fetch
  const fetchPerfil = useCallback(async () => {
    if (!session?.user?.email || perfil) return // No hacer fetch si ya tenemos perfil
    
    try {
      setLoading(true);
      const res = await fetch("/api/perfil")
      if (!res.ok) throw new Error("No se pudo obtener el perfil")
      const data = await res.json()
      setPerfil(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [session?.user?.email, perfil])

  useEffect(() => {
    if (isAuthenticated && session?.user?.email && !perfil) {
      fetchPerfil()
    } else if (status === "unauthenticated") {
      setLoading(false)
      setError("Debes iniciar sesión para ver tu perfil.")
    }
  }, [isAuthenticated, session?.user?.email, perfil, fetchPerfil, status])

  // Memoizar el contenido del perfil
  const profileContent = useMemo(() => {
    if (loading) return <div className={styles.profilePage}>Cargando...</div>
    if (error) return <div className={styles.profilePage}>Error: {error}</div>
    if (!perfil) return null

    return (
      <>
        <ProfileHeader perfil={perfil} />
        <div className={styles.profileContent}>
          <div className={styles.profileGrid}>
            <div className={styles.profileCardContainer}>
              <ProfileCard perfil={perfil} />
            </div>
            <div className={styles.accountFormContainer}>
              <AccountForm perfil={perfil} />
            </div>
          </div>
          
          {/* Sección de Historial de Compras */}
          <div className={styles.purchaseContainer}>
            <PurchaseHistory />
          </div>
          
          {/* Sección Financiera */}
          <div className={styles.financialContainer}>
            <FinancialSection perfil={perfil} />
          </div>
        </div>
      </>
    )
  }, [perfil, loading, error])

  return profileContent
}

export default ProfileSection
'use client'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faCalendarAlt, faFileInvoice, faClock, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import styles from './profile.module.css'

const PurchaseHistory = () => {
  const [compras, setCompras] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/perfil/compras')
        if (res.ok) {
          const data = await res.json()
          setCompras(data.compras)
        } else {
          throw new Error('No se pudieron obtener las compras')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCompras()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatAmount = (amount) => {
    if (!amount) return 'Bs 0,00'
    return `Bs ${parseFloat(amount).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const getStatusIcon = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'pagado':
        return <FontAwesomeIcon icon={faCheckCircle} className={styles.statusPaid} />
      case 'pendiente':
        return <FontAwesomeIcon icon={faClock} className={styles.statusPending} />
      default:
        return <FontAwesomeIcon icon={faExclamationTriangle} className={styles.statusOther} />
    }
  }

  const getStatusClass = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'pagado':
        return styles.statusPaid
      case 'pendiente':
        return styles.statusPending
      default:
        return styles.statusOther
    }
  }

  if (loading) {
    return (
      <div className={styles.purchaseHistory}>
        <div className={styles.loadingMessage}>Cargando historial de compras...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.purchaseHistory}>
        <div className={styles.errorMessage}>Error: {error}</div>
      </div>
    )
  }

  return (
    <div className={styles.purchaseHistory}>
      <div className={styles.purchaseHeader}>
        <h3 className={styles.purchaseTitle}>
          <FontAwesomeIcon icon={faShoppingBag} />
          Historial de Compras
        </h3>
        <span className={styles.purchaseCount}>
          {compras.length} compra{compras.length !== 1 ? 's' : ''}
        </span>
      </div>

      {compras.length === 0 ? (
        <div className={styles.noPurchases}>
          <FontAwesomeIcon icon={faShoppingBag} />
          <p>No tienes compras registradas</p>
        </div>
      ) : (
        <div className={styles.purchaseList}>
          {compras.map((compra) => (
            <div key={compra.id} className={styles.purchaseItem}>
              <div className={styles.purchaseHeader}>
                <div className={styles.purchaseInfo}>
                  <span className={styles.purchaseNumber}>
                    <FontAwesomeIcon icon={faFileInvoice} />
                    {compra.numerod}
                  </span>
                  <span className={styles.purchaseControl}>
                    Ctrl: {compra.nroctrol}
                  </span>
                </div>
                <div className={styles.purchaseStatus}>
                  {getStatusIcon(compra.estado)}
                  <span className={`${styles.statusText} ${getStatusClass(compra.estado)}`}>
                    {compra.estado || 'Sin estado'}
                  </span>
                </div>
              </div>

              <div className={styles.purchaseDetails}>
                <div className={styles.purchaseDates}>
                  <div className={styles.purchaseDate}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>Emisión: {formatDate(compra.fechaEmision)}</span>
                  </div>
                  <div className={styles.purchaseDate}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>Vencimiento: {formatDate(compra.fechaVencimiento)}</span>
                  </div>
                </div>

                <div className={styles.purchaseAmount}>
                  <span className={styles.amountLabel}>Total:</span>
                  <span className={styles.amountValue}>{formatAmount(compra.monto)}</span>
                </div>

                <div className={styles.purchaseItems}>
                  <span className={styles.itemsLabel}>Productos ({compra.totalItems}):</span>
                  <span className={styles.itemsValue}>{compra.productos}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PurchaseHistory

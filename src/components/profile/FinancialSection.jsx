'use client'
import { useState, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice, faCreditCard, faCalendarAlt, faDollarSign, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import styles from './profile.module.css'

const FinancialSection = ({ perfil }) => {
  const [financialData, setFinancialData] = useState({
    cuentasPorCobrar: [],
    facturas: [],
    pagos: []
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('resumen')

  // Obtener datos financieros
  useEffect(() => {
    if (perfil?.codclie) {
      const fetchFinancialData = async () => {
        try {
          setLoading(true)
          const res = await fetch(`/api/perfil/financiero?codclie=${perfil.codclie}`)
          if (res.ok) {
            const data = await res.json()
            setFinancialData(data)
          }
        } catch (error) {
          console.error('Error al obtener datos financieros:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchFinancialData()
    }
  }, [perfil?.codclie])

  // Calcular resumen financiero
  const financialSummary = useMemo(() => {
    const totalCuentasPorCobrar = financialData.cuentasPorCobrar.reduce((sum, cuenta) => sum + Number(cuenta.monto), 0)
    const totalFacturas = financialData.facturas.reduce((sum, factura) => sum + Number(factura.monto), 0)
    const totalPagos = financialData.pagos.reduce((sum, pago) => sum + Number(pago.monto), 0)
    const saldoPendiente = totalCuentasPorCobrar - totalPagos

    return {
      totalCuentasPorCobrar: totalCuentasPorCobrar.toFixed(2),
      totalFacturas: totalFacturas.toFixed(2),
      totalPagos: totalPagos.toFixed(2),
      saldoPendiente: saldoPendiente.toFixed(2),
      facturasPendientes: financialData.facturas.filter(f => new Date(f.fechav) > new Date()).length
    }
  }, [financialData])

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Formatear monto
  const formatAmount = (amount) => {
    if (!amount) return '$0.00'
    return `${Number(amount).toFixed(2)} bs`
  }

  // Verificar si una factura está vencida
  const isOverdue = (fechaVencimiento) => {
    if (!fechaVencimiento) return false
    return new Date(fechaVencimiento) < new Date()
  }

  if (loading) {
    return (
      <div className={styles.financialSection}>
        <div className={styles.loadingMessage}>Cargando información financiera...</div>
      </div>
    )
  }

  return (
    <div className={styles.financialSection}>
      <div className={styles.financialHeader}>
        <h3 className={styles.financialTitle}>
          <FontAwesomeIcon icon={faCreditCard} />
          Información Financiera
        </h3>
        <div className={styles.financialTabs}>
          <button 
            className={`${styles.financialTab} ${activeTab === 'resumen' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('resumen')}
          >
            Resumen
          </button>
          <button 
            className={`${styles.financialTab} ${activeTab === 'facturas' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('facturas')}
          >
            Facturas
          </button>
          <button 
            className={`${styles.financialTab} ${activeTab === 'pagos' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('pagos')}
          >
            Pagos
          </button>
        </div>
      </div>

      {activeTab === 'resumen' && (
        <div className={styles.financialSummary}>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>
                <FontAwesomeIcon icon={faFileInvoice} />
              </div>
              <div className={styles.summaryContent}>
                <h4>Total Facturas</h4>
                <span className={styles.summaryAmount}>{formatAmount(financialSummary.totalFacturas)}</span>
              </div>
            </div>
            
            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
              <div className={styles.summaryContent}>
                <h4>Cuentas por Cobrar</h4>
                <span className={styles.summaryAmount}>{formatAmount(financialSummary.totalCuentasPorCobrar)}</span>
              </div>
            </div>
            
            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <div className={styles.summaryContent}>
                <h4>Total Pagos</h4>
                <span className={styles.summaryAmount}>{formatAmount(financialSummary.totalPagos)}</span>
              </div>
            </div>
            
            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <div className={styles.summaryContent}>
                <h4>Saldo Pendiente</h4>
                <span className={`${styles.summaryAmount} ${Number(financialSummary.saldoPendiente) > 0 ? styles.overdue : styles.paid}`}>
                  {formatAmount(financialSummary.saldoPendiente)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'facturas' && (
        <div className={styles.facturasList}>
          <h4>Historial de Facturas</h4>
          {financialData.facturas.length === 0 ? (
            <p className={styles.noData}>No hay facturas registradas</p>
          ) : (
            <div className={styles.facturasTable}>
              {financialData.facturas.map((factura, index) => (
                <div key={index} className={`${styles.facturaItem} ${isOverdue(factura.fechav) ? styles.overdue : ''}`}>
                  <div className={styles.facturaHeader}>
                    <span className={styles.facturaNumber}>#{factura.numerod}</span>
                    <span className={styles.facturaControl}>Ctrl: {factura.nroctrol}</span>
                    <span className={`${styles.facturaStatus} ${isOverdue(factura.fechav) ? styles.overdue : styles.active}`}>
                      {isOverdue(factura.fechav) ? 'Vencida' : 'Activa'}
                    </span>
                  </div>
                  <div className={styles.facturaDetails}>
                    <div className={styles.facturaDate}>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>Emisión: {formatDate(factura.fechae)}</span>
                    </div>
                    <div className={styles.facturaDate}>
                      <FontAwesomeIcon icon={faClock} />
                      <span>Vencimiento: {formatDate(factura.fechav)}</span>
                    </div>
                    <div className={styles.facturaAmount}>
                      <FontAwesomeIcon icon={faDollarSign} />
                      <span>{formatAmount(factura.monto)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'pagos' && (
        <div className={styles.pagosList}>
          <h4>Historial de Pagos</h4>
          {financialData.pagos.length === 0 ? (
            <p className={styles.noData}>No hay pagos registrados</p>
          ) : (
            <div className={styles.pagosTable}>
              {financialData.pagos.map((pago, index) => (
                <div key={index} className={styles.pagoItem}>
                  <div className={styles.pagoHeader}>
                    <span className={styles.pagoNumber}>#{pago.nroppal}</span>
                    <span className={styles.pagoFactura}>Factura: {pago.numerod}</span>
                  </div>
                  <div className={styles.pagoDetails}>
                    <div className={styles.pagoDate}>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>{formatDate(pago.fechae)}</span>
                    </div>
                    <div className={styles.pagoAmount}>
                      <FontAwesomeIcon icon={faDollarSign} />
                      <span>{formatAmount(pago.monto)}</span>
                    </div>
                    <div className={styles.pagoDescription}>
                      <span>{pago.descrip || 'Pago realizado'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FinancialSection

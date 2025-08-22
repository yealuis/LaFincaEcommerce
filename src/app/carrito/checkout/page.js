"use client"
import { useState, useEffect, useMemo, useCallback } from "react";
import { useCart } from "@/components/cart/CartContext";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/UI/Button";

const PAYMENT_METHODS = {
  STRIPE: "stripe",
  PAGO_MOVIL: "pago_movil",
  TRANSFERENCIA: "transferencia"
}

const DATOS_PAGO_MOVIL = {
  nombre: "Luis Perez",
  cedula: "27229634",
  banco: "Provincial",
  telefono: "0414-7231789"
}

const DATOS_TRANSFERENCIA = {
  nombre: "Luis Perez",
  banco: "Provincial",
  cuenta: "0108-1234-5678-9012-3456"
}

const CheckoutPage = () => {
  const { data: session, status } = useSession()
  const { cartItems, subtotal, clearCart } = useCart()
  const [formData, setFormData] = useState({ name: "", email: "", address: "" })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.STRIPE)
  const [captureFile, setCaptureFile] = useState(null)
  const [error, setError] = useState("")
  const [loadingProfile, setLoadingProfile] = useState(true)

  // Memoizar cálculos para evitar re-renders
  const { tax, total, totalBs } = useMemo(() => {
    const tax = subtotal * 0.0
    const total = subtotal + tax
    const exchangeRate = 133.51590000
    const totalBs = total * exchangeRate
    return { tax, total, totalBs }
  }, [subtotal])

  // Memoizar el estado de autenticación
  const isAuthenticated = useMemo(() => status === "authenticated", [status])
  const userEmail = useMemo(() => session?.user?.email, [session?.user?.email])

  // Debug: Verificar que la sesión tenga el codclie
  useEffect(() => {
    if (session?.user) {
      console.log('Debug Checkout - Session completa:', session)
      console.log('Debug Checkout - Session.user:', session.user)
      console.log('Debug Checkout - codclie:', session.user?.codclie)
      console.log('Debug Checkout - esadmin:', session.user?.esadmin)
    }
  }, [session])

  // Memoizar la función de fetch del perfil
  const fetchUserProfile = useCallback(async () => {
    if (!isAuthenticated || !userEmail) return
    
    try {
      setLoadingProfile(true)
      const res = await fetch("/api/perfil")
      if (res.ok) {
        const profileData = await res.json()
        // Pre-llenar el formulario con los datos del perfil
        setFormData({
          name: profileData.represent || profileData.descrip || "",
          email: userEmail || "",
          address: `${profileData.direc1 || ""} ${profileData.direc2 || ""} ${profileData.ciudad || ""} ${profileData.estado || ""}`.trim()
        })
      }
    } catch (err) {
      console.error('Error obteniendo perfil:', err)
      // Si hay error, usar solo el email de la sesión
      setFormData(prev => ({
        ...prev,
        email: userEmail || ""
      }))
    } finally {
      setLoadingProfile(false)
    }
  }, [isAuthenticated, userEmail])

  // useEffect optimizado para evitar re-ejecuciones innecesarias
  useEffect(() => {
    if (isAuthenticated && userEmail && !formData.email) {
      fetchUserProfile()
    } else if (status === "unauthenticated") {
      setLoadingProfile(false)
    }
  }, [isAuthenticated, userEmail, formData.email, fetchUserProfile, status])

  // Memoizar handlers para evitar re-creaciones
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleFileChange = useCallback((e) => {
    setCaptureFile(e.target.files[0])
  }, [])

  const handleStripeCheckout = useCallback(async () => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/stripe-session", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ items: cartItems, email: formData.email })
      })
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error iniciando el pago')
      setIsProcessing(false)
    }
  }, [cartItems, formData.email])

  const handleManualPayment = useCallback(async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    setError("")
    try {
      if (!captureFile) {
        setError("Debes subir el capture del pago.")
        setIsProcessing(false)
        return
      }

      // Obtener datos del perfil para asegurar que usamos la información más actualizada
      let userProfile = null
      try {
        const profileRes = await fetch("/api/perfil")
        if (profileRes.ok) {
          userProfile = await profileRes.json()
        }
      } catch (err) {
        console.error('Error obteniendo perfil actualizado:', err)
      }

      const data = new FormData()
      // Usar datos del perfil si están disponibles, sino usar los del formulario
      data.append("name", userProfile?.represent || userProfile?.descrip || formData.name)
      data.append("email", userEmail)
      data.append("address", userProfile ? 
        `${userProfile.direc1 || ""} ${userProfile.direc2 || ""} ${userProfile.ciudad || ""} ${userProfile.estado || ""}`.trim() : 
        formData.address
      )
      data.append("paymentMethod", paymentMethod)
      data.append("capture", captureFile)
      data.append("cart", JSON.stringify(cartItems))
      data.append("total", totalBs) // Enviar monto en bolívares
      
      const res = await fetch("/api/ordenes", {
        method: "POST",
        body: data
      })
      
      if (res.ok) {
        const result = await res.json()
        setOrderSuccess(true)
        clearCart()
        // Mostrar información de la factura
        console.log('Factura creada:', result.numerod)
        console.log('ID de factura:', result.facturaId)
      } else {
        const errorData = await res.json()
        setError(errorData.error || "Error al enviar la orden. Intenta de nuevo.")
      }
    } catch (err) {
      setError("Error al enviar la orden. Intenta de nuevo.")
    } finally {
      setIsProcessing(false)
    }
  }, [captureFile, formData.name, formData.address, paymentMethod, cartItems, totalBs, userEmail, clearCart])

  // Memoizar el contenido condicional para evitar re-renders
  const checkoutContent = useMemo(() => {
    // Mostrar pantalla de éxito si la orden fue completada
    if (orderSuccess) {
      return (
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>¡Pedido Completado!</h2>
          <p className={styles.successMessage}>
            Gracias por tu compra. Hemos recibido tu comprobante y revisaremos tu pago.
          </p>
          <Link href="/productos">
            <Button variant="continueShopping">Volver a la tienda</Button>
          </Link>
        </div>
      );
    }

    // Verificar si el usuario está autenticado
    if (status === "loading" || loadingProfile) {
      return (
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Cargando información del usuario...</p>
          </div>
        </div>
      );
    }

    if (status === "unauthenticated") {
      return (
        <div className={styles.container}>
          <div className={styles.authRequired}>
            <h2>Inicia sesión para continuar</h2>
            <p>Necesitas estar autenticado para realizar una compra.</p>
            <Link href="/auth/login">
              <Button variant="primary">Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      );
    }

    // Contenido principal del checkout
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Finalizar Compra</h1>
        <div className={styles.checkoutContent}>
          <div className={styles.form}>
            <h2 className={styles.sectionTitle}>Información de Contacto</h2>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre completo</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={styles.autoFilledField}/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={styles.autoFilledField} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address">Dirección de envío</label>
              <textarea id="address" name="address" value={formData.address} onChange={handleChange} required rows="3" className={styles.autoFilledField}/>
            </div>
            <h2 className={styles.sectionTitle}>Método de pago</h2>
            <div className={styles.formGroup}>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className={styles.paymentSelect}>
                <option value={PAYMENT_METHODS.STRIPE}>Tarjeta (Stripe)</option>
                <option value={PAYMENT_METHODS.PAGO_MOVIL}>Pago Móvil</option>
                <option value={PAYMENT_METHODS.TRANSFERENCIA}>Transferencia Bancaria</option>
              </select>
            </div>
            {paymentMethod === PAYMENT_METHODS.STRIPE && (
              <Button onClick={handleStripeCheckout} disabled={isProcessing}>Pagar con Stripe</Button>
            )}
            {(paymentMethod === PAYMENT_METHODS.PAGO_MOVIL || paymentMethod === PAYMENT_METHODS.TRANSFERENCIA) && (
              <form onSubmit={handleManualPayment} className={styles.manualPaymentForm} encType="multipart/form-data">
                <div className={styles.paymentDetailsBox}>
                  {paymentMethod === PAYMENT_METHODS.PAGO_MOVIL && (
                    <>
                      <h4>Datos para Pago Móvil</h4>
                      <p><b>Nombre:</b> {DATOS_PAGO_MOVIL.nombre}</p>
                      <p><b>Cédula:</b> {DATOS_PAGO_MOVIL.cedula}</p>
                      <p><b>Banco:</b> {DATOS_PAGO_MOVIL.banco}</p>
                      <p><b>Teléfono:</b> {DATOS_PAGO_MOVIL.telefono}</p>
                    </>
                  )}
                  {paymentMethod === PAYMENT_METHODS.TRANSFERENCIA && (
                    <>
                      <h4>Datos para Transferencia Bancaria</h4>
                      <p><b>Nombre:</b> {DATOS_TRANSFERENCIA.nombre}</p>
                      <p><b>Banco:</b> {DATOS_TRANSFERENCIA.banco}</p>
                      <p><b>Número de Cuenta:</b> {DATOS_TRANSFERENCIA.cuenta}</p>
                    </>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="capture">Sube el capture del pago</label>
                  <input type="file" id="capture" name="capture" accept="image/*" onChange={handleFileChange} required />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <Button type="submit" disabled={isProcessing}>Enviar Comprobante</Button>
              </form>
            )}
          </div>
          <div className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>
            <div className={styles.itemsPreview}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <div className={styles.itemImageContainer}>
                    <Image src={item.image} alt={item.name} width={60} height={60} className={styles.itemImage} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemQuantity}>Cantidad: {item.quantity}</p>
                  </div>
                  <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Impuestos</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalAmount}>${total.toFixed(2)} USD</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span className={styles.totalLabel}>Total en Bolívares:</span>
                <span className={styles.totalAmount}>{totalBs.toFixed(2)} Bs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }, [orderSuccess, status, loadingProfile, formData, paymentMethod, isProcessing, error, cartItems, subtotal, tax, total, totalBs,handleChange,handleStripeCheckout,handleManualPayment,handleFileChange])

  return checkoutContent
}

export default CheckoutPage
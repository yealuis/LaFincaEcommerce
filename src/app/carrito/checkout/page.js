"use client"
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/UI/Button";

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart()
  const [email, setEmail] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const orderSuccess = false

  // Calcular totales (mismo cálculo que en carrito)
  const tax = subtotal * 0.0
  const total = subtotal + tax

  const handleStripeCheckout = async () => {
    setIsProcessing(true)

    try {
      const response = await fetch("/api/payment/stripe-session", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ items: cartItems, email })
      })
      const { url} = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error iniciando el pago')
      setIsProcessing(false)
    }
  }

  if (orderSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>¡Pedido Completado!</h2>
        <p className={styles.successMessage}>
          Gracias por tu compra. Hemos enviado un correo con los detalles de tu pedido.
        </p>
        <Link href="/productos">
          <Button variant="continueShopping">Volver a la tienda</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Finalizar Compra</h1>
      
      <div className={styles.checkoutContent}>
        <div className={styles.form}>
          <h2 className={styles.sectionTitle}>Información de Contacto</h2>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre completo</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="address">Dirección de envío</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} required rows="3" />
          </div>
          
          <h2 className={styles.sectionTitle}>Método de pago</h2>
          <div className={styles.paymentOptions}>
            <Button onClick={handleStripeCheckout}>Stripe</Button>
            <div id="paypal-button-container"/>
          </div>
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
              <span>Total</span>
              <span className={styles.totalAmount}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
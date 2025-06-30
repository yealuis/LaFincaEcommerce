"use client"
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/UI/Button";

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart()
  const [formData, setFormData] = useState({ name: "", email: "", address: "", cardNumber: "", expDate: "", cvv: ""})
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Calcular totales (mismo cálculo que en carrito)
  const tax = subtotal * 0.0
  const total = subtotal + tax

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Guardar en PostgreSQL
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ customer: formData, items: cartItems, subtotal, shipping, tax, total })
      })

      if (!response.ok) throw new Error("Error al procesar el pedido")
      
      // Limpiar carrito y mostrar éxito
      clearCart();
      setOrderSuccess(true);
      
    } catch (error) {
      console.error("Error en el checkout:", error)
      alert("Ocurrió un error al procesar tu pedido")
    } finally {
      setIsProcessing(false);
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
        <form onSubmit={handleSubmit} className={styles.form}>
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
          
          <h2 className={styles.sectionTitle}>Información de Pago</h2>
          <div className={styles.formGroup}>
            <label htmlFor="cardNumber">Número de tarjeta</label>
            <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required placeholder="1234 5678 9012 3456" />
          </div>
          
          <div className={styles.cardDetails}>
            <div className={styles.formGroup}>
              <label htmlFor="expDate">Fecha de expiración</label>
              <input type="text" id="expDate" name="expDate" value={formData.expDate} onChange={handleChange} required placeholder="MM/AA" />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required placeholder="123" />
            </div>
          </div>
          <Button type="submit" variant="submit" disabled={isProcessing}>
            {isProcessing ? "Procesando..." : "Completar Pedido"}
          </Button>
        </form>
        
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
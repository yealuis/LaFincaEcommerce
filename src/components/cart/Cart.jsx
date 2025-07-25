'use client'
import Link from "next/link"
import Image from "next/image"
import styles from './cart.module.css'
import { useCart } from "./CartContext"
import Button from "../UI/Button"

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart()

  // Calcular totales
  const tax = subtotal * 0.0
  const total = subtotal + tax

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Carrito de Compras</h1>
      
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Tu carrito está vacío</p>
          <Link href="/productos">
            <Button variant="continueShopping">Continuar comprando</Button>
          </Link>
        </div>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.itemsContainer}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <Image src={item.image} alt={item.name} width={120} height={120} className={styles.itemImage}/>
                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <Link href={`/productos/${item.id}`}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                    </Link>
                    <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                      Eliminar
                    </button>
                  </div>
                  
                  <p className={styles.itemDescription}>{item.description}</p>
                  
                  <div className={styles.itemFooter}>
                    <div className={styles.quantitySelector}>
                      <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} variant="quantitySelector">
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.max} variant="quantitySelector">
                        +
                      </Button>
                    </div>
                    <div className={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>
            
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Impuestos (16%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className={styles.checkoutButton}>Pagar con Stripe</Button>
            <Link href="/carrito/checkout" className={styles.checkoutButton}>
              Proceder al Pago
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
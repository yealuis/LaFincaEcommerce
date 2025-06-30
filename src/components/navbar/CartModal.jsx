"use client"
import { useCart } from "../cart/CartContext"
import Button from "../UI/Button"
import styles from "./cartModal.module.css"
import Image from "next/image"
import Link from "next/link"

const CartModal = () => {
  const { cartItems, subtotal, removeFromCart, updateQuantity } = useCart()
  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
  }

   console.log("Cart items:", cartItems)
  return (
    <div className={styles.cartModal}>
      {!cartItems || cartItems.length === 0 ? (
        <div className={styles.emptyCar}>El carrito se encuentra vacio.</div>
      ) : (
        <div>
          <h2 className={styles.cartTitle}>Carrito de Compras</h2>
          <div className={styles.fullCartContainer}>
            {/* Producto */}
            {cartItems.map((item) => (
              <div key={item.id} className={styles.productContainer}>
                <Image src={item.image} alt={item.name} width="80" height="80" className={styles.carImages} />
                <div className={styles.productDetails}>
                  {/* Superior del producto */}
                  <div className={styles.productTop}>
                    {/* Titulo */}
                    <div className={styles.productTitle}>
                      <Link href={`/productos/${item.id}`}>
                        <h3 className={styles.h3}>{item.name}</h3>
                      </Link>
                      <div className={styles.productPrice}>{item.price} $</div>
                    </div>
                  </div>
                  {/* Inferior del producto */}
                  <div className={styles.productBottom}>
                    <div className={styles.productButtons}>
                      <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} variant="quantitySelector">
                          -
                      </Button>
                      <span className={styles.productSpanQuantity}>{item.quantity}</span>
                      <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.max} variant="quantitySelector">
                          +
                      </Button>
                    </div>
                    <span className={styles.productSpanRemove} onClick={() => handleRemoveItem(item.id)}>Eliminar</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Inferior de la modal */}
            <div className={styles}>
              <div className={styles.spanContainer}>
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} $</span>
              </div>
              <p className={styles.bottomDescription}>Envío e impuestos calculados al finalizar la compra</p>
              <div className={styles.buttonContainer}>
                <Link href={'/carrito'}>
                  <Button variant="secondary">Ver Carrito</Button>
                </Link>
                <Link href={'/carrito'}>
                  <Button variant="primary">Realizar Pago</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartModal
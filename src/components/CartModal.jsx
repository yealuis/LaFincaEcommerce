"use client"
import styles from "./cartModal.module.css"
import Image from "next/image"

const CartModal = () => {
  const cartItems = true

  return (
    <div className={styles.cartModal}>
      {!cartItems ? (
        <div className={styles.emptyCar}>El carrito se encuentra vacio.</div>
      ) : (
        <div className={styles.fullCartContainer}>
          {/* Productos */}
          <div className={styles.productContainer}>
            <Image src="/isopan.webp" alt="Isopan" width="80" height="80" className={styles.carImages} />
            <div className={styles.cartContainer}>
              {/* Superior del producto */}
              <div className={styles.cartTop}>
                {/* Titulo */}
                <div className={styles.cartTitle}>
                  <h3 className={styles.h3}>Nombre del Producto</h3>
                  <div className={styles.cartPrice}>40 $</div>
                </div>
                {/*descripcion */}
                <div className={styles.cartDescription}>
                  Disponible
                </div>
              </div>
              {/* Inferior del producto */}
              <div className={styles.cartBottom}>
                <span className={styles.cartSpanQuantity}>Cantidad 2</span>
                <span className={styles.cartSpanRemove}>Eliminar</span>
              </div>
            </div>
          </div>
          {/* Inferior de la modal */}
          <div className={styles}>
            <div className={styles.spanContainer}>
              <span>Subtotal</span>
              <span>40 $</span>
            </div>
            <p className={styles.bottomDescription}>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className={styles.buttonContainer}>
              <button className={`${styles.viewButton} ${styles.button}`}>Ver Carrito</button>
              <button className={`${styles.payButton} ${styles.button}`}>Realizar el pago</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartModal
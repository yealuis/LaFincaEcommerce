'use client'
import { useState } from "react"
import styles from "./add.module.css"

const Add = () => {
  const stockNumber = 4
  const [quantity, setQuantity] = useState(1)

  const handleQuantity = (type) => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1)
    }
  }

  return (
    <div className={styles.addContainer}>
      <h4 className={styles.quantityTitle}>Escoge una cantidad</h4>
      <div className={styles.quantityContainer}>
        <div className={styles.quantityContainerDiv}>
          <div className={styles.quantityButtons}>
            <button className={styles.quantityButton} onClick={() => handleQuantity("d")} disabled={quantity <= 1}>-</button>
            {quantity}
            <button className={styles.quantityButton} onClick={() => handleQuantity("i")} disabled={quantity >= stockNumber}>+</button>
          </div>
          <div className={styles.quantityLeftInfo}>Solo <span style={{color:'#ed8936'}}>4 restantes!</span> <br />No pierdas la oportunidad</div>
        </div>
        <button className={styles.addButton}>Añadir al carrito</button>
      </div>
    </div>
  )
}

export default Add
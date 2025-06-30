'use client'
import { useEffect, useState } from "react"
import styles from "./add.module.css"
import { useParams } from "next/navigation"
import { getProductInfo } from "@/lib/db"
import { useCart } from "../cart/CartContext"

const Add = () => {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState([])
  const params = useParams()
  const { addToCart } = useCart()
  
  useEffect(() => {
    getProductInfo(params.slug).then((data) => setProduct(data[0]))
  },[params.slug])
  
  const handleQuantity = (type) => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
    if (type === "i" && quantity < parseFloat(product.existen)) {
      setQuantity((prev) => prev + 1)
    }
  }
  
  const handleManualQuantity = (event) => {
    const value = Number(event.target.value)
    if (!isNaN(value) && value >= 1 && product && value <= parseFloat(product.existen)) {
      setQuantity(value)
    }
  }
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }
  
  const stock = parseFloat(product.existen)

  return (
    <div className={styles.addContainer}>
      <h4 className={styles.quantityTitle}>Escoge una cantidad</h4>
      <div className={styles.quantityContainer}>
        <div className={styles.quantityContainerDiv}>
          <div className={styles.quantityButtons}>
            <button className={styles.quantityButton} onClick={() => handleQuantity("d")} disabled={quantity <= 1}>-</button>
            <input type="number" value={quantity} onChange={(e) => handleManualQuantity(e)} min={1} max={stock} className={styles.quantityInput} />
            <button className={styles.quantityButton} onClick={() => handleQuantity("i")} disabled={quantity >= stock}>+</button>
          </div>
          <div className={styles.quantityLeftInfo}>Solo <span style={{color:'#ed8936'}}>{stock} restantes!</span> <br />No pierdas la oportunidad</div>
        </div>
        <button className={styles.addButton} onClick={handleAddToCart} >Añadir al carrito</button>
      </div>
    </div>
  )
}

export default Add
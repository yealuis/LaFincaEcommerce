'use client'
import Link from "next/link"
import Image from "next/image"
import styles from "./productList.module.css"
import { useEffect, useState } from "react"
import { getFilteredProducts } from "@/lib/db"

const ProductList = ({ filterType }) => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getFilteredProducts(filterType).then(setProducts)
  }, [filterType])

  return (
    <div className={styles.productListContainer}>
      {products.map((product) => {
        <Link key={product.codprod} href={`/productos/${product.codprod}`} className={styles.productLink}>
          <div className={styles.productContainer}>
            <Image src="/isopan.webp" alt={product.descrip} fill sizes="25vw" className={`${styles.productImages} ${styles.productImageTop}`}/>
            <Image src="/reveex.webp" alt="product" fill sizes="25vw" className={styles.productImages}/>
          </div>
          <div className={styles.productData}>
            <span className={styles.productName}>{product.descrip}</span>
            <span className={styles.productPrice}>{product.price1}Bs</span>
          </div>
          <div className={styles.productDescription}>Descripción del Producto</div>
          <button className={styles.addToCart}>Agregar al carrito</button>
        </Link>
      })}
    </div>
  )
}

export default ProductList
'use client'
import Link from "next/link"
import Image from "next/image"
import styles from "./productList.module.css"
import { useEffect, useState } from "react"
import { getFilteredProducts } from "@/lib/db"

const ProductList = ({ filterType, currentPage, limit, searchTerm }) => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getFilteredProducts(filterType, currentPage, limit, searchTerm).then(setProducts)
  }, [filterType, currentPage, limit, searchTerm])

  return (
    <div className={styles.productListContainer}>
      {products.map(product => 
        <Link key={product.codprod} href={`/productos/${product.codprod}`} className={styles.productLink}>
          <div className={styles.productContainer}>
            <Image src={`/${product.descrip}.webp`} alt={product.descrip} fill sizes="25vw" className={`${styles.productImages} ${styles.productImageTop}`} />
            <Image src={`/${product.marca}.webp`} alt={product.marca} fill sizes="25vw" className={styles.productImages}/>
          </div>
          <div className={styles.productData}>
            <span className={styles.productName}>{product.descrip}</span>
            <span className={styles.productPrice}>{parseFloat(product.precio1ds).toFixed(2)}$</span>
          </div>
          <div className={styles.productDescription}>{product.descrip}</div>
          <button className={styles.addToCart}>Agregar al carrito</button>
        </Link>
      )}
    </div>
  )
}

export default ProductList
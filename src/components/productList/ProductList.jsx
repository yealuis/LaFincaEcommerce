'use client'
import Link from "next/link"
import Image from "next/image"
import styles from "./productList.module.css"
import { useEffect, useState } from "react"
import { getFilteredProducts } from "@/lib/db"

const ProductList = ({ filterType, currentPage, limit, searchTerm, filters }) => {

  const [products, setProducts] = useState([])
  
  if (filterType === 'all') {
    useEffect(() => {
      getFilteredProducts(filterType, currentPage, limit, searchTerm, filters).then(setProducts)
      }, [filterType, currentPage, limit, searchTerm, filters.lab, filters.min, filters.max, filters.sort])
  } else {
    useEffect(() => {
      getFilteredProducts(filterType).then(setProducts)
      }, [filterType])
  }

  return (
    <div className={styles.productListContainer}>
      {products.map(product => 
        <Link key={product.codprod} href={`/productos/${product.codprod}`} className={styles.productLink}>
          <div className={styles.productContainer}>
            <Image src={product.imagen1 ? `data:image/webp;base64,${product.imagen1}` : "/NO-DISPONIBLE.webp"} alt={product.descrip}
              fill sizes="25vw" className={`${styles.productImages} ${styles.productImageTop}`} />
            <Image src={product.imagenmarca ? `data:image/webp;base64,${product.imagenmarca}` : "/NO-DISPONIBLE.webp"} alt={product.marca}
              fill sizes="25vw" className={styles.productImages}/>
          </div>
          <div className={styles.productData}>
            <span className={styles.productName}>{product.descrip}</span>
          </div>
        </Link>
      )}
    </div>
  )
}

export default ProductList
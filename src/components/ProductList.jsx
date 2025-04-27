import Link from "next/link"
import Image from "next/image"
import styles from "./productList.module.css"

const ProductList = () => {
  return (
    <div className={styles.productListContainer}>
      <Link href="/product" className={styles.productLink}>
        <div className={styles.productContainer}>
          <Image src="/isopan.webp" alt="product" fill sizes="25vw" className={`${styles.productImages} ${styles.productImageTop}`}/>
          <Image src="/isopan2.webp" alt="product" fill sizes="25vw" className={styles.productImages}/>
        </div>
        <div className={styles.productData}>
          <span className={styles.productName}>Isopan</span>
          <span className={styles.productPrice}>50$</span>
        </div>
        <div className={styles.productDescription}>Descripción del Producto</div>
        <button className={styles.addToCart}>Agregar al carrito</button>
      </Link>
      <Link href="/product" className={styles.productLink}>
        <div className={styles.productContainer}>
          <Image src="/boldenona.webp" alt="product" fill sizes="25vw" className={`${styles.productImages} ${styles.productImageTop}`}/>
          <Image src="/reveex.webp" alt="product" fill sizes="25vw" className={styles.productImages}/>
        </div>
        <div className={styles.productData}>
          <span className={styles.productName}>Boldenona</span>
          <span className={styles.productPrice}>50$</span>
        </div>
        <div className={styles.productDescription}>Descripción del Producto</div>
        <button className={styles.addToCart}>Agregar al carrito</button>
      </Link>
      <Link href="/product" className={styles.productLink}>
        <div className={styles.productContainer}>
          <Image src="/bovinet.webp" alt="product" fill sizes="25vw" className={`${styles.productImages} ${styles.productImageTop}`}/>
          <Image src="/reveex.webp" alt="product" fill sizes="25vw" className={styles.productImages}/>
        </div>
        <div className={styles.productData}>
          <span className={styles.productName}>Bovinet</span>
          <span className={styles.productPrice}>50$</span>
        </div>
        <div className={styles.productDescription}>Descripción del Producto</div>
        <button className={styles.addToCart}>Agregar al carrito</button>
      </Link>
      <Link href="/product" className={styles.productLink}>
        <div className={styles.productContainer}>
          <Image src="/mastiveexRetard.webp" alt="product" fill sizes="25vw" className={`${styles.productImages} ${styles.productImageTop}`}/>
          <Image src="/reveex.webp" alt="product" fill sizes="25vw" className={styles.productImages}/>
        </div>
        <div className={styles.productData}>
          <span className={styles.productName}>Mastiveex Retard</span>
          <span className={styles.productPrice}>50$</span>
        </div>
        <div className={styles.productDescription}>Descripción del Producto</div>
        <button className={styles.addToCart}>Agregar al carrito</button>
      </Link>
    </div>
  )
}

export default ProductList
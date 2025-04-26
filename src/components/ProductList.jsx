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
      </Link>
    </div>
  )
}

export default ProductList
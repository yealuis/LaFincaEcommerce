import ProductImages from "@/components/ProductPage/ProductImages"
import styles from "./page.module.css"
import { getProductInfo } from "@/lib/db"
import { notFound } from "next/navigation"

const ProductSinglePage = async ({ params }) => {
  const productData = await getProductInfo(params.slug);

  if (!productData || productData.length === 0) {
    notFound()
  }

  const product = productData[0]

  return (
    <div className={styles.productPageContainer}>
      {/* Imagen */}
      <div className={styles.productImages}>
        <ProductImages/>
        <div className={`${styles.productInfo} ${styles.center}`}>
          <h4 className={styles.secondaryTitle}>Composición</h4>
          <p className={`${styles.description} `}>
            {product.composicion?.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </p>
        </div>
      </div>
      {/* Texto */}
      <div className={styles.productText}>
        <h1 className={styles.title}>{product.descrip}</h1>
        <div className={styles.priceDiv}>
          <div className={`${styles.productInfo} ${styles.center}`}>
            <h4 className={styles.secondaryTitle}>Cantidad de unidades por caja</h4>
            <p className={`${styles.description} ${styles.center}`}>{product.unidadesxcaja}</p>
          </div>
        </div>
        <div className={styles.divSeparator}/>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Laboratorio</h4>
          <p className={styles.description}>{product.marca}</p>
        </div>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Indicaciones</h4>
          <p className={styles.description}>
            {product.indicaciones?.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </p>
        </div>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Administración</h4>
          <p className={styles.description}>
            {product.administracion?.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductSinglePage
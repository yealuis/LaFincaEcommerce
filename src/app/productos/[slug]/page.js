import ProductImages from "@/components/ProductPage/ProductImages"
import styles from "./page.module.css"
import Add from "@/components/ProductPage/Add"
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
      </div>
      {/* Texto */}
      <div className={styles.productText}>
        <h1 className={styles.title}>{product.descrip}</h1>
        <p className={styles.description}>{product.descrip2}</p>
        <div className={styles.priceDiv}>
          <div className={styles.productInfo}>
            <h3 className={styles.secondaryTitle}>Precio</h3>
            <p className={styles.description}>{parseFloat(product.precio1ds).toFixed(2)}$</p>
          {/*<h2 className={styles.discountPrice}>45$</h2>*/}
          </div>
          <div className={styles.productInfo}>
            <h4 className={styles.secondaryTitle}>Cantidad de unidades por caja</h4>
            <p className={`${styles.description} ${styles.center}`}>{product.unidadesxcaja}</p>
          </div>
        </div>
        <Add/>
        <div className={styles.divSeparator}/>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Laboratorio</h4>
          <p className={styles.description}>{product.marca}</p>
        </div>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Composición</h4>
          <p className={styles.description}>{product.composicion}</p>
        </div>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Indicaciones</h4>
          <p className={styles.description}>{product.indicaciones}</p>
        </div>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Administración</h4>
          <p className={styles.description}>{product.administracion}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductSinglePage
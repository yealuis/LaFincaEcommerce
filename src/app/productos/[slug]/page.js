import ProductImages from "@/components/ProductImages"
import styles from "./page.module.css"

const ProductSinglePage = () => {
  return (
    <div className={styles.productPageContainer}>
      {/* Imagen */}
      <div className={styles.productImages}>
        <ProductImages/>
      </div>
      {/* Texto */}
      <div className={styles.productText}>
        <h1 className={styles.title}>Nombre del Producto</h1>
        <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos suscipit sequi dignissimos consequuntur omnis tenetur alias at fugiat laborum illo totam enim et voluptas reiciendis mollitia, ratione maiores labore autem!</p>
        <div className={styles.divSeparator}/>
        <div>
          <h3>50$</h3>
          <h2>45$</h2>
        </div>
        <div className={styles.divSeparator}/>
      </div>
    </div>
  )
}

export default ProductSinglePage
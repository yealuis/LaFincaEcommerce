import ProductImages from "@/components/ProductImages"
import styles from "./page.module.css"
import CustomizeProducts from "@/components/CustomizeProducts"
import Add from "@/components/Add"
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
          <h3 className={styles.discountPrice}>{parseFloat(product.precio1ds).toFixed(2)}$</h3>
          {/*<h2 className={styles.discountPrice}>45$</h2>*/}
        </div>
        <CustomizeProducts/>
        <Add/>
        <div className={styles.divSeparator}/>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Laboratorio</h4>
          <p className={styles.description}>{product.marca}</p>
        </div>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Composición</h4>
          <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos suscipit sequi dignissimos consequuntur omnis tenetur alias at fugiat laborum illo totam enim et voluptas reiciendis mollitia, ratione maiores labore autem!</p>
        </div>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Indicaciones</h4>
          <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos suscipit sequi dignissimos consequuntur omnis tenetur alias at fugiat laborum illo totam enim et voluptas reiciendis mollitia, ratione maiores labore autem!</p>
        </div>
        <div className={styles.productInfo}>
          <h4 className={styles.secondaryTitle}>Administración</h4>
          <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos suscipit sequi dignissimos consequuntur omnis tenetur alias at fugiat laborum illo totam enim et voluptas reiciendis mollitia, ratione maiores labore autem!</p>
        </div>
      </div>
    </div>
  )
}

export default ProductSinglePage
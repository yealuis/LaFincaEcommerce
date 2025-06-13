'use client'
import styles from "./page.module.css"
import Image from "next/image"
import Filter from "@/components/Filter"
import ProductList from "@/components/ProductList"
import Pagination from "@/components/Pagination"
import usePagination from "@/hooks/usePagination"

const ProductsPage = () => {

  const { currentPage, setCurrentPage, totalPages, limit, searchTerm } = usePagination()

  return (
    <div className={styles.page}>
      {/* CAMPAÑA */}
      <div className={styles.campainContainer}>
        <div className={styles.campain}>
          <h1 className={styles.campainH1}> Consigue un 50% en<br /> Productos Seleccionados</h1>
          <button className={styles.campainButton}>Compra Ahora</button>
        </div>
        <div className={styles.campainImageContainer}>
          <Image src="/ISOPAN DE 250 ML.webp" alt="isopan" fill className={styles.campainImage}></Image>
        </div>
      </div>
      {/* Filtro */}
      <Filter/>
      {/* Productos */}
      <h1 className={styles.productListH1}>Productos</h1>
      <ProductList filterType={"all"} currentPage={currentPage} limit={limit} searchTerm={searchTerm} />
      {totalPages && (
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
      )}
    </div>
  )
}

export default ProductsPage
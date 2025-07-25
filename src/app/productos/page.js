'use client'
import styles from "./page.module.css"
import Image from "next/image"
import Filter from "@/components/productList/Filter"
import ProductList from "@/components/productList/ProductList"
import Pagination from "@/components/productList/Pagination"
import usePagination from "@/hooks/usePagination"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

const ProductsPage = () => {
  const { currentPage, setCurrentPage, totalPages, limit, searchTerm } = usePagination()
  const [filters, setFilters] = useState({})

  const searchParams = useSearchParams()

  useEffect(() => {
    setFilters({
      lab: searchParams.get("lab") || "",
      min: searchParams.get("min") || "",
      max: searchParams.get("max") || "",
      sort: searchParams.get("sort") || ""
    })

  }, [searchParams, setCurrentPage])

  return (
    <div className={styles.page}>
      {/* CAMPAÑA */}
      <div className={styles.campainContainer}>
        <div className={styles.campainImageContainer}>
          <Image src="/lafincaLogoH.webp" alt="isopan" fill className={styles.campainImage}></Image>
        </div>
        <div className={styles.campain}>
          <h1 className={styles.campainH1}> Venta al mayor y detal de insumos, Medicinas Veterianarias y todo lo relacionada con el campo</h1>
          {/*<button className={styles.campainButton}>Compra Ahora</button>*/}
        </div>
      </div>
      {/* Filtro */}
      <Filter onFilterChange={setFilters} />
      {/* Productos */}
      <h1 className={styles.productListH1}>Productos</h1>
      <ProductList filterType={"all"} currentPage={currentPage} limit={limit} searchTerm={searchTerm} filters={filters} />
      {totalPages && (
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
      )}
    </div>
  )
}

export default ProductsPage
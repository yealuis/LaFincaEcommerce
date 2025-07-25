'use client'
import { useState, useEffect, useMemo } from "react"
import { getTotalProducts } from "@/lib/db"
import { useSearchParams, useRouter } from "next/navigation"

const usePagination = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pageFromUrl = parseInt(searchParams.get("page")) || 1
  const searchTerm = searchParams.get("name") || ""

  const filters = useMemo(() =>{
    lab: searchParams.get("lab") || "";
    min: searchParams.get("min") || "";
    max: searchParams.get("max") || "";
    sort: searchParams.get("sort") || ""
  }, [searchParams])

  const [currentPage, setCurrentPage] = useState(pageFromUrl)
  const [totalPages, setTotalPages] = useState(0)
  const limit = 20

  useEffect(() => {
    async function fetchTotalProducts() {
      const total = await getTotalProducts(searchTerm, filters)
      setTotalPages(Math.ceil(total / limit))
    }
    fetchTotalProducts()
  }, [searchTerm, filters])

  useEffect(() => {
    const urlPage = parseInt(searchParams.get("page")) || 1
    if (urlPage !== currentPage) {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", currentPage)
        router.replace(`/productos?${params.toString()}`, {scroll: false})
    }
  }, [currentPage, searchParams, router])

  useEffect(() => {
  if (totalPages > 0 && currentPage > totalPages) {
    setCurrentPage(totalPages)
  }
}, [currentPage, totalPages])

  return { currentPage, setCurrentPage, totalPages, limit, searchTerm, filters }
}

export default usePagination
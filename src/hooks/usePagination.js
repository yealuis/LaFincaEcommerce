'use client'
import { useState, useEffect, useMemo } from "react"
import { getTotalProducts } from "@/lib/db"
import { useSearchParams, useRouter } from "next/navigation"

const usePagination = () => {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("name") || ""
  const router = useRouter()
  const pageFromUrl = parseInt(searchParams.get("page")) || 1
  const filters = useMemo(() =>{
    searchParams.get("lab") || "";
    searchParams.get("min") || "";
    searchParams.get("max") || "";
    searchParams.get("cat") || "";
    searchParams.get("sort") || ""
  }, [searchParams])

  const [currentPage, setCurrentPage] = useState(pageFromUrl)
  const [totalPages, setTotalPages] = useState()
  const limit = 20

  useEffect(() => {
    async function fetchTotalProducts() {
      const total = await getTotalProducts(searchTerm, filters)
      setTotalPages(Math.ceil(total / limit))
    }
    fetchTotalProducts()
  }, [searchTerm, filters])

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search)
    currentParams.set("page", currentPage)
    router.push(`/productos?${currentParams.toString()}`)
  }, [currentPage, router])

  useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages || 1)
  }
}, [currentPage, totalPages])

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl)
    }
  },[searchParams, currentPage] )

  return { currentPage, setCurrentPage, totalPages, limit, searchTerm, filters }
}

export default usePagination
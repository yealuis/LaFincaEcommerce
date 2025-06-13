'use client'
import { useState, useEffect } from "react"
import { getTotalProducts } from "@/lib/db"
import { useSearchParams, useRouter } from "next/navigation"

const usePagination = () => {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("name") || ""
  const router = useRouter()
  const pageFromUrl = parseInt(searchParams.get("page")) || 1

  const [currentPage, setCurrentPage] = useState(pageFromUrl)
  const [totalPages, setTotalPages] = useState(null)
  const limit = 20

  useEffect(() => {
    async function fetchTotalProducts() {
      const total = await getTotalProducts(searchTerm)
      setTotalPages(Math.ceil(total / limit))
    }
    fetchTotalProducts()
  }, [searchTerm])

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search)
    currentParams.set("page", currentPage)
    router.push(`/productos?${currentParams.toString()}`, { scroll: false })
  }, [currentPage, router])

  useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages || 1)
  }
}, [currentPage, totalPages])

  return { currentPage, setCurrentPage, totalPages, limit, searchTerm }
}

export default usePagination
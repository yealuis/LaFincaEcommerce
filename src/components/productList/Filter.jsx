'use client'
import Button from "../UI/Button"
import styles from "./filter.module.css"
import { useState, useEffect } from "react"
import { getLabInfo } from "@/lib/db"
import { useRouter } from "next/navigation"

const Filter = ({onFilterChange}) => {
  const [lab, setLab] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [sort, setSort] = useState('')

  const [labs, setLabs] = useState([])

  const router = useRouter()

  useEffect(() => {
    getLabInfo().then(setLabs)
  }, [])
  
  const handleChange = () => {
    const params = new URLSearchParams(window.location.search)
    if (lab) params.set("lab", lab); else params.delete("lab")
    if (min) params.set("min", min); else params.delete("min")
    if (max) params.set("max", max); else params.delete("max")
    if (sort) params.set("sort", sort); else params.delete("sort")
    params.delete("name")
    params.set("page", 1)
    router.push(`/productos?${params.toString()}`)

    onFilterChange?.({ lab, min, max, sort })
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filtersGroup}>
        <select className={styles.filterSelect} value={lab} onChange={e => { setLab(e.target.value)}}>
          <option value=''>Laboratorios</option>
          {labs.map(l =>
            <option value={l.marca} key={l.marca}>{l.marca} </option>
          )}
        </select>
        <select className={`${styles.filterSelect}`} value={sort} onChange={e => { setSort(e.target.value)}} >
          <option>Orden Alfabético</option>
          <option value="asc mostRelevant">Más Relevantes</option>
        </select>
        <Button variant="primary" onClick={() => handleChange(onFilterChange)}>Aplicar</Button>
      </div>
    </div>
  )
}

export default Filter
'use client'
import Button from "../UI/Button"
import styles from "./filter.module.css"
import { useState, useEffect } from "react"
import { getCategoryInfo, getLabInfo } from "@/lib/db"
import { useRouter } from "next/navigation"

const Filter = ({onFilterChange}) => {
  const [lab, setLab] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [cat, setCat] = useState('')
  const [sort, setSort] = useState('')

  const [labs, setLabs] = useState([])
  const [cats, setCats] = useState([])

  const router = useRouter()

  useEffect(() => {
    getLabInfo().then(setLabs)
  }, [])
  
  useEffect(() => {
    getCategoryInfo().then(setCats)
  }, [])
  
  const handleChange = () => {
    const params = new URLSearchParams(window.location.search)
    if (lab) params.set("lab", lab); else params.delete("lab")
    if (min) params.set("min", min); else params.delete("min")
    if (max) params.set("max", max); else params.delete("max")
    if (cat) params.set("cat", cat); else params.delete("cat")
    if (sort) params.set("sort", sort); else params.delete("sort")
    params.delete("name")
    params.set("page", 1)
    router.push(`/productos?${params.toString()}`)

    onFilterChange?.({ lab, min, max, cat, sort })
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
        <input type="text" name="min" placeholder="minimo" className={styles.filterInput} value={min} onChange={e => { setMin(e.target.value)}} />
        <input type="text" name="max" placeholder="maximo" className={styles.filterInput} value={max} onChange={e => { setMax(e.target.value)}} />
        {/* TODO: Filter Categories */}
        <select className={styles.filterSelect} value={cat} onChange={e => { setCat(e.target.value)}} >
          <option value=''>Categoria</option>
          {cats.map(c =>
            <option value={c.descrip2} key={c.descrip2}>{c.descrip2}</option>
          )}
        </select>
        <select className={`${styles.filterSelect} ${styles.filterSort}`} value={sort} onChange={e => { setSort(e.target.value)}} >
          <option>Ordenar Por</option>
          <option value="asc price">Precio (Menor Precio)</option>
          <option value="desc price">Price (Mayor Precio)</option>
          <option value="asc mostRelevant">Más Relevantes</option>
        </select>
        <Button variant="primary" onClick={() => handleChange(onFilterChange)}>Cambiar</Button>
      </div>
    </div>
  )
}

export default Filter
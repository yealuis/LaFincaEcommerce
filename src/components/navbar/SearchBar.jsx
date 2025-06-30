"use client"
import { useRouter } from "next/navigation"
import styles from "./navbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const SearchBar = ({setOpen}) => {
  const router = useRouter()

  const handleSearch = e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")

    const currentParams = new URLSearchParams(window.location.search)
    currentParams.set("name", name)
    router.push(`/productos?${currentParams.toString()}`)
    if (setOpen) setOpen(false)
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSearch} >
      <input type="text" name="name" placeholder="Buscar" className={styles.searchInput} />
      <button className={styles.searchButton}>
        <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" className={styles.searchIcon}/>
      </button>
    </form>
  )
}

export default SearchBar
"use client"
import { useRouter } from "next/navigation"
import styles from "./navbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const SearchBar = () => {
  const router = useRouter()
  //Buscador
  const handleSearch = e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")

    if (name) {
      router.push(`/list?name=${name}`)
    }
  }

  return (
    <form className={styles.searchBar}  >
      <input type="text" name="name" placeholder="Search" className={styles.searchInput} onSubmit={handleSearch} />
      <button className={styles.searchButton}>
        <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" className={styles.searchIcon}/>
      </button>
    </form>
  )
}

export default SearchBar
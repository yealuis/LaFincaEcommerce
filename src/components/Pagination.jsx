'use client'
import styles from './pagination.module.css'

const Pagination = ({ currentPage, setCurrentPage, totalPages}) => {
  return (
    <div className={styles.paginationDiv}>
      <button className={styles.buttons} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} >Anterior</button>
      <span className={styles.currentPage}>{currentPage}</span>
      <button className={styles.buttons} disabled={!totalPages || currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} >Siguiente</button>
    </div>
  )
}

export default Pagination
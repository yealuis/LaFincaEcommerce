'use client'
import Button from '../UI/Button'
import styles from './pagination.module.css'

const Pagination = ({ currentPage, setCurrentPage, totalPages}) => {
  return (
    <div className={styles.paginationDiv}>
      <Button variant='primary' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Anterior</Button>
      <span className={styles.currentPage}>{currentPage}</span>
      <Button variant='primary' disabled={!totalPages || currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</Button>
    </div>
  )
}

export default Pagination
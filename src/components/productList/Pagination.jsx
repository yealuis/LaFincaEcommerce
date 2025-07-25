'use client'
import Button from '../UI/Button'
import styles from './pagination.module.css'

const Pagination = ({ currentPage, setCurrentPage, totalPages}) => {

  const hasNextPage = totalPages > 0 && currentPage < totalPages

  return (
    <div className={styles.paginationDiv}>
      <Button variant='primary' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Anterior</Button>
      <span className={styles.currentPage}>{currentPage} de {totalPages}</span>
      <Button variant='primary' disabled={!hasNextPage} onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</Button>
    </div>
  )
}

export default Pagination
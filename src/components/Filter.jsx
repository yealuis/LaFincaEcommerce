import styles from "./filter.module.css"

const Filter = () => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filtersGroup}>
        <select name="Laboratorio" id="" className={styles.filterSelect}>
          <option>Laboratorio</option>
          <option value="reveex">Reveex</option>
          <option value="labrin">Labrin</option>
          <option value="valmorca">Valmorca</option>
        </select>
        <input type="text" name="min" placeholder="minimo" className={styles.filterInput} />
        <input type="text" name="max" placeholder="maximo" className={styles.filterInput} />
        {/* TODO: Filter Categories */}
        <select name="cat" className={styles.filterSelect} >
          <option>Categoria</option>
          <option value="ganado">Ganado</option>
          <option value="mascotas">Mascotas</option>
          <option value="accesorios">Accesorios</option>
        </select>
        <select name="" id="" className={styles.filterSelect} >
          <option>Todos los filtros</option>
        </select>
      </div>
      <div>
        <select name="sort" id="" className={`${styles.filterSelect} ${styles.filterSort}`}>
          <option>Ordenar Por</option>
          <option value="asc price">Precio (Menor Precio)</option>
          <option value="desc price">Price (Mayor Precio)</option>
          <option value="asc mostRelevant">Más Relevantes</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
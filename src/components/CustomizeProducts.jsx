import styles from "./customizeProducts.module.css"

const CustomizeProducts = () => {
  return (
    <div className={styles.customizeContainer}>
      <h4 className={styles.customizeTitle}>Escoge un color</h4>
      <ul className={styles.chooseList}>
        <li className={styles.chooseCircles}>
          <div className={styles.chooseCirclesBorderBlue} />
        </li>
        <li className={`${styles.chooseCircles} ${styles.blue}`} ></li>
        <li className={`${styles.chooseCircles} ${styles.notAllowed}`} >
          <div className={styles.chooseCirclesBorderRed} />
        </li>
      </ul>
      <h4 className={styles.customizeTitle}>Escoge una presentación</h4>
      <ul className={styles.chooseList}>
        <li className={`${styles.chooseSize}`}>100 ml</li>
        <li className={`${styles.chooseSize} ${styles.chooseSizeNotSelected}`}>500 ml</li>
        <li className={`${styles.chooseSize} ${styles.chooseSizeDisable}`}>1 Litro</li>
      </ul>
    </div>
  )
}

export default CustomizeProducts
"use client"
import { useState } from "react"
import styles from "./customizeProducts.module.css"

const CustomizeProducts = () => {
  const [size, setSize] = useState(0)
  const [color, setColor] = useState(0)
  const isDisabled = (key) => key === 4

  const handleSizeChange = (key) => {
      return size === key ? styles.chooseSize : `${styles.chooseSize} ${styles.chooseSizeNotSelected}`
  }
  const handleColorChange = (key) => {
      if (color === key) return <div className={styles.chooseCirclesSelected} />
  }

  return (
    <div className={styles.customizeContainer}>
      <h4 className={styles.customizeTitle}>Escoge un color</h4>
      <ul className={styles.chooseList}>
        <li className={styles.chooseCircles} onClick={() => !isDisabled(1) && setColor(1)}>
          {handleColorChange(1)}
        </li>
        <li className={`${styles.chooseCircles} ${styles.blue}`} onClick={() => !isDisabled(2) && setColor(2)} >
          {handleColorChange(2)}
        </li>
        <li className={`${styles.chooseCircles} ${styles.yellow}`} onClick={() => !isDisabled(3) && setColor(3)} >
          {handleColorChange(3)}
        </li>
        <li className={`${styles.chooseCircles} ${styles.notAllowed}`} onClick={() => !isDisabled(4) && setColor(4)} >
          {handleColorChange(4)}
          <div className={styles.chooseCirclesRedbar} />
        </li>
      </ul>
      <h4 className={styles.customizeTitle}>Escoge una presentación</h4>
      <ul className={styles.chooseList}>
        <li className={`${handleSizeChange(1)}`} onClick={() => !isDisabled(1) && setSize(1)}>100 ml</li>
        <li className={`${handleSizeChange(2)}`} onClick={() => !isDisabled(2) && setSize(2)}>250 ml</li>
        <li className={`${handleSizeChange(3)}`} onClick={() => !isDisabled(3) && setSize(3)}>500 ml</li>
        <li className={`${handleSizeChange(4)} ${styles.chooseSizeDisable}`} onClick={() => !isDisabled(4) && setSize(4)}>
          <div className={styles.chooseSizeRedbar} />
          1 Litro
        </li>
      </ul>
    </div>
  )
}

export default CustomizeProducts
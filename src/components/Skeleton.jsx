import styles from "./skeleton.module.css"

const Skeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonTextShort}></div>
    </div>
  )
}

export default Skeleton
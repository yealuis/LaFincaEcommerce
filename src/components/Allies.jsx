import Link from "next/link"
import Image from "next/image"
import styles from "./allies.module.css"

const Allies = () => {
  return (
    <div className={styles.alliesContainer}>
      <Link href="https://reveex.com/" className={styles.alliesLink} target="_blank">
        <Image src={`/REVEEX.webp`} alt="Reveex" width={100} height={100} sizes="25vw" className={styles.images} />
      </Link>
      <Link href="https://labrinsa.com/" className={styles.alliesLink} target="_blank">
        <Image src={`/LABRIN.webp`} alt="Labrin" width={100} height={100} sizes="25vw" className={styles.images} />
      </Link>
      <Link href="https://www.instagram.com/agrofincanova/" className={styles.alliesLink} target="_blank">
        <Image src={`/FINCANOVA.webp`} alt="Finca Nova" width={100} height={100} sizes="25vw" className={styles.images} />
      </Link>
    </div>
  )
}

export default Allies
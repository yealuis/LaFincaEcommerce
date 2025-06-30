import Link from "next/link"
import Image from "next/image"
import styles from "./allies.module.css"

const Allies = () => {
  return (
    <section className={styles.section}>
      <div className={styles.partnersGrid}>
        <div className={styles.partnerCard}>
          <div className={styles.partnerLogo}>
            <Link href="https://reveex.com/" target='_blank'>
              <Image src='/REVEEX.webp' alt='Reveex' width={200} height={200}/>
            </Link>
          </div>
          <h3 className={styles.partnerName}>Reveex</h3>
        </div>

        <div className={styles.partnerCard}>
          <div className={styles.partnerLogo}>
            <Link href="https://labrinsa.com/" target='_blank'>
              <Image src='/LABRIN.webp' alt='Labrin' width={200} height={200}/>
            </Link>
          </div>
          <h3 className={styles.partnerName}>Labrin</h3>
        </div>

        <div className={styles.partnerCard}>
          <div className={styles.partnerLogo}>
            <Link  href="https://www.instagram.com/agrofincanova/" target="_blank">
              <Image src='/fincaNova.webp' alt='Finca Nova' width={200} height={200}/>
            </Link>
          </div>
          <h3 className={styles.partnerName}>Finca Nova</h3>
        </div>
      </div>
    </section>
  )
}

export default Allies
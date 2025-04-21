import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/lafincaLogoH.webp"
          alt="Next.js logo"
          width={180}
          height={90}
          priority
        />
      </main>
    </div>
  );
}

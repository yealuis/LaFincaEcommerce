import Image from "next/image";
import styles from "./page.module.css";
import Slider from "@/components/Slider";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div className={styles.page}>
      <Slider/>
      <main className={styles.main}>
        <div className={styles.productList}>
          <h1 className={styles.productH1}>Productos</h1>
          <ProductList/>
        </div>
      </main>
    </div>
  );
}

import styles from "./page.module.css";
import Slider from "../components/mainPage/Slider";
import ProductList from "@/components/productList/ProductList";
import CategoryList from "../components/mainPage/CategoryList";
import Allies from "@/components/mainPage/Allies";

export default function Home() {
  return (
    <div className={styles.page}>
      <Slider/>
      <main className={styles.main}>
        <div className={styles.section}>
          <div className={styles.header}>
            <h3 className={styles.title}>Productos Destacados</h3>
            <div className={styles.divider}></div>
          </div>
          <ProductList filterType="featured" />
        </div>
        <div className={styles.section}>
          <div className={styles.header}>
            <h3 className={styles.title}>Laboratorios</h3>
            <div className={styles.divider}></div>
          </div>
          <CategoryList />
        </div>
        <div className={styles.section}>
          <div className={styles.header}>
            <h3 className={styles.title}>Nuevos Productos</h3>
            <div className={styles.divider}></div>
          </div>
          <ProductList filterType="news" />
        </div>
        <div className={styles.section}>
          <div className={styles.header}>
            <h3 className={styles.title}>Nuestros Aliados</h3>
            <div className={styles.divider}></div>
          </div>
          <Allies/>
        </div>
      </main>
    </div>
  );
}

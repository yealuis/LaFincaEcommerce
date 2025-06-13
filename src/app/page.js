import styles from "./page.module.css";
import Slider from "../components/Slider";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
import Allies from "@/components/Allies";

export default function Home() {
  return (
    <div className={styles.page}>
      <Slider/>
      <main className={styles.main}>
        <div className={styles.productList}>
          <h1 className={styles.productH1}>Productos Destacados</h1>
          <ProductList filterType="featured" />
        </div>
        <div className={styles.categoryList}>
          <h1 className={styles.categoryH1}>Laboratorios</h1>
          <CategoryList filterType="labs" />
        </div>
        <div className={styles.productList}>
          <h1 className={styles.productH1}>Nuevos Productos</h1>
          <ProductList filterType="news" />
        </div>
        <div className={styles.allies}>
          <div className={styles.divSeparator}/>
          <h1 className={styles.alliesH1}>Nuestros Aliados</h1>
          <Allies/>
        </div>
      </main>
    </div>
  );
}

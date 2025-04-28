import Image from "next/image";
import styles from "./page.module.css";
import Slider from "../components/Slider";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";

export default function Home() {
  return (
    <div className={styles.page}>
      <Slider/>
      <main className={styles.main}>
        <div className={styles.productList}>
          <h1 className={styles.productH1}>Productos Destacados</h1>
          <ProductList/>
        </div>
        <div className={styles.categoryList}>
          <h1 className={styles.categoryH1}>Categorias</h1>
          <CategoryList/>
        </div>
        <div className={styles.productList}>
          <h1 className={styles.productH1}>Nuevos Productos</h1>
          <ProductList/>
        </div>
      </main>
    </div>
  );
}

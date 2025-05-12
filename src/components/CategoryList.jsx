import Link from "next/link"
import Image from "next/image"
import style from "./categorylist.module.css"

const CategoryList = () => {
  return (
    <div className={style.categorylist}>
      <div className={style.categoryListContainer}>
        {/*Categoria */}
        <Link href={"/productos?cat=test"} className={style.categoryLink}>
          <div className={style.categoryContainer}>
            <Image src={"/pets.webp"} alt="Mascotas" fill sizes="20vw" className={style.categoryImage} />
          </div>
          <h1 className={style.categoryTitle}>Mascotas</h1>
        </Link>
        {/*Categoria */}
        <Link href={"/productos?cat=test"} className={style.categoryLink}>
          <div className={style.categoryContainer}>
            <Image src={"/bufalo.webp"} alt="Bufalo" fill sizes="20vw" className={style.categoryImage} />
          </div>
          <h1 className={style.categoryTitle}>Ganadería</h1>
        </Link>
        {/*Categoria */}
        <Link href={"/productos?cat=test"} className={style.categoryLink}>
          <div className={style.categoryContainer}>
            <Image src={"/vaca.webp"} alt="Vaca" fill sizes="20vw" className={style.categoryImage} />
          </div>
          <h1 className={style.categoryTitle}>Ganadería</h1>
        </Link>
        {/*Categoria */}
        <Link href={"/productos?cat=test"} className={style.categoryLink}>
          <div className={style.categoryContainer}>
            <Image src={"/aves.webp"} alt="Avicultura" fill sizes="20vw" className={style.categoryImage} />
          </div>
          <h1 className={style.categoryTitle}>Avicultura</h1>
        </Link>
        {/*Categoria */}
        <Link href={"/productos?cat=test"} className={style.categoryLink}>
          <div className={style.categoryContainer}>
            <Image src={"/pets.webp"} alt="Mascotas" fill sizes="20vw" className={style.categoryImage} />
          </div>
          <h1 className={style.categoryTitle}>Mascotas</h1>
        </Link>
        {/*Categoria */}
        <Link href={"/productos?cat=test"} className={style.categoryLink}>
          <div className={style.categoryContainer}>
            <Image src={"/bufalo.webp"} alt="Bufalo" fill sizes="20vw" className={style.categoryImage} />
          </div>
          <h1 className={style.categoryTitle}>Ganadería</h1>
        </Link>
        {/*Categoria */}
        <Link href={"/productos?cat=test"} className={style.categoryLink}>
          <div className={style.categoryContainer}>
            <Image src={"/vaca.webp"} alt="Vaca" fill sizes="20vw" className={style.categoryImage} />
          </div>
          <h1 className={style.categoryTitle}>Ganadería</h1>
        </Link>
        {/*Categoria */}
        <Link href={"/productos?cat=test"} className={style.categoryLink}>
          <div className={style.categoryContainer}>
            <Image src={"/aves.webp"} alt="Aves" fill sizes="20vw" className={style.categoryImage} />
          </div>
          <h1 className={style.categoryTitle}>Avicultura</h1>
        </Link>
      </div>
    </div>
  )
}

export default CategoryList
'use client'

import Link from "next/link"
import Image from "next/image"
import styles from "./categorylist.module.css"
import { useEffect, useState } from "react"
import { getLabInfo } from "@/lib/db"

const CategoryList = ({}) => {

  const [labs, setLabs] = useState([])

  useEffect(() => {
    getLabInfo().then(setLabs)
  }, [])
  
  return (
    <div className={styles.categorylist}>
      <div className={styles.categoryListContainer}>
      {/*Laboratorio */}
        {labs.map(lab => 
          <Link href={`/productos?lab=${lab.marca}`} className={styles.categoryLink} key={lab.marca}>
            <div className={styles.categoryContainer}>
              <Image src={lab.imagen1 ? `data:image/webp;base64,${lab.imagen1}` : "/NO-DISPONIBLE.webp"} alt={lab.marca} fill sizes="20vw" className={styles.categoryImage} />
            </div>
            <h1 className={styles.categoryTitle}>{lab.marca}</h1>
          </Link>
        )}
      </div>
    </div>
  )
}

export default CategoryList
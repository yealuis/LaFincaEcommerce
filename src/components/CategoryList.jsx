'use client'

import Link from "next/link"
import Image from "next/image"
import style from "./categorylist.module.css"
import { useEffect, useState } from "react"
import { getLabInfo } from "@/lib/db"

const CategoryList = ({filterType}) => {

  const [labs, setLabs] = useState([])

  useEffect(() => {
    getLabInfo(filterType).then(setLabs)
  }, [filterType])
  
  return (
    <div className={style.categorylist}>
      <div className={style.categoryListContainer}>
      {/*Laboratorio */}
        {labs.map(lab => 
          <Link href={`/productos?cat=${lab.marca}`} className={style.categoryLink}>
            <div className={style.categoryContainer}>
              <Image src={`/${lab.marca}.webp`} alt={lab.marca} fill sizes="20vw" className={style.categoryImage} />
            </div>
            <h1 className={style.categoryTitle}>{lab.marca}</h1>
          </Link>
        )}
      </div>
    </div>
  )
}

export default CategoryList
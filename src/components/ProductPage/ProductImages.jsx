'use client'
import Image from "next/image"
import { useState, useEffect } from "react"
import styles from "./productImages.module.css"
import { useParams } from "next/navigation"
import { getProductInfo } from "@/lib/db"


const ProductImages = () => {
  const [index, setIndex] = useState(0)
  const params = useParams()
  const [product, setProduct] = useState([])

  const images = [
  {
    id: "1",
    url: product.imagen1 ? `data:image/webp;base64,${product.imagen1}` : "/NO-DISPONIBLE.webp",
    alt: `${product.descrip} img1`
  },
  {
    id: "2",
    url: product.imagen2 ? `data:image/webp;base64,${product.imagen2}` : "/NO-DISPONIBLE.webp",
    alt: `${product.descrip} img2`
  },
  {
    id: "3",
    url: product.imagen3 ? `data:image/webp;base64,${product.imagen3}` : "/NO-DISPONIBLE.webp",
    alt: `${product.descrip} img3`
  }
]

  useEffect(() => {
    getProductInfo(params.slug).then((data) => setProduct(data[0]))
  },[params.slug])

  return (

    <div>
      <div className={styles.principalImage}>
        <Image src={images[index].url} alt="" fill sizes="50vw" className={styles.image} />
      </div>
{/*      <div className={styles.secondaryImagesDiv}>
        {images.map((img, i) => (
          <div className={styles.secondaryImage} key={img.id} onClick={() => setIndex(i)}>
            <Image src={img.url} alt={img.alt} fill sizes="30vw" className={styles.image} />
          </div>
        ))}
      </div>*/}
    </div>
  )
}

export default ProductImages
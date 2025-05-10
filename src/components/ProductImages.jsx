'use client'
import Image from "next/image"
import { useState } from "react"
import styles from "./productImages.module.css"

const images = [
  {
    id: "1",
    url: "/isopan.webp",
    alt: "Isopan"
  },
  {
    id: "2",
    url: "/isopan2.webp",
    alt: "Isopan"
  },
  {
    id: "2",
    url: "/isopan3.webp",
    alt: "Isopan"
  }
]

const ProductImages = () => {
  const [index, setIndex] = useState(0)

  return (

    <div>
      <div className={styles.principalImage}>
        <Image src={images[index].url} alt="" fill sizes="50vw" className={styles.image} />
      </div>
      <div className={styles.secondaryImagesDiv}>
        {images.map((img, i) => (
          <div className={styles.secondaryImage} key={img.id} onClick={() => setIndex(i)}>
            <Image src={img.url} alt={img.alt} fill sizes="30vw" className={styles.image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImages
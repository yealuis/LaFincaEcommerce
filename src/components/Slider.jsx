"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./silder.module.css"

const slides = [
  {
    id: 1,
    title: "La Finca productos y servicios",
    description: "Sale! Up to 50% off!",
    img: "/publicacion.webp",
    imgAlt: "La Finca",
    url: "/",
    bg: "bgOne",
  },
  {
    id: 2,
    title: "Estrovet",
    description: "Sale! Up to 50% off!",
    img: "/estrovet.webp",
    imgAlt: "Estrovet",
    url: "/",
    bg: "bgTwo",
  },
  {
    id: 3,
    title: "Septibron",
    description: "Sale! Up to 50% off!",
    img: "/septibron.webp",
    imgAlt: "Septibron",
    url: "/",
    bg: "bgThree",
  },
]

const Slider = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className={styles.slider}>
      <div className={styles.sliderContainer} style={{ transform: `translateX(-${current * 100}vw)` }}>
        {slides.map (slide =>
        <div className={`${styles.slides} ${styles[slide.bg]}`} key={slides.id}>
          {/* Contenedor del texto */}
          <div className={styles.slideText}>
            <h2 className={styles.textH2}>{slide.description}</h2>
            <h1 className={styles.textH1}>{slide.title}</h1>
            <Link href={slide.url}><button className={styles.textButton}>Compra ahora</button></Link>
          </div>
          {/* Contenedor de la imagen */}
          <div className={styles.slideImage}>
            <Image src={slide.img} alt={slide.imgAlt} fill sizes="100%"/>
          </div>
        </div>
        )}
      </div>
      <div className={styles.selector}>
        {slides.map((slide, index) => (
          <div
            className={`${styles.selectorButton} ${ current === index ? styles.selectorScale : "" }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className={styles.selectorCircle}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider
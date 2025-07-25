"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./slilder.module.css";
import Button from "../UI/Button";

const slides = [
  {
    id: 1,
    title: "La Finca productos y servicios",
    description: "Venta al mayor y detal de insumos, Medicinas Veterianarias y todo lo relacionada con el campo",
    img: "/publicacion.webp",
    imgAlt: "La Finca",
    url: "/productos",
    bg: "bgOne",
  },
  {
    id: 2,
    title: "Estrovet",
    description: "Uno de nuetros productos mas comprados",
    img: "/estrovet.webp",
    imgAlt: "Estrovet",
    url: "/productos/1000037",
    bg: "bgTwo",
  },
  {
    id: 3,
    title: "Septibron",
    description: "Uno de nuestros productos mas comprados",
    img: "/septibron.webp",
    imgAlt: "Septibron",
    url: "/productos/1000081",
    bg: "bgThree",
  },
]

const Slider = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 4000)
  
    return () => clearInterval(interval)
    }, [])

  return (
    <div className={styles.slider}>
      <div className={styles.sliderContainer} style={{ transform: `translateX(-${current * 100}vw)` }}>
        {slides.map (slide =>
        <div className={`${styles.slides} ${styles[slide.bg]}`} key={slide.id}>
          {/* Contenedor del texto */}
          <div className={styles.slideText}>
            <h2 className={styles.textH2}>{slide.description}</h2>
            <h1 className={styles.textH1}>{slide.title}</h1>
            <Link href={slide.url}><Button variant="edit">Compra ahora</Button></Link>
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
"use client";

import Banner from "../components/Banner";
import DecadeCard from "../components/DecadeCard";
import styles from "./CasosCriminais.module.css";
import Link from "next/link";
import React from "react";

export default function CasosCriminais() {
  return (
    <div>
    <div className={styles.container}>
      <Banner title="CASOS CRIMINAIS" image="/images/image-casos.png" />

      <Link href="/noticia70" className={styles.noUnderline}>
      <DecadeCard image="/images/image-videos.png" text="Década de 1970" />
      </Link>

      <Link href="/noticia80" className={styles.noUnderline}>
      <DecadeCard image="/images/image.png" text="Década de 1980" />
      </Link>
    </div>

    <div className={styles.container}>
      <Link href="/noticia90" className={styles.noUnderline}>
      <DecadeCard image="/images/image-casos.png" text="Década de 1990" />
      </Link>

      <Link href="/noticia2000" className={styles.noUnderline}>
      <DecadeCard image="/images/images.jpg" text="Década de 2000" />
      </Link>
    </div>

    <div className={styles.container}>
      <Link href="/noticia2010" className={styles.noUnderline}>
      <DecadeCard image="/images/crime.png" text="Década de 2010" />
      </Link>
      
      <Link href="/noticia2020" className={styles.noUnderline}>
      <DecadeCard image="/images/bg-home.png" text="Década de 2020" className={styles.description} />
      </Link>
    </div>
    </div>
  );
}

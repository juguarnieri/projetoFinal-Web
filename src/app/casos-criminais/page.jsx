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
      <DecadeCard image="/images/image-videos.png" text="Década de 1970" />
      <Link href="/noticia80" className={styles.noUnderline}>
      <DecadeCard image="/images/image.png" text="Década de 1980" />
      </Link>
      <DecadeCard image="/images/image-casos.png" text="Década de 1990" />
    </div>

    <div className={styles.container}>
      <DecadeCard image="/images/images.jpg" text="Década de 2010" />
      <DecadeCard image="/images/crime.png" text="Década de 2020" />
      <DecadeCard image="/images/bg-home.png" text="Década de 2000" />
    </div>
    </div>
  );
}

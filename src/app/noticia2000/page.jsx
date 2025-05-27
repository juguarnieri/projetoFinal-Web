"use client";

import Banner from "../components/Banner";
import React from "react";
import styles from "./Noticia2000.module.css";

export default function Casos2000() {
  return (
    <div className={styles.container}>
      <Banner title="CASOS CRIMINAIS DOS ANOS 2000" image="/images/image-casos.png" />
    </div>

  );
}
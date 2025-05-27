"use client";

import Banner from "../components/Banner";
import React from "react";
import styles from "./Noticia2010.module.css";

export default function Casos2010() {
  return (
    <div className={styles.container}>
      <Banner title="Década de 2010" image="/images/crime.png" />
    </div>

  );
}
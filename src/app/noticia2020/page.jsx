"use client";

import Banner from "../components/Banner";
import React from "react";
import styles from "./Noticia2020.module.css";

export default function Casos80() {
  return (
    <div className={styles.container}>
      <Banner title="CASOS CRIMINAIS DOS ANOS 2020" image="/images/bg-home.png" />
    </div>

  );
}
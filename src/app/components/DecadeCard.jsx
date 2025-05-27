import React from "react";
import styles from "../styles/DecadeCard.module.css";
import Image from "next/image";

export default function DecadeCard({ image, text }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image width="600" height="300" src={image} alt="Imagem da década" className={styles.image} />
      <p className={styles.description}>{text}</p>
      </div>
    </div>
  );
}
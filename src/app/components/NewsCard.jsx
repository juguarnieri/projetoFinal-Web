import React, { useEffect, useState } from "react";
import styles from "../styles/NewsCard.module.css";
import Image from "next/image";
import Link from "next/link";

export default function NewsCard({ title, image, description, link }) {
  let validImage = "/images/placehold.png";

  if (typeof image === "string" && image.trim() !== "") {
    if (image.startsWith("http") || image.startsWith("/")) {
      validImage = image;
    } else {

      validImage = `http://localhost:4000/uploads/${image}`;
    }
  }

  return (
    <div className={styles.card}>
      <Image
        src={validImage}
        alt="Imagem da notícia"
        width={200}
        height={200}
        className={styles.image}
        priority
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <Link href={link}>
          <button className={styles.button}>LEARN MORE</button>
        </Link>
      </div>
    </div>
  );
}
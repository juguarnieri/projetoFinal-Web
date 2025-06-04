import React from "react";
import styles from "../styles/NewsCard.module.css";
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
      <img
        src={validImage}
        alt="Imagem da notícia"
        width={200}
        height={200}
        className={styles.image}
        style={{ objectFit: "cover", background: "#eee" }}
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
import React from "react";
import styles from "../styles/NewsCard.module.css";
import Image from "next/image";

export default function NewsCard({ title, image, description }) {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Image 
                src={image}
                alt="Imagem da notícia"
                width={300}
                height={200}
                className={styles.image}
                />
                <h2>{title}</h2>
     
            </div>
            <p className={styles.description}>{description}</p>
        </div>
    );
}


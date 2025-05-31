"use client";

import { Card, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import styles from "../styles/NoticiasSection.module.css";

export default function NoticiasSection({ noticias, loading, onClickNoticia }) {
  const router = useRouter();

  return (
    <div>
      {loading ? (
        <Skeleton active />
      ) : (
        <div className={styles.cardsContainer}>
          {noticias.map((noticia) => (
            <Card
              key={noticia.id}
              className={styles.card}
              hoverable
              onClick={() => router.push(`/destaques/${noticia.id}`)}
              cover={
                <img
                  src={
                    noticia.image
                      ? noticia.image.startsWith("http")
                        ? noticia.image
                        : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${noticia.image}`
                      : "https://via.placeholder.com/400x200?text=Sem+Imagem"
                  }
                  alt={noticia.title}
                  className={styles.image}
                />
              }
            >
              <div className={styles.textContent}>
                {noticia.tipo === "investigação" && (
                  <span className={styles.badge}>INVESTIGAÇÃO</span>
                )}
                <h3 className={styles.title}>{noticia.title}</h3>
                <p className={styles.description}>{noticia.description}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
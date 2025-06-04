"use client";

import { Card, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../styles/NoticiasSection.module.css";

export default function NoticiasSection({ noticias, loading, onClickNoticia }) {
  const router = useRouter();

  return (
    <div>
      {loading ? (
        <Skeleton active />
      ) : (
        <div className={styles.cardsContainer}>
          {noticias.map((noticia) => {
            let validImage = "https://via.placeholder.com/400x200?text=Sem+Imagem";
            if (typeof noticia.image === "string" && noticia.image.trim() !== "") {
              if (noticia.image.startsWith("http")) {
                validImage = noticia.image;
              } else if (noticia.image.startsWith("/")) {
                validImage = noticia.image;
              } else {
                validImage = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "")}/uploads/${noticia.image}`;
              }
            }
            return (
              <Card
                key={noticia.id}
                className={styles.card}
                hoverable
                onClick={() => router.push(`/noticiaCaryn/${noticia.id}`)}
                cover={
                  <Image
                    src={validImage}
                    alt={noticia.title}
                    width={400}
                    height={200}
                    className={styles.image}
                    style={{ objectFit: "cover", background: "#eee" }}
                    priority={false}
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
            );
          })}
        </div>
      )}
    </div>
  );
}
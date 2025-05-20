"use client";

import { Carousel, Skeleton } from "antd";
import styles from "../styles/PodcastsCarousel.module.css";

export default function PodcastsCarousel({ podcasts, loading }) {
  return (
    <div className={styles.wrapper}>
             <div className={styles.titulo}>
        <span>Top Podcasts</span>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <Carousel
          dots={false}
          infinite
          autoplay
          autoplaySpeed={5000}
          className={styles.carousel}
        >
          {podcasts.map((podcast) => {
            // Monta a URL da imagem conforme o backend
            const imageUrl = podcast.image?.startsWith("http")
              ? podcast.image
              : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${podcast.image}`;
            return (
              <div
                key={podcast.id}
                className={styles.card}
                onClick={() => window.open(podcast.link, "_blank")}
                style={{ cursor: "pointer" }}
                 >
                <img
                  src={imageUrl || "https://via.placeholder.com/400x200?text=Sem+Imagem"}
                  alt={podcast.title}
                  className={styles.image}
                />
                <div className={styles.content}>
                  <h3 className={styles.podcastTitle}>{podcast.title}</h3>
                  <p className={styles.description}>{podcast.description}</p>
                </div>
              </div>
            );
          })}
        </Carousel>
      )}
       </div>
  );
}
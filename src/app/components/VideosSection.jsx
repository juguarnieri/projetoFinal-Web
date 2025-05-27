"use client";

import { Skeleton } from "antd";
import styles from "../styles/VideosSection.module.css";

function getYoutubeThumb(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "";
}

function groupByCategory(videos) {
  return videos.reduce((acc, video) => {
    const category = video.category || "Sem categoria";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(video);
    return acc;
  }, {});
}

export default function VideosSection({ videos, loading }) {
  const videosByCategory = groupByCategory(videos);

  return (
    <div className={styles.section}>
       <div className={styles.titulo}>
        <span>Vídeos Virais</span>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        Object.entries(videosByCategory).map(([category, videos]) => (
          <div key={category} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.toUpperCase()}</h2>
            <div className={styles.grid}>
            {videos.map((video) => (
              <div
                key={video.id}
                className={styles.card}
                onClick={() => window.open(video.link, "_blank")}
                style={{ cursor: "pointer" }}
              >
              <div className={styles.videoWrapper}>
                <img
                  src={
                    video.image
                      ? (video.image.startsWith("http")
                          ? video.image
                          : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${video.image}`)
                      : getYoutubeThumb(video.link)
                  }
                  alt={video.title}
                  className={styles.thumb}
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.description}>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
        ))
      )}
    </div>
  );
}

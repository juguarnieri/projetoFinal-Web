"use client";

import styles from "../styles/VideosDestaques.module.css";

export default function VideosDestaques({ videos = [], loading }) {
  if (loading) {
    return <div className={styles.skeleton}>Carregando vídeos...</div>;
  }

  if (!videos.length) {
    return <p className={styles.empty}>Nenhum vídeo em destaque.</p>;
  }

  return (
    <div className={styles.grid}>
      {videos.map((video) => (
        <div
          key={video.id}
          className={styles.card}
          onClick={() => window.open(video.link, "_blank")}
        >
          <div className={styles.thumbWrapper}>
            <img
              src={
                video.image
                  ? video.image.startsWith("http")
                    ? video.image
                    : `${process.env.NEXT_PUBLIC_API_URL.replace(/\/api$/, "")}/uploads/${video.image}`
                  : `https://img.youtube.com/vi/${(video.link || "").split("v=")[1]}/hqdefault.jpg`
              }
              alt={video.title}
              className={styles.thumb}
            />
            <span className={styles.playIcon}>▶</span>
          </div>
          <div className={styles.info}>
            <h3 className={styles.title}>{video.title}</h3>
            <p className={styles.description}>{video.description}</p>
            {video.category && (
              <span className={styles.badge}>{video.category}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
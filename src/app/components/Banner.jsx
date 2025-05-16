import styles from "../../app/styles/Banner.module.css";

export default function Banner({ title = "Notícias do Dia", image }) {
  return (
    <div
      className={styles.bannerCard}
      style={{
        backgroundImage: `url(${image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"})`,
      }}
    >
      <div className={styles.bannerText}>
        <span>{title}</span>
      </div>
    </div>
  );
}
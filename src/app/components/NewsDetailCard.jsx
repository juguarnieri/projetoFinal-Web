import styles from '../styles/NewsDetailCard.module.css';

export default function NewsDetailCard({ title, image, description, text }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
}

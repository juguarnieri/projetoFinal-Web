import styles from "../styles/NewsDetailCard.module.css";
import Image from "next/image";

export default function NewsDetailCard({ title, image, description, text, link }) {
  let validImage = "/images/placehold.png";
  if (typeof image === "string" && image.trim() !== "") {
    if (image.startsWith("http")) {
      validImage = image;
    } else if (image.startsWith("/")) {
      validImage = image;
    } else {
      validImage = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "")}/uploads/${image}`;
    }
  }

  return (
    <div className={styles.detailContainer}>
      <Image
        src={validImage}
        alt={title}
        width={800}
        height={400}
        className={styles.detailImage}
        priority
      />
      <h1 className={styles.detailTitle}>{title}</h1>
      <p className={styles.detailDescription}>{description}</p>
      <div className={styles.detailText}>{text}</div>
      {link && (
        <a
          href={link}
          className={styles.linkBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 Ver fonte original
        </a>
      )}
    </div>
  );
}

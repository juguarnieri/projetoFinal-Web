import Link from "next/link";
import styles from "../noticia70/Noticia70.module.css";

export default function VoltarDecadasButton() {
  return (
    <Link href="/casos-criminais" className={styles.voltarBtn}>
      ⟵ Voltar para décadas
    </Link>
  );
}
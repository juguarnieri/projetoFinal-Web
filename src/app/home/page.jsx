import styles from "./Home.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h2>Página Home</h2>
      <p>Conteúdo da home aqui...</p>
      <Link href="/users">Ir para Users</Link>
    </div>
  );
}
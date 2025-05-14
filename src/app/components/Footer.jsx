import React from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <div className={styles.logo}>CW</div>
        <span className={styles.title}>casos chocantes</span>
      </div>
      <p className={styles.copy}>
        © Copyright 2000–2025 Crime Whispers Comunicação e Participações S.A.
      </p>
    </footer>
  );
}

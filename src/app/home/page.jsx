"use client";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Banner from "../components/Banner";
import Image from "next/image";
import Carregando from "../components/Carregando";


export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("homeBgBody");
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => {
      document.body.classList.remove("homeBgBody");
      clearTimeout(timer);
    };
  }, []);

  if (loading) return <Carregando />;

  return (
    <div>
      <Banner
        title="Bem-vindo ao Crime Whispers"
        image="/images/cinza.png"
      />
      <div className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.heading}>
            Descubra os casos mais intrigantes do Brasil e do mundo
          </h2>
          <p className={styles.paragraph}>
            Aqui você encontra notícias, podcasts, vídeos e análises sobre crimes reais, investigações e mistérios não solucionados. Explore conteúdos exclusivos, participe de debates e fique por dentro das novidades do universo true crime.
          </p>
        </section>

        <div className={styles.flexRow}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/crime.png"
              alt="Ilustração Crime Whispers"
              width={600}
              height={320}
              className={styles.image}
            />
          </div>

          <section className={styles.contactSection}>
            <h3>Contato</h3>
            <p>Tem dúvidas, sugestões ou deseja colaborar? Fale com a nossa equipe!</p>
            <form
              action="mailto:contato@crimewhispers.com"
              method="POST"
              encType="text/plain"
              className={styles.contactForm}
            >
              <input type="text" name="nome" placeholder="Seu nome" required />
              <input type="email" name="email" placeholder="Seu e-mail" required />
              <textarea name="mensagem" placeholder="Sua mensagem" rows={4} required />
              <button type="submit">Enviar mensagem</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

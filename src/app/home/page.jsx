"use client";
import styles from "./Home.module.css";
import Banner from "../components/Banner";

export default function HomePage() {
  return (
    <div>
      <Banner title="CRIME WHISPERS" image="/images/imagemContato.png" />
      <div className={styles.container}>
        <section className={styles.largeCard}>
          <h2 className={styles.largeCardTitle}>
            BEM-VINDO AO CRIME WHISPERS!
          </h2>
          <p className={styles.largeCardText}>
            Explore os casos mais intrigantes e misteriosos do Brasil e do mundo. Descubra análises detalhadas, participe de debates e fique por dentro das últimas notícias do universo true crime.
          </p>
        </section>

        <section className={styles.contactSection}>
          <h3>CONTATO</h3>
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
  );
}
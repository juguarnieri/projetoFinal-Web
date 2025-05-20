"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Sobre.module.css";

const API_URL = "http://localhost:4000";
const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function SobrePage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await axios.get(`${API_URL}/api/about/team`, { headers: HEADERS });
        setTeamMembers(response.data?.data || []);
      } catch (err) {
        console.error("Erro ao carregar membros da equipe:", err);
      }
    }

    fetchTeamMembers();
  }, []);

  const handleNext = () => {
    if (currentIndex < teamMembers.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles.sobreWrapper}>
      <section className={styles.aboutSection}>
        <h1>Sobre Nós</h1>
        <p>
        Crime Whispers é um site dedicado a compartilhar histórias reais de crimes que marcaram diferentes épocas, tanto no Brasil quanto ao redor do mundo. Com uma abordagem cuidadosa e informativa, buscamos oferecer aos nossos leitores análises detalhadas e informações precisas sobre os casos mais fascinantes e intrigantes.
        
        Nosso objetivo é ir além dos relatos tradicionais, explorando o contexto histórico, social e cultural em que os crimes ocorreram, proporcionando uma experiência rica e reflexiva para todos os interessados no tema.
        </p>
      </section>
      <section className={styles.teamSection}>
        <div className={styles.carouselWrapper}>
          <button className={`${styles.carouselButton} ${styles.left}`} onClick={handlePrev}>
            &#8249;
          </button>
          <div
            className={styles.carousel}
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.teamCard}>
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className={styles.teamPhoto}
                />
                <div className={styles.teamInfo}>
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          <button className={`${styles.carouselButton} ${styles.right}`} onClick={handleNext}>
            &#8250;
          </button>
        </div>
      </section>
    </div>
  );
}
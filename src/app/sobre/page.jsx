"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Sobre.module.css";
import Banner from "../components/Banner";

const API_URL = "http://localhost:4000";
const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function SobrePage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

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
    } else {
      setCurrentIndex(0); 
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(teamMembers.length - 1); 
    }
  };

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMember(null);
  };

  return (
    <div>

      <Banner title="SOBRE NÓS" image="/images/images.jpg" />

    <div className={styles.sobreWrapper}>
      <section className={styles.aboutSection}>

        <h1>Um pouco sobre nossa equipe:</h1>
        <p>
        Crime Whispers é um espaço dedicado a contar histórias reais de crimes, com precisão, respeito e compromisso com a verdade. Nosso objetivo é levar aos leitores um conteúdo informativo, sensível e responsável, explorando casos do Brasil e do mundo que marcaram a sociedade e continuam a despertar interesse e reflexão.

       Com uma abordagem investigativa e cuidadosa, oferecemos relatos detalhados sobre os crimes, as investigações, os julgamentos e os desdobramentos mais relevantes. Buscamos ir além dos fatos, contextualizando cada caso em seu cenário social, político e cultural, para que nossos leitores compreendam a complexidade por trás dos acontecimentos.

      Nosso conteúdo é atualizado regularmente, com cobertura de casos recentes, investigações em andamento e revisitações a crimes que já foram solucionados, mas que ainda levantam dúvidas e reflexões. Trabalhamos com uma linguagem clara e acessível, sempre pautada na ética jornalística e no respeito às vítimas, aos familiares e aos envolvidos.
        </p>
        <h1>O que nos guia:</h1>
        <p><span>Jornalismo investigativo –</span> Utilizamos fontes confiáveis, dados públicos e reportagens apuradas para garantir informações corretas e bem embasadas.</p>

        <p><span>Responsabilidade e ética –</span> Tratamos cada história com empatia, evitando a exploração sensacionalista e valorizando a dignidade humana.</p>

        <p><span>Conteúdo impactante e relevante –</span> Apresentamos histórias que provocam reflexão, revelam realidades ocultas e mostram o lado mais complexo da natureza humana.</p>

       <p><span>Acesso à informação –</span> Acreditamos que o conhecimento é uma ferramenta poderosa e, por isso, democratizamos o acesso a informações sobre crimes reais, sempre com responsabilidade.</p>
       
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
          <div
            key={member.id}
            className={styles.teamCard}
            onClick={() => handleOpenModal(member)} 
            style={{ cursor: "pointer" }}
          >
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
      {modalVisible && selectedMember && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <img
              src={selectedMember.photo_url}
              alt={selectedMember.name}
              className={styles.modalPhoto}
            />
            <h3>{selectedMember.name}</h3>
            <p>{selectedMember.role}</p>
            <button className={styles.closeButton} onClick={handleCloseModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
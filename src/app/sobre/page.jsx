"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton, message } from "antd";
import styles from "./Sobre.module.css";

const API_URL = "http://localhost:4000"; // Certifique-se de que o backend está rodando nesta URL
const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY }; // Certifique-se de que a variável está configurada corretamente

export default function SobrePage() {
  const [aboutData, setAboutData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        setLoading(true);

        // Fazendo as requisições para os dados da página e da equipe
        const [aboutRes, teamRes] = await Promise.all([
          axios.get(`${API_URL}/api/about`, { headers: HEADERS }),
          axios.get(`${API_URL}/api/team-members`, { headers: HEADERS }),
        ]);

        setAboutData(aboutRes.data);
        setTeamMembers(teamRes.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        message.error("Erro ao carregar dados da página Sobre. Verifique sua conexão com o backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchAboutData();
  }, []);

  if (loading) return <Skeleton active />;

  if (!aboutData) {
    return <p>Erro ao carregar dados da página. Tente novamente mais tarde.</p>;
  }

  return (
    <div className={styles.sobreWrapper}>
      <h2>{aboutData.main_title}</h2>
      <div className={styles.sobreContent}>
        <section className={styles.sobreLeft}>
          <h3>{aboutData.subtitle}</h3>
          <p>{aboutData.description}</p>
          <h4>{aboutData.commitment_title}</h4>
          <p>{aboutData.commitment_text}</p>
        </section>
        <section className={styles.sobreRight}>
          <h3>Equipe</h3>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles.teamCard}>
              <img src={member.photo_url} alt={member.name} className={styles.teamPhoto} />
              <div className={styles.teamInfo}>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
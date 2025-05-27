'use client';

import { useEffect, useState } from 'react';
import styles from '../podcasts/Podcast.module.css';

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/podcasts', {
      headers: {
        'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json); // Verifica os dados recebidos

        if (Array.isArray(json.data)) {
          const ativos = json.data.filter((podcast) => podcast.is_featured); // Filtra apenas os destacados
          const semDuplicatas = [...new Map(ativos.map((podcast) => [podcast.id, podcast])).values()]; // Remove duplicados
          setPodcasts(semDuplicatas);
        } else {
          setErro('Nenhum podcast ativo encontrado.');
        }
      })
      .catch(() => {
        setErro('Erro ao carregar podcasts.');
      });
  }, []);

  if (erro) return <p className={styles.erro}>{erro}</p>;
  if (podcasts.length === 0) return <p className={styles.carregando}>Carregando podcasts...</p>;

  const categorias = [...new Set(podcasts.map((podcast) => podcast.category))];

  return (
    <div>
      <div className={styles.banner}>
        <img src="/images/scenecrime.jpg" title="Podcasts" style={{ width: '100%', height: '25rem', objectFit: 'cover' }} />
        <h1 className={styles.titulo}>Podcast</h1>
      </div>

      {categorias.map((categoria) => (
        <div key={categoria} className={styles.categoria}>
          <h2>{categoria}</h2>
          <div className={styles.carousel}>
            {podcasts
              .filter((podcast) => podcast.category === categoria)
              .map((podcast) => (
                <div key={podcast.id} className={styles.card} onClick={() => window.open(podcast.link, '_blank')}>
                  <img src={podcast.image} alt={podcast.title} className={styles.imagem} />
                  <h3>{podcast.title}</h3>
                  <p className={styles.description}>{podcast.description}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

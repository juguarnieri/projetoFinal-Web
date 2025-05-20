'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/PodcastsCarousel.module.css';

export default function PodcastCarousel() {
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const res = await fetch('http://localhost:4000/api/podcasts');
        const json = await res.json();

        console.log('Dados recebidos da API:', json);

        if (Array.isArray(json.data)) {
          setPodcasts(json.data);
        } else {
          setError('Formato de resposta inesperado.');
        }
      } catch (err) {
        setError('Erro ao buscar podcasts: ' + err.message);
      }
    }

    fetchPodcasts();
  }, []);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (podcasts.length === 0) {
    return <p className={styles.aviso}>Nenhum podcast encontrado.</p>;
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTrack}>
        {podcasts.map((podcast) => (
          <div key={podcast.id} className={styles.podcastCard}>
            <img src={podcast.image} alt={podcast.title} className={styles.podcastImage} />
            <div className={styles.podcastInfo}>
              <h2 className={styles.podcastTitle}>{podcast.title}</h2>
              <p className={styles.podcastDescription}>{podcast.description}</p>
              <p><strong>Categoria:</strong> {podcast.category}</p>
              <p><strong>Visualizações:</strong> {podcast.views}</p>
              <p><strong>Destaque:</strong> {podcast.is_featured ? 'Sim' : 'Não'}</p>
              <a
                href={podcast.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.podcastLink}
              >
                Ouvir podcast
              </a>
              <p><small>Criado em: {new Date(podcast.created_at).toLocaleDateString()}</small></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

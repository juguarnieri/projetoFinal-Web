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
        if (Array.isArray(json.data)) {
          setPodcasts(json.data);
        } else {
          setErro('Nenhum podcast encontrado.');
        }
      })
      .catch(() => {
        setErro('Erro ao carregar podcasts.');
      });
  }, []);

  if (erro) return <p>{erro}</p>;
  if (podcasts.length === 0) return <p>Carregando podcasts...</p>;

  return (
    <div>
      
     <div className={styles.banner}>
  <img
    src="/images/scenecrime.jpg"
    title="Podcasts"
    style={{ width: '100%', height: '25rem', objectFit: 'cover' }}
  />
  <h1 className={styles.titulo}>Podcast</h1>
</div>

      <div className={styles.carousel}>
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className={styles.card}
            onClick={() => window.open(podcast.link, '_blank')}
          >
            <img
              src={podcast.image}
              alt={podcast.title}
              className={styles.imagem}
            />
            <p className={styles.categoria}>{podcast.category}</p>
            <h3 className={styles.title}>{podcast.title}</h3>
            <p className={styles.description}>{podcast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

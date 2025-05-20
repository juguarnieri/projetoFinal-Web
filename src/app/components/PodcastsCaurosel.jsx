'use client';


import { useEffect, useState } from 'react';
import styles from '../styles/PodcastsCarousel.module.css';


export default function PodcastCarousel() {
  const [podcasts, setPodcasts] = useState([]);
  const [erro, setErro] = useState('');


  useEffect(() => {
    fetch('http://localhost:4000/api/podcasts', {
      headers: {
        'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z'
      }
    })
      .then(res => res.json())
      .then(json => {
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
    <div className={styles.carousel}>
      {podcasts.map(podcast => (
        <div key={podcast.id} className={styles.card}>
          <img src={podcast.image} alt={podcast.title} className={styles.imagem} />
          <h3>{podcast.title}</h3>
          <p>{podcast.description}</p>
          <p>Categoria: {podcast.category}</p>
          <p>Visualizações: {podcast.views}</p>
          <p>Destaque: {podcast.is_featured ? 'Sim' : 'Não'}</p>
          <a href={podcast.link} target="_blank" rel="noreferrer">Ouvir</a>
        </div>
      ))}
    </div>
  );
}



'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/Podcast.module.css'; 

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');

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

  const podcastsFiltrados = podcasts.filter((p) =>
    p.title.toLowerCase().includes(busca.toLowerCase())
  );

  const categorias = [];
  podcastsFiltrados.forEach((p) => {
    if (!categorias.includes(p.category)) {
      categorias.push(p.category);
    }
  });

  return (
    <div>
      <div className={styles.banner}>
        <img
          src="/images/scenecrime.jpg"
          className={styles.bannerImg}
          alt="Banner"
        />
        <h1 className={styles.titulo}>Podcasts</h1>
      </div>

      <div className={styles.filtroContainer}>
        <input
          type="text"
          placeholder="O que deseja ouvir hoje?"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={styles.filtroInput}
        />
        <button onClick={() => setBusca('')} className={styles.botaoLimpar}>
          Limpar
        </button>
      </div>

      {categorias.map((cat) => (
        <div key={cat}>
          <h2 className={styles.categoriaTitulo}>{cat.toUpperCase()}</h2>
          <div className={styles.grid}>
            {podcastsFiltrados
              .filter((p) => p.category === cat)
              .map((podcast) => (
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
                  <h3 className={styles.title}>{podcast.title}</h3>
                  <p className={styles.description}>{podcast.description}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

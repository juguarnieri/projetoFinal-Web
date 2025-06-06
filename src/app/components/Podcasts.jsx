'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/Podcast.module.css';
import SearchHeader from "./SearchHeader";
import ScrollToTopButton from "./ScrollToTopButton"; 

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');
  const [podcastSelecionado, setPodcastSelecionado] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/podcasts', {
      headers: { 'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z' },
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

  const abrirModal = (podcast) => {
    setPodcastSelecionado(podcast);
  };

  const fecharModal = () => {
    setPodcastSelecionado(null);
  };

  return (
    <div>
      <div className={styles.banner}>
        <img
          src="/images/scenecrime.jpg"
          className={styles.bannerImg}
          alt="Banner"
        />
        <h1 className={styles.bannerText}>PODCASTS</h1>
      </div>

      <div className={styles.wrapper}>
        <SearchHeader
          search={busca}
          setSearch={setBusca}
          title="Podcasts"
          placeholder="Buscar podcasts..."
          icon="🎧"
        />

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
                    onClick={() => abrirModal(podcast)}
                  >
                    <img
                      src={
                        podcast.image
                          ? podcast.image.startsWith("http")
                            ? podcast.image
                            : `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "")}/uploads/${podcast.image}`
                          : "/images/placeholder.png"
                      }
                      alt={podcast.title}
                      className={styles.imagem}
                    />
                    <h3 className={styles.title}>{podcast.title}</h3>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {podcastSelecionado && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                podcastSelecionado.image
                  ? podcastSelecionado.image.startsWith("http")
                    ? podcastSelecionado.image
                    : `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "")}/uploads/${podcastSelecionado.image}`
                  : "/images/placeholder.png"
              }
              alt={podcastSelecionado.title}
              className={styles.modalImage}
            />
            <h2 className={styles.modalTitle}>{podcastSelecionado.title}</h2>
            <p className={styles.modalDescription}>
              {podcastSelecionado.description}
            </p>
            <div className={styles.modalButtons}>
              <a
                href={podcastSelecionado.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.botaoOuvir}
              >
                Ouvir
              </a>
              <button
                onClick={fecharModal}
                className={styles.botaoFechar}
                aria-label="Fechar modal"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );
}
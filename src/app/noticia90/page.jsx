'use client';

import { useEffect, useState } from 'react';
import styles from '../noticia90/Noticia90.module.css';
import NewsCard from '../components/NewsCard';
import Link from 'next/link';
import ScrollToTopButton from "../components/ScrollToTopButton"; 
import Banner from "../components/Banner";
import VoltarDecadasButton from "../components/VoltarDecadasButton";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [erro, setErro] = useState('');
  const [tituloFiltro, setTituloFiltro] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/news?decade=90', {
      headers: {
        'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json.data)) {
          const semDuplicatas = [...new Map(json.data.map((noticia) => [noticia.id, noticia])).values()];
          setNoticias(semDuplicatas);
        } else {
          setErro('Nenhuma notícia encontrada.');
        }
      })
      .catch(() => {
        setErro('Erro ao carregar notícias.');
      });
  }, []);

  if (erro) return <p className={styles.erro}>{erro}</p>;
  if (noticias.length === 0) return <p className={styles.carregando}>Carregando notícias...</p>;

  const categorias = [...new Set(noticias.map((noticia) => noticia.category))];

  return (
    <div>
      <Banner title="DÉCADA DE 90" image="/images/imagempubli.png" />
      <VoltarDecadasButton />
      {categorias.map((categoria) => (
        <div key={categoria} className={styles.categoria}>
          <h2>{categoria}</h2>
          <div className={styles.carousel}>
            {noticias
              .filter((noticia) => noticia.category === categoria)
              .map((noticia) => (
                <div key={noticia.id} className={styles.card}>
                  <NewsCard
                    title={noticia.title}
                    image={noticia.image}
                    description={noticia.description}
                    link={`/noticiaCaryn/${noticia.id}`}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
      <ScrollToTopButton />
    </div>
  );
}

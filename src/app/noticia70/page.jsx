'use client';

import { useEffect, useState } from 'react';
import styles from '../noticia70/Noticia70.module.css';
import NewsCard from '../components/NewsCard';
import Link from 'next/link';
import Banner from '../components/Banner';
import ScrollToTopButton from "../components/ScrollToTopButton"; 
import VoltarDecadasButton from "../components/VoltarDecadasButton";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [erro, setErro] = useState('');
  const [tituloFiltro, setTituloFiltro] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/news?decade=70', {
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
      <Banner title="DÉCADA DE 70" image="/images/imagem70.png" />
      <VoltarDecadasButton />
      {categorias.map((categoria) => (
        <div key={categoria} className={styles.categoria}>
          <h2>{categoria}</h2>
          <div className={styles.carousel}>
            {noticias
              .filter(
                (noticia) =>
                  noticia.category === categoria &&
                  noticia.title.toLowerCase().includes(tituloFiltro.toLowerCase())
              )
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

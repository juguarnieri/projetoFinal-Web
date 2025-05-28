  'use client';

import { useEffect, useState } from 'react';
import styles from '../noticia90/Noticia90.module.css';
import NewsCard from '../components/NewsCard';
import Link from 'next/link';

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
      <div className={styles.banner}>
        <img src="/images/scenecrime.jpg" title="Notícias" style={{ width: '100%', height: '25rem', objectFit: 'cover' }} />
        <h1 className={styles.titulo}>Notícias</h1>
      </div>

      <div className={styles.filtro}>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={tituloFiltro}
          onChange={(e) => setTituloFiltro(e.target.value)}
          className={styles.input}
        />
      </div>

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
                <Link href={`/noticiaCaryn/${noticia.id}`} key={noticia.id} className={styles.link}>
                <div key={noticia.id} className={styles.card}>
                  <NewsCard
                    title={noticia.title}
                    image={noticia.image || '/images/220.svg'}
                    description={noticia.description}
                  />
                </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

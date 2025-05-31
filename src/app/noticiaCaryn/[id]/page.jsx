'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NewsDetailCard from '../../components/NewsDetailCard';
import styles from '../../styles/NewsDetailCard.module.css';
import { useParams } from 'next/navigation';

export default function NoticiaPage() {
  const params = useParams();
  const id = params.id;

  const [noticia, setNoticia] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchNoticia() {
      try {
        const res = await fetch(`http://localhost:4000/api/news/${id}`, {
          headers: {
            'x-api-key': 'nUN1NOc7BuiiO7iSYR7gek0bxG821Z',
          },
        });

        if (!res.ok) {
          throw new Error('Erro ao buscar a notícia');
        }

        const json = await res.json();
        setNoticia(json.data);
      } catch (error) {
        console.error(error);
        setErro('Erro ao carregar a notícia.');
      }
    }

    if (id) {
      fetchNoticia();
    }
  }, [id]);

  if (erro) {
    return <p style={{ color: 'red' }}>{erro}</p>;
  }

  if (!noticia) {
    return <p>Carregando notícia...</p>;
  }

  return (
    <div>
      <Link href="/casos-criminais" className={styles.voltarBtn}>
        ⟵ Voltar para notícias
      </Link>
      <NewsDetailCard
        title={noticia.title}
        image={noticia.image || '/images/220.svg'}
        description={noticia.description}
        text={noticia.text}
        link={noticia.link}
        
      />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import styles from '../noticiaCaryn/NoticiaCaryn.module.css';
import NewsCard from '../components/NewsCard';
import Link from 'next/link';

export default function Caryn() {
    return (
        <div>
            <div className={styles.banner}>
                <img src="/images/caryn.jpg" title="Caryn" style={{ width: '100%', height: '25rem', objectFit: 'cover' }} />
                <h1 className={styles.titulo}>Caryn</h1>
            </div>

            <div className={styles.container}>
                <p className={styles.descricao}>
                    Caryn é uma influenciadora digital e criadora de conteúdo, conhecida por seu estilo autêntico e envolvente. Ela compartilha sua vida, moda e beleza com seus seguidores, inspirando-os a serem eles mesmos.
                </p>
            </div>

            <div className={styles.container}>
                <Link href="/noticia70" className={styles.link}>
                    Voltar para as notícias
                </Link>
            </div>
        </div>
    );
}
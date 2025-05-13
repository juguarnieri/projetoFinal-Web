"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "antd";

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <Skeleton.Avatar active size={300} shape="circle" className={styles.image} />
                <Skeleton active paragraph={{ rows: 4 }} />
                <Skeleton.Button active size="large" />
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <Image className={styles.image} src="/images/maiko.png" alt="Maiko Xikixiki" width={300} height={300} />
            <h1 className={styles.title}> Maiko Xikixiki Bahia</h1>
            <div className={styles.description}>
                <p>Tá perdido no código? Relaxa e vem de Maiko, que vamos te mostrar a usar:</p>
                <ul className={styles.list}>
                    <li>Next.js (App Router)</li>
                    <li>CSS Modules</li>
                    <li>React Components</li>
                    <li>React Hooks</li>
                    <li>PreLoad</li>
                    <li>PreFetch</li>
                    <li>Fetch Axios</li>
                    <li>LocalStorage</li>
                    <li>React Toastify</li>
                    <li>AntD</li>
                    <li>Skeleton</li>
                </ul>
            </div>
            <Link href="/users">
                <button className={styles.button}>Acessar Países</button>
            </Link>
        </div>
    );
}
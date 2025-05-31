import Image from "next/image";
import styles from "../styles/Carregando.module.css";
import { useEffect, useState } from "react";

export default function Carregando() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <Image src="/icons/favicon.ico" alt="Carregando..." width={300} height={300} priority className={styles.image} />
                <h1 className={styles.message}>Carregando ...</h1>
            </div>
        );
    }

    return null; 
}
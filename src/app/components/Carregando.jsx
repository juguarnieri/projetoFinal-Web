import Image from "next/image";
import styles from "../styles/Carregando.module.css";

export default function Carregando() {
    return (
        <div className={styles.container}>
            <Image src="/icons/favicon.ico" alt="Carregando..." width={300} height={300} priority className={styles.image} />
        </div>
    );
}
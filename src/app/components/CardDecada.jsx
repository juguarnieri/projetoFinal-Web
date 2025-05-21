import React from "react";
import { Card } from "antd";
import styles from "../styles/CardDecada.module.css";

export default function CardDecada({ caso, onClick }) {
    return (
        <Card
            hoverable
            className={styles.cardDecada}
            onClick={onClick}
            cover={<img className={styles.cardImg} alt={caso.title} src={caso.image} />}
        >
            <Card.Meta
                title={<span className={styles.cardTitle}>{caso.title}</span>}
                description={<span className={styles.cardDescription}>{caso.description}</span>}
            />
        </Card>
    )
} 
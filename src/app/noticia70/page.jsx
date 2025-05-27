"use client";

import Banner from "../components/Banner";
import React from "react";
import axios from "axios";
import styles from "./Noticia70.module.css";
import NewsCard from "../components/NewsCard";
import { useState, useEffect } from "react";

export default function Casos70() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/news?decade=90", {
          headers: {
            "x-api-key": "nUN1NOc7BuiiO7iSYR7gek0bxG821Z",
          },
        });
        setNews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);
  return (
    <div className={styles.container}>
      <Banner title="Década de 1970" image="/images/image-videos.png" />

      {Array.isArray(news) && news.map((item) => (
        <NewsCard
          key={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}
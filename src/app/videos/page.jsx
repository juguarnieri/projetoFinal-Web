"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import Banner from "../components/Banner";
import ScrollToTopButton from "../components/ScrollToTopButton";
import VideosSection from "../components/VideosSection";
import styles from "./Video.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("URL chamada:", `${process.env.NEXT_PUBLIC_API_URL}/videos`);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/videos`, { headers: HEADERS });
        console.log("Resposta da API:", res.data);
        setVideos(res.data.data || res.data || []);
      } catch (error) {
        toast.error("Erro ao carregar dados");
        console.error("Erro na requisição:", error);
      } finally {
        setLoadingVideos(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Vídeos</title>
      </Head>
    <div className={styles.banner}>
      <Banner title="VÍDEOS" image="/images/image-videos.png" />
    </div>

      <VideosSection
        videos={videos}
        loading={loadingVideos}
        search={search}
        setSearch={setSearch}
      />
      <ScrollToTopButton />

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}
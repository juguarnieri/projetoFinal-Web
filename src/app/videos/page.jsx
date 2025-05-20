"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import Banner from "../components/Banner";
import VideosSection from "../components/VideosSection";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

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
    <div>
      <Head>
        <title>Vídeos</title>
      </Head>

      <Banner title="VÍDEOS" image="/images/image.png" />

      <VideosSection
        videos={videos}
        loading={loadingVideos}
      />

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}
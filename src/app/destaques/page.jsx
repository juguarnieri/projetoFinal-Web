"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { Skeleton, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Banner from "../components/Banner";
import NoticiasSection from "../components/NoticiasSection";
import PodcastsCarousel from "../components/PodcastsCaurosel";
import VideosSection from "../components/VideosSection";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function NewsDoDia() {
  const [noticias, setNoticias] = useState([]);
  const [loadingNoticias, setLoadingNoticias] = useState(true);

  const [podcasts, setPodcasts] = useState([]);
  const [loadingPodcasts, setLoadingPodcasts] = useState(true);

  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const [modalInfo, setModalInfo] = useState({ visible: false, noticia: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, podcastRes, videoRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/news/featured`, { headers: HEADERS }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/podcasts/featured`, { headers: HEADERS }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/videos/featured`, { headers: HEADERS })
        ]);

        setNoticias(newsRes.data.data || []);
        setPodcasts(podcastRes.data.data || []);
        setVideos(videoRes.data.data || []);
      } catch (error) {
        toast.error("Erro ao carregar dados");
        console.error(error);
      } finally {
        setLoadingNoticias(false);
        setLoadingPodcasts(false);
        setLoadingVideos(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>As Notícias Mais Recentes</title>
      </Head>

      <Banner title="NOTÍCIAS DO DIA" image="/images/image.png" />

      <NoticiasSection
        noticias={noticias}
        loading={loadingNoticias}
        onClickNoticia={(noticia) =>
          setModalInfo({ visible: true, noticia })
        }
      />

      <PodcastsCarousel
        podcasts={podcasts}
        loading={loadingPodcasts}
      />

      <VideosSection
        videos={videos}
        loading={loadingVideos}
      />

      <Modal
        title={modalInfo.noticia?.title}
        open={modalInfo.visible}
        onCancel={() => setModalInfo({ visible: false, noticia: null })}
        footer={null}
        width={600}
      >
        {modalInfo.noticia ? (
          <div>
            <p>{modalInfo.noticia.description}</p>
            <a href={modalInfo.noticia.link} target="_blank" rel="noopener noreferrer">
              Ler mais
            </a>
          </div>
        ) : (
          <Skeleton active />
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}
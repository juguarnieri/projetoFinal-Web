"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Banner from "../components/Banner";
import NoticiasSection from "../components/NoticiasSection";
import PodcastsCarousel from "../components/PodcastsCaurosel";
import VideosDestaques from "../components/VideosDestaques";
import styles from "./Destaques.module.css";


const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function NewsDoDia() {
  const [noticias, setNoticias] = useState([]);
  const [loadingNoticias, setLoadingNoticias] = useState(true);
  const [podcasts, setPodcasts] = useState([]);
  const [loadingPodcasts, setLoadingPodcasts] = useState(true);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [modalInfo, setModalInfo] = useState({ visible: false, noticia: null });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    document.title = "As Notícias Mais Recentes";
    const fetchData = async () => {
      try {
        const [newsRes, podcastRes, videoRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news/featured`, { headers: HEADERS }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/podcasts/featured`, { headers: HEADERS }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/videos/featured`, { headers: HEADERS })
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
    <>
      <Banner title="NOTÍCIAS DO DIA" image="/images/image.png" />

      <div className={styles.destaqueBloco}>
        <h2 className={styles.destaqueTitulo}>
          BEM-VINDO AO CRIME WHISPERS!
        </h2>
        <img
          src="/images/imagemDestaque.png"
          alt="Destaque"
          className={styles.destaqueImagem}
        />
        <p className={styles.destaqueTexto}>
          Mergulhe nos mistérios mais intrigantes do Brasil e do mundo. Aqui, cada sussurro pode revelar uma nova verdade oculta.
        </p>
      </div>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Notícias do Dia</h2>
          <NoticiasSection
            noticias={noticias}
            loading={loadingNoticias}
            onClickNoticia={(noticia) =>
              setModalInfo({ visible: true, noticia })
            }
          />
        </section>

        <div className={styles.destaqueBloco}>
          <img
            src="/images/imagemDestaque3.png" 
            alt="Entre Notícias e Podcasts"
            className={styles.destaqueImagem}
          />
          <p className={styles.destaqueTexto}>
            Fique por dentro das últimas descobertas e investigações. Notícias que vão além da superfície, trazendo detalhes que poucos ousam contar.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Top Podcasts</h2>
          <PodcastsCarousel
            podcasts={podcasts}
            loading={loadingPodcasts}
          />
        </section>

        <div className={styles.destaqueBloco}>
          <img
            src="/images/imagemDestaque2.png" 
            alt="Entre Podcasts e Vídeos"
            className={styles.destaqueImagem}
          />
          <p className={styles.destaqueTexto}>
            Ouça relatos, análises e entrevistas exclusivas sobre crimes reais. Vozes que narram o lado obscuro da sociedade.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Vídeos em Destaque</h2>
          <VideosDestaques
            videos={videos}
            loading={loadingVideos}
          />
        </section>

        {isClient && (
          <Modal
            title={modalInfo.noticia?.title}
            open={modalInfo.visible}
            onCancel={() => setModalInfo({ visible: false, noticia: null })}
            footer={null}
            width={600}
            forceRender={true}
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
        )}
        <ToastContainer position="top-right" autoClose={4500} />
        <ScrollToTopButton />
      </div>
    </>
  );
}
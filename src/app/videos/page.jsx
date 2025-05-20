"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton, message } from "antd";
import { FaSearch } from "react-icons/fa";
import styles from "./Video.module.css";
import VideosSection from "../components/VideosSection";

const API_URL =  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };


export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginated = filteredData.slice((current - 1) * pageSize, current * pageSize);

  useEffect(() => {
    async function fetchVideos() {
        try {
            setLoading(true);
            const videosRes = await axios.get(`${API_URL}/videos`, { headers: HEADERS });
            setVideos(videosRes.data.data);
        } catch (err) {
            message.error("Erro ao carregar vídeos.");
        } finally {
            setLoading(false);
        }

    }
    fetchVideos();
    }, []);

    useEffect(() => {
        const lower = search.toLowerCase();
        setFilteredData(
            (videos ?? []). filter(
                (v) =>
                    v.title?.toLowerCase().includes(lower) ||
                    v.description?.toLowerCase().includes(lower) ||
                    v.username?.toLowerCase().includes(lower) ||
                    v.name?.toLowerCase().includes(lower)
            )
        );
        setCurrent(1);
    }, [search, videos]);

    if (loading) return <Skeleton active />;

    return (
        <div className={styles.videosWrapper}>
            <h2>Vídeos</h2>

            <div className={styles.videosHeader}>
                <div className={styles.videosSearchGroup}>
                    <input
                        type="text"
                        placeholder="Pesquisar vídeos, legendas ou usuário..."
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        className={styles.videosSearchInput}
                    />
                    <button
                        onClick={() => setSearch(searchInput)}
                        className={styles.videosSearchButton}
                        title="Pesquisar"
                    >
                        <FaSearch />
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => { setSearchInput(""); setSearch(""); setCurrent(1); }}
                        className={styles.videosClearButton}
                    >
                        Limpar busca
                    </button>
        </div>
            </div>

            {paginated.length === 0 ? (
                <p>Nenhum vídeo encontrado.</p>
            ) : (
                    <VideosSection
                        videos={paginated}
                        loading={loading}
                    />
                )}

            <div className={styles.videosPagination}>                
                <button
                    onClick={() => setCurrent((c) => Math.max(1, c - 1))}
                    disabled={current === 1}
                >
                    Anterior
                </button>
                Página {current} de {Math.ceil(filteredData.length / pageSize)}
                <button
                    onClick={() => setCurrent((c) => c + 1)}
                    disabled={current >= Math.ceil(filteredData.length / pageSize)}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}   
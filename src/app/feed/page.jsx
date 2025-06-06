"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Skeleton, message } from "antd";
import { FaSearch } from "react-icons/fa";
import styles from "./Feed.module.css";
import PostCard from "../components/PostCard";
import CommentsModal from "../components/CommentsModal";
import Banner from "../components/Banner";
import SearchHeader from "../components/SearchHeader";
import ScrollToTopButton from "../components/ScrollToTopButton"; 

const API_URL = "http://localhost:4000";
const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [searchInput, setSearchInput] = useState(""); 
  const [search, setSearch] = useState(""); 
  const [filteredData, setFilteredData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginated = useMemo(() => {
    return filteredData.slice((current - 1) * pageSize, current * pageSize);
  }, [filteredData, current, pageSize]);

  useEffect(() => {
    async function fetchFeed() {
      try {
        setLoading(true);
        const postsRes = await axios.get(`${API_URL}/api/posts`, { headers: HEADERS });

        const enrichedPosts = await Promise.all(
          (postsRes.data.data || []).map(async (post) => {
            let like_count = 0;
            let dislike_count = 0;
            let comments = [];

            try {
              const likesRes = await axios.get(`${API_URL}/api/posts/${post.id}/likes`, { headers: HEADERS });
              like_count = likesRes.data.likes ?? 0;
            } catch {}

            try {
              const dislikesRes = await axios.get(`${API_URL}/api/posts/${post.id}/dislikes`, { headers: HEADERS });
              dislike_count = dislikesRes.data.dislikes ?? 0;
            } catch {}

            try {
              const commentsRes = await axios.get(`${API_URL}/api/comments/${post.id}`, { headers: HEADERS });
              comments = Array.isArray(commentsRes.data) ? commentsRes.data : [];
            } catch {}

            return { ...post, like_count, dislike_count, comments };
          })
        );

        setPosts(enrichedPosts);
      } catch (err) {
        message.error("Erro ao carregar feed.");
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredData(
      posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(lower) ||
          p.caption?.toLowerCase().includes(lower) ||
          p.username?.toLowerCase().includes(lower) ||
          p.name?.toLowerCase().includes(lower)
      )
    );
    setCurrent(1);
  }, [search, posts]);

  const handleLike = async (postId, userId = postId) => {
    if (userLikes[postId] === "like") return;
    setLikeLoading((prev) => ({ ...prev, [postId]: true }));

    try {
      await axios.post(`${API_URL}/api/posts/${postId}/like/${userId}`, {}, { headers: HEADERS });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, like_count: (parseInt(p.like_count) || 0) + 1 } : p
        )
      );
      setUserLikes((prev) => ({ ...prev, [postId]: "like" }));
    } catch {
      message.error("Erro ao curtir post.");
    } finally {
      setLikeLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleUnlike = async (postId, userId = postId) => {
    if (userLikes[postId] === "unlike") return;
    setLikeLoading((prev) => ({ ...prev, [postId]: true }));

    try {
      await axios.post(`${API_URL}/api/posts/${postId}/unlike/${userId}`, {}, { headers: HEADERS });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, like_count: Math.max((parseInt(p.like_count) || 1) - 1, 0) } : p
        )
      );
      setUserLikes((prev) => ({ ...prev, [postId]: "unlike" }));
    } catch {
      message.error("Erro ao remover curtida.");
    } finally {
      setLikeLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleOpenComments = async (postId) => {
    setCommentsVisible(true);
    setLoadingComments(true);
    try {
      const res = await axios.get(`${API_URL}/api/comments/${postId}`, { headers: HEADERS });
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch {
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCloseComments = () => {
    setCommentsVisible(false);
    setComments([]);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [current]);

  if (loading) return <Skeleton active />;

  return (
    <div>
      <Banner title="PUBLICAÇÕES" image="/images/imagempubli.png" />
      <div className={styles.feedWrapper}>
        <SearchHeader
          search={search}
          setSearch={setSearch}
          title="Publicações"
          placeholder="Buscar publicações, legendas ou usuário..."
          icon="📰"
        />
        {paginated.length === 0 ? (
          <p>Nenhuma publicação encontrada.</p>
        ) :
          paginated.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              API_URL={API_URL}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              handleOpenComments={handleOpenComments}
              likeLoading={likeLoading}
              userLikes={userLikes}
              userId={post.id}
            />
          ))}

        <div className={styles.feedPagination}>
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

        <CommentsModal
          visible={commentsVisible}
          onClose={handleCloseComments}
          comments={comments}
          loadingComments={loadingComments}
          API_URL={API_URL}
        />
      </div>
      <ScrollToTopButton />
    </div>
  );
}

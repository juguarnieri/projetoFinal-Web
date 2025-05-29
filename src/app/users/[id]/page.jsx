"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button, Skeleton } from "antd";
import styles from "../../../app/styles/UserCard.module.css";
import ProfileCard from "../../components/ProfileCard";
import PostCard from "../../components/PostCard";
import CommentsModal from "../../components/CommentsModal";
import ScrollToTopButton from "../../components/ScrollToTopButton"; 

const API_URL = "http://localhost:4000";
const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function UserProfilePage() {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const userRes = await axios.get(`${API_URL}/api/users/${id}`, { headers: HEADERS });
        const postsRes = await axios.get(`${API_URL}/api/posts/user/${id}`, { headers: HEADERS });

        const postsWithExtras = await Promise.all(
          postsRes.data.map(async (post) => {
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

        setUser(userRes.data);
        setPosts(postsWithExtras);
      } catch {
        setUser(null);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleLike = async (postId) => {
    if (userLikes[postId] === "like") return;
    setLikeLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      await axios.post(`${API_URL}/api/posts/${postId}/like/${id}`, {}, { headers: HEADERS });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, like_count: (parseInt(p.like_count) || 0) + 1 } : p
        )
      );
      setUserLikes((prev) => ({ ...prev, [postId]: "like" }));
    } catch {
      alert("Erro ao curtir post");
    } finally {
      setLikeLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleUnlike = async (postId) => {
    if (userLikes[postId] === "unlike") return;
    setLikeLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      await axios.post(`${API_URL}/api/posts/${postId}/unlike/${id}`, {}, { headers: HEADERS });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, like_count: Math.max((parseInt(p.like_count) || 1) - 1, 0) } : p
        )
      );
      setUserLikes((prev) => ({ ...prev, [postId]: "unlike" }));
    } catch {
      alert("Erro ao remover curtida");
    } finally {
      setLikeLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleOpenComments = async (postId) => {
    setCommentsVisible(true);
    setLoadingComments(true);
    try {
      const res = await axios.get(`${API_URL}/api/comments/${postId}`, {
        headers: HEADERS,
      });
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

  if (loading) return <Skeleton active />;
  if (!user) return <p>Usuário não encontrado.</p>;

  return (
    <div className={styles.pageBg}>
      <div className={styles.container}>
        <Button type="primary" onClick={() => router.push("/users")} className={styles.backButton}>
          ⟵
        </Button>

        <ProfileCard user={user} API_URL={API_URL} posts={posts} />

        <div className={styles.titulo}>
          <span>Posts</span>
        </div>
        {posts.length === 0 ? (
          <p>Nenhuma publicação encontrada.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              API_URL={API_URL}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              handleOpenComments={handleOpenComments}
              likeLoading={likeLoading}
              userLikes={userLikes}
              userId={id}
            >
              <img
                src={
                  post.profile_picture
                    ? post.profile_picture.startsWith("http")
                      ? post.profile_picture
                      : `${API_URL}/uploads/${post.profile_picture}`
                    : "https://placehold.co/40x40"
                }
                alt={post.username || "Usuário"}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "#1677ff" }}>
                  @{post.username}
                </div>
              </div>
            </PostCard>
          ))
        )}
      </div>

      <CommentsModal
        visible={commentsVisible}
        onClose={handleCloseComments}
        comments={comments}
        loadingComments={loadingComments}
        API_URL={API_URL}
      />

      <ScrollToTopButton /> 
    </div>
  );
}
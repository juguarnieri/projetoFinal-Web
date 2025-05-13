"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }
        const data = await response.json();
        setPosts(data.data || []); // Certifique-se de que "data" existe
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
        setError("Não foi possível carregar os posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Todos os Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>Nenhum post encontrado.</p>
      )}
    </div>
  );
};

export default PostsPage;
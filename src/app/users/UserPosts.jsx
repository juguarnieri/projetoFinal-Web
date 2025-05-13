import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PostCard from "../posts/PostCard";

const UserPosts = () => {
  const router = useRouter();
  const { userId } = router.query; 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3000/api/posts/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setPosts(data.data);
          setLoading(false);
        })
        .catch((error) => console.error("Erro ao buscar posts do usuário:", error));
    }
  }, [userId]);

  if (loading) return <p>Carregando posts...</p>;

  return (
    <div>
      <h1>Posts do Usuário</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
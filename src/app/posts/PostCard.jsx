import React from "react";

const PostCard = ({ post }) => {
  const handleLike = () => {
    fetch(`http://localhost:3000/api/posts/${post.id}/like/1`, { method: "POST" }) // Exemplo com userId = 1
      .then((response) => response.json())
      .then((data) => alert("Post curtido com sucesso!"))
      .catch((error) => console.error("Erro ao curtir post:", error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/posts/${post.id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => alert("Post deletado com sucesso!"))
      .catch((error) => console.error("Erro ao deletar post:", error));
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h2>{post.title}</h2>
      <p>{post.caption}</p>
      <img src={post.media_url} alt={post.title} style={{ width: "100%" }} />
      <p>Curtidas: {post.like_count}</p>
      <button onClick={handleLike}>Curtir</button>
      <button onClick={handleDelete} style={{ marginLeft: "10px" }}>Deletar</button>
    </div>
  );
};

export default PostCard;
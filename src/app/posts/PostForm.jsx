import React, { useState } from "react";

const PostForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    caption: "",
    media_url: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => alert("Post criado com sucesso!"))
      .catch((error) => console.error("Erro ao criar post:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="user_id"
        placeholder="ID do Usuário"
        value={formData.user_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="caption"
        placeholder="Descrição"
        value={formData.caption}
        onChange={handleChange}
        required
      />
      <input
        type="url"
        name="media_url"
        placeholder="URL da Mídia"
        value={formData.media_url}
        onChange={handleChange}
        required
      />
      <button type="submit">Criar Post</button>
    </form>
  );
};

export default PostForm;
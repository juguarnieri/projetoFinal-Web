"use client";

import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          headers: {
            Authorization: "nUN1NOc7BuiiO7iSYR7gek0bxG821Z" 
          },
        });
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data.data || []);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        setError("Não foi possível carregar os usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Usuários</h1>
      {users.length > 0 ? (
        users.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  );
};

export default UsersPage;
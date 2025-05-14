import React from "react";
import UserCard from "./UserCard";
import styles from "../../app/styles/UserProfile.module.css";

export default function UserGrid({ users, router }) {
  if (users.length === 0) return <p>Nenhum usuário encontrado.</p>;

  return (
    <div className={styles.grid}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onClick={() => router.push(`/users/${user.id}`)} />
      ))}
    </div>
  );
}

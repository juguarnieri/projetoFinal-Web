"use client";

import React from "react";
import Link from "next/link";
import styles from "./UserCard.module.css"; 

const UserCard = ({ user }) => {
  return (
    <div className={styles.card}>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <Link href={`/users/${user.id}/posts`} className={styles.link}>
        Ver Posts
      </Link>
    </div>
  );
};

export default UserCard;
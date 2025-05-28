import React from "react";
import { Input } from "antd";
import styles from "../../app/styles/UserProfile.module.css";

export default function UserSearchHeader({ search, setSearch }) {
  return (
    <div className={styles.header}>
      <h1>🕵🏻👁️🕶️</h1>
      <div className={styles.actions}>
        <Input.Search
          placeholder="Buscar por nome ou usuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}
import React from "react";
import { Input, Button } from "antd";
import styles from "../../app/styles/UserProfile.module.css";

export default function UserSearchHeader({ search, setSearch, handleClearCache }) {
  return (
    <div className={styles.header}>
      <h1>Lista de Usuários</h1>
      <div className={styles.actions}>
        <Button onClick={handleClearCache}>Limpar cache</Button>
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

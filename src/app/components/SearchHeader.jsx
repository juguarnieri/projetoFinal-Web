import React from "react";
import { Input } from "antd";
import styles from "../styles/UserProfile.module.css";

export default function SearchHeader({
  search,
  setSearch,
  title = "Buscar",
  placeholder = "Buscar...",
  icon = null,
}) {
  return (
    <div className={styles.header}>
      <h1>
        {icon} {title}
      </h1>
      <div className={styles.actions}>
        <Input.Search
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}
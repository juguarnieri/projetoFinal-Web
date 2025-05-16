"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Header.module.css";
import { FaHome, FaBars, FaSearch } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Você pesquisou por: ${search}`);
    setShowSearch(false);
    setSearch("");
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <FaBars className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)} />
        <h1 className={styles.logo} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className={styles.logoBox}>CW</div>
          <span>CRIME </span>
          <span className={styles.logoRed}>WHISPERS</span>
        </h1>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.showMenu : ""}`}>
        <Link href="/" className={styles.home}>
          <FaHome />
        </Link>
        <Link href="/destaques">Destaques</Link>
        <Link href="/casos-criminais">Casos Criminais</Link>
        <Link href="/videos">Vídeos</Link>
        <Link href="/podcasts">Podcasts</Link>
        <Link href="/quiz">Quiz</Link>
        <Link href="/feed">Feed</Link>
        <Link href="/users">Users</Link>
        <Link href="/sobre">Sobre</Link>
        <Link href="/contato">Contato</Link>
        <FaSearch
          className={styles.searchIcon}
          onClick={() => setShowSearch((v) => !v)}
          style={{ cursor: "pointer" }}
        />
        {showSearch && (
          <form onSubmit={handleSearch} style={{ display: "inline" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar..."
              style={{ marginLeft: 8, padding: 4, borderRadius: 4, border: "1px solid #ccc" }}
              autoFocus
            />
          </form>
        )}
      </nav>
    </header>
  );
}

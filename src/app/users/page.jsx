"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Skeleton, message } from "antd";
import { useRouter } from "next/navigation";
import UserSearchHeader from "../components/UserSearchHeader";
import UserGrid from "../components/UserGrid";
import PaginationBar from "../components/PaginationBar";
import Banner from "../components/Banner";
import ScrollToTopButton from "../components/ScrollToTopButton"; // Importando o botão de scroll
import styles from "../../app/styles/UserProfile.module.css";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [connectionError, setConnectionError] = useState(false);
  const [search, setSearch] = useState("");

  const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:4000/api/users", { headers });
      setUsers(data);
      setFilteredData(data);
      setConnectionError(false);
    } catch (err) {
      setConnectionError(true);
      message.error("Erro de conexão com o backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredData(
      users.filter(
        (u) =>
          u.name?.toLowerCase().includes(lower) ||
          u.username?.toLowerCase().includes(lower)
      )
    );
    setCurrent(1);
  }, [search, users]);

  const paginated = useMemo(() => {
    return filteredData.slice((current - 1) * pageSize, current * pageSize);
  }, [filteredData, current, pageSize]);

  return (
    <>
      <Banner title="Usuários" image="/images/bannerUsuarios.png" />
      <div className={styles.pageWrapper}>
        <UserSearchHeader
          search={search}
          setSearch={setSearch}
        />
        <PaginationBar
          current={current}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={setCurrent}
          onPageSizeChange={setPageSize}
        />
        {loading ? (
          <Skeleton active />
        ) : connectionError ? (
          <p>Conexão com o backend falhou.</p>
        ) : (
          <UserGrid users={paginated} router={router} />
        )}
      </div>
      <ScrollToTopButton />
    </>
  );
}
import React from "react";
import { Pagination } from "antd";
import styles from "../../app/styles/UserProfile.module.css";

export default function PaginationBar({ current, pageSize, total, onChange, onPageSizeChange }) {
  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      onShowSizeChange={(curr, size) => onPageSizeChange(size)}
      className={styles.pagination}
      showSizeChanger
      pageSizeOptions={["10", "20", "50"]}
    />
  );
}

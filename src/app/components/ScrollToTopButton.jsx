import React, { useState, useEffect } from "react";
import styles from "../styles/ScrollToTopButton.module.css";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={`${styles.scrollToTopButton} ${visible ? styles.visible : ""}`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}
"use client";

import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>Bem-vindo ao Projeto Final</h1>
      <p>Esta é a página inicial.</p>
      <Link href="/home">
      <button>Página home</button>
      </Link>
    </div>
  );
};

export default HomePage;
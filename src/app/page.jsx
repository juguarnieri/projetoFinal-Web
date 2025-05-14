import Link from "next/link";

export default function Home() {
  return (
    <>
      <header style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
        <h1>Meu App</h1>
      </header>

      <main style={{ padding: "2rem" }}>
        <p>Bem-vindo!</p>

        <nav aria-label="Navegação principal">
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link href="/home">🏠 Ir para Home</Link>
            </li>
            <li>
              <Link href="/users">👤 Ir para Lista de Usuários</Link>
            </li>
          </ul>
        </nav>
      </main>

      <footer style={{ padding: "1rem", textAlign: "center", backgroundColor: "#f0f0f0" }}>
        <p>© 2025</p>
      </footer>
    </>
  );
}

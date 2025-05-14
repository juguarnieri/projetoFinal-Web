import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/globals.css";

export const metadata = {
  title: "Meu App",
  description: "Aplicação com Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

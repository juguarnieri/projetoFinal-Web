import Header from "./components/Header";
import Footer from "./components/Footer";
import { Roboto } from "next/font/google"
import "./styles/globals.css";

const font = Roboto({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
  title: "Meu App",
  description: "Aplicação com Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="layoutRoot">
          <Header />
          <main className="mainContent">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Roboto } from "next/font/google"
import "./styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer position="top-right" autoClose={4500} />
      </body>
    </html>
  );
}
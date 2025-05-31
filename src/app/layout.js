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
  title: "Crime Whispers",
  description: "Projeto Final - Crime Whispers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="icons/favicon.ico" />
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
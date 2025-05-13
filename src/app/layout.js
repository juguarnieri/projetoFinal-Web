export const metadata = {
    title: "Projeto Final",
    description: "Aplicação Next.js para o projeto final",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="pt-BR">
        <body>
          {children}
        </body>
      </html>
    );
  }

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/shared/Button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-divulgaja-blue to-divulgaja-purple">
              404
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Página não encontrada
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
            A página que você está procurando não existe ou foi removida.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="gradient" href="/">
              Voltar à página inicial
            </Button>
            <Button variant="outline" href="/marketplace">
              Ver serviços
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

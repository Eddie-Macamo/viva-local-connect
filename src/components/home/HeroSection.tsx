
import { Link } from "react-router-dom";
import { Button } from "@/components/shared/Button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-divulgaja-black via-divulgaja-black to-divulgaja-purple/30 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-divulgaja-blue rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-divulgaja-purple rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight animate-fade-in">
            Divulgue seu negócio em <span className="text-transparent bg-clip-text bg-gradient-to-r from-divulgaja-blue to-divulgaja-purple">Moçambique</span>!
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 animate-fade-in px-4" style={{animationDelay: "200ms"}}>
            Conectamos pequenos negócios e serviços locais com clientes de todas as províncias de Moçambique.
            Cadastre-se e seja encontrado facilmente!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 animate-fade-in" style={{animationDelay: "400ms"}}>
            <Button variant="gradient" size="lg" to="/register" className="group w-full sm:w-auto">
              Cadastrar Meu Negócio
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" to="/marketplace" className="text-white border-white hover:bg-white/10 w-full sm:w-auto">
              Encontrar Serviços
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm text-gray-400 mb-4">
              Acesso anual por apenas <span className="text-divulgaja-blue font-bold">10 USD</span>
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-300">
              <span className="flex items-center gap-1">
                💳 M-Pesa
              </span>
              <span className="flex items-center gap-1">
                💳 E-mola
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-white w-full overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,96L80,80C160,64,320,32,480,21.3C640,11,800,21,960,42.7C1120,64,1280,96,1360,112L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>
    </section>
  );
}

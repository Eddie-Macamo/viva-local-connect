
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-heading text-xl md:text-2xl font-bold">
            <span className="text-divulgaja-blue">Divulga</span>
            <span className="text-divulgaja-purple">Já</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link to="/marketplace" className="font-medium hover:text-divulgaja-blue transition-colors text-sm">
            Buscar Serviços
          </Link>
          <Link to="/auth" className="font-medium hover:text-divulgaja-blue transition-colors text-sm">
            Entrar/Cadastrar
          </Link>
          <Button variant="gradient" to="/auth" className="text-sm">
            Anunciar Agora
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "lg:hidden absolute left-0 right-0 bg-white border-b shadow-lg transition-all duration-300 ease-in-out z-30",
        isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 invisible"
      )}>
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link 
            to="/marketplace" 
            className="p-3 hover:bg-gray-50 rounded-md text-center" 
            onClick={() => setIsOpen(false)}
          >
            Buscar Serviços
          </Link>
          <Link 
            to="/auth" 
            className="p-3 hover:bg-gray-50 rounded-md text-center" 
            onClick={() => setIsOpen(false)}
          >
            Entrar/Cadastrar
          </Link>
          <Button 
            variant="gradient" 
            fullWidth 
            onClick={() => setIsOpen(false)} 
            to="/auth"
            className="py-3"
          >
            Anunciar Agora
          </Button>
        </nav>
      </div>
    </header>
  );
}

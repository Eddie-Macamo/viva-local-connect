
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
          <span className="font-heading text-2xl font-bold">
            <span className="text-divulgaja-blue">Divulga</span>
            <span className="text-divulgaja-purple">Já</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/marketplace" className="font-medium hover:text-divulgaja-blue transition-colors">
            Buscar Serviços
          </Link>
          <Link to="/register" className="font-medium hover:text-divulgaja-blue transition-colors">
            Cadastrar
          </Link>
          <Link to="/admin/login" className="font-medium hover:text-divulgaja-blue transition-colors">
            Painel Admin
          </Link>
          <Button variant="gradient" as={Link} to="/register">
            Anunciar Agora
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden absolute left-0 right-0 bg-white border-b shadow-lg transition-all duration-300 ease-in-out z-30",
        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 invisible"
      )}>
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link to="/marketplace" className="p-2 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
            Buscar Serviços
          </Link>
          <Link to="/register" className="p-2 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
            Cadastrar
          </Link>
          <Link to="/admin/login" className="p-2 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
            Painel Admin
          </Link>
          <Button variant="gradient" fullWidth onClick={() => setIsOpen(false)}>
            <Link to="/register" className="w-full">Anunciar Agora</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

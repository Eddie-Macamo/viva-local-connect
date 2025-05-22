
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface WhatsappButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  fixed?: boolean;
}

export function WhatsappButton({ phoneNumber, message = "Olá, vi seu serviço no DivulgaJá e gostaria de mais informações.", className, fixed = false }: WhatsappButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };
  
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "flex items-center justify-center bg-green-500 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl",
        fixed ? "fixed bottom-6 right-6 z-50 h-14 w-14 animate-bounce-slow" : "h-12 w-12",
        className
      )}
      aria-label="Contato via WhatsApp"
    >
      <Phone className="h-6 w-6" />
      
      {fixed && isHovered && (
        <span className="absolute right-16 bg-white text-green-500 px-3 py-1 rounded-lg shadow-md whitespace-nowrap">
          Fale conosco
        </span>
      )}
    </button>
  );
}

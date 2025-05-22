
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Service } from "@/lib/types";
import { WhatsappButton } from "@/components/shared/WhatsappButton";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  return (
    <div 
      className={cn(
        "relative bg-white rounded-xl overflow-hidden transition-all duration-300 h-full",
        featured ? "featured-item shadow-lg" : "border shadow-sm hover:shadow-md hover:-translate-y-1"
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={service.images[0] || "/placeholder.svg"} 
          alt={service.name}
          className="w-full h-full object-cover"
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-divulgaja-purple text-white text-xs font-bold px-2 py-1 rounded-full">
            Destaque
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{service.name}</h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{service.location}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Link 
            to={`/service/${service.id}`}
            className="text-divulgaja-blue font-medium hover:underline"
          >
            Ver detalhes
          </Link>
          
          <WhatsappButton phoneNumber={service.whatsapp} />
        </div>
      </div>
    </div>
  );
}

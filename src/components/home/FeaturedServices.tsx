
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Service } from "@/lib/types";
import { ServiceCard } from "@/components/services/ServiceCard";

interface FeaturedServicesProps {
  services: Service[];
}

export function FeaturedServices({ services }: FeaturedServicesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredServices = services.filter(service => service.featured);
  
  // Mostrar 3 itens em telas maiores, 1 em mobile
  const itemsPerView = window.innerWidth >= 768 ? 3 : 1;
  const totalSlides = Math.ceil(featuredServices.length / itemsPerView);
  
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };
  
  if (featuredServices.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-heading">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-divulgaja-blue to-divulgaja-purple">
              Destaques do Dia
            </span>
          </h2>
          
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-divulgaja-blue text-divulgaja-blue hover:bg-divulgaja-blue hover:text-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-divulgaja-blue text-divulgaja-blue hover:bg-divulgaja-blue hover:text-white transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {featuredServices.map((service) => (
              <div key={service.id} className="min-w-full md:min-w-[33.333%] px-2">
                <ServiceCard service={service} featured={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

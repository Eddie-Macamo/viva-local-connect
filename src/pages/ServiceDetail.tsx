
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsappButton } from "@/components/shared/WhatsappButton";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Tag } from "lucide-react";
import { mockServices, categories } from "@/lib/data";
import { Service } from "@/lib/types";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Encontrar o serviço com base no ID
  const service = mockServices.find(s => s.id === id);
  
  // Encontrar a categoria do serviço
  const category = categories.find(c => c.slug === service?.category);
  
  if (!service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Serviço não encontrado</h1>
            <p className="text-gray-600 mb-6">
              O serviço que você está procurando não está disponível ou foi removido.
            </p>
            <a
              href="/marketplace"
              className="inline-flex items-center px-4 py-2 bg-divulgaja-blue text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Voltar para a busca
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formattedDate = new Date(service.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  // Navegar pelas imagens
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <a
              href="/marketplace"
              className="inline-flex items-center text-divulgaja-blue hover:underline"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Voltar para a busca</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Galeria de imagens */}
            <div className="rounded-xl overflow-hidden bg-gray-100">
              {service.images.length > 0 ? (
                <div className="relative">
                  <img
                    src={service.images[currentImageIndex]}
                    alt={service.name}
                    className="w-full aspect-video object-cover"
                  />
                  
                  {service.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {service.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full ${
                              idx === currentImageIndex ? "bg-divulgaja-blue" : "bg-white/70"
                            }`}
                            aria-label={`Ir para imagem ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Sem imagem disponível</span>
                </div>
              )}
              
              {/* Miniaturas */}
              {service.images.length > 1 && (
                <div className="flex mt-4 gap-2 overflow-auto px-2 py-2">
                  {service.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex
                          ? "border-divulgaja-blue shadow-md"
                          : "border-transparent opacity-70"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Miniatura ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Detalhes do serviço */}
            <div className="space-y-6">
              {service.featured && (
                <span className="inline-block bg-divulgaja-purple text-white text-xs px-3 py-1 rounded-full font-medium">
                  Destaque
                </span>
              )}
              
              <h1 className="text-3xl font-bold font-heading">{service.name}</h1>
              
              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1.5" />
                  <span>{service.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Tag className="h-5 w-5 mr-1.5" />
                  <span>{category?.name || service.category}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-1.5" />
                  <span>Desde {formattedDate}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h2 className="text-xl font-bold mb-3">Descrição</h2>
                <p className="text-gray-700 whitespace-pre-line">{service.description}</p>
              </div>
              
              <div className="pt-6 border-t">
                <h2 className="text-xl font-bold mb-4">Entre em contato</h2>
                <a
                  href={`https://wa.me/${service.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    />
                  </svg>
                  Enviar Mensagem no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton phoneNumber={service.whatsapp} fixed />
    </div>
  );
};

export default ServiceDetail;

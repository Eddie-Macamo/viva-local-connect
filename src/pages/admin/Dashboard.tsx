
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/shared/Button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { 
  LogOut, 
  Check, 
  X, 
  Star, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash, 
  ChevronDown 
} from "lucide-react";
import { Service } from "@/lib/types";
import { mockServices } from "@/lib/data";

const Dashboard = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending">("all");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured" | "regular">("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  // Verificar autenticação
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAdmin) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);
  
  // Carregar serviços
  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setServices(mockServices);
    }, 500);
  }, []);
  
  // Aplicar filtros
  useEffect(() => {
    let results = services;
    
    // Filtro por termo de busca
    if (searchTerm) {
      results = results.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtro por status de aprovação
    if (statusFilter !== "all") {
      results = results.filter(service => 
        (statusFilter === "approved" && service.approved) || 
        (statusFilter === "pending" && !service.approved)
      );
    }
    
    // Filtro por destaque
    if (featuredFilter !== "all") {
      results = results.filter(service => 
        (featuredFilter === "featured" && service.featured) || 
        (featuredFilter === "regular" && !service.featured)
      );
    }
    
    setFilteredServices(results);
  }, [services, searchTerm, statusFilter, featuredFilter]);
  
  // Sair do painel admin
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/admin/login");
  };
  
  // Aprovar serviço
  const handleApprove = (service: Service) => {
    setServices(currentServices => 
      currentServices.map(s => 
        s.id === service.id ? { ...s, approved: true } : s
      )
    );
  };
  
  // Rejeitar serviço
  const handleReject = (service: Service) => {
    setServices(currentServices => 
      currentServices.map(s => 
        s.id === service.id ? { ...s, approved: false } : s
      )
    );
  };
  
  // Alternar destaque
  const handleToggleFeatured = (service: Service) => {
    setServices(currentServices => 
      currentServices.map(s => 
        s.id === service.id ? { ...s, featured: !s.featured } : s
      )
    );
  };
  
  // Excluir serviço
  const handleDelete = (serviceId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      setServices(currentServices => 
        currentServices.filter(s => s.id !== serviceId)
      );
    }
  };
  
  // Abrir modal de visualização
  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setIsViewModalOpen(true);
  };
  
  // Se não autenticado, não renderiza nada
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Painel Administrativo</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
          
          {/* Filtros */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar serviços..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | "approved" | "pending")}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple"
                >
                  <option value="all">Todos os status</option>
                  <option value="approved">Aprovados</option>
                  <option value="pending">Pendentes</option>
                </select>
                
                <select
                  value={featuredFilter}
                  onChange={(e) => setFeaturedFilter(e.target.value as "all" | "featured" | "regular")}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple"
                >
                  <option value="all">Todos os tipos</option>
                  <option value="featured">Destacados</option>
                  <option value="regular">Regulares</option>
                </select>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setFeaturedFilter("all");
                  }}
                >
                  Limpar
                </Button>
              </div>
            </div>
          </div>
          
          {/* Lista de serviços */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serviço
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Localização
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destaque
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={service.images[0] || "/placeholder.svg"}
                                alt={service.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{service.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-[200px]">
                                {service.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{service.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {service.approved ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Aprovado
                            </span>
                          ) : (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pendente
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {service.featured ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              Destacado
                            </span>
                          ) : (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Regular
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleViewService(service)}
                              className="p-1.5 text-gray-500 hover:text-divulgaja-blue rounded-full hover:bg-blue-50"
                              title="Visualizar"
                            >
                              <Eye size={18} />
                            </button>
                            
                            <button
                              onClick={() => handleApprove(service)}
                              className={`p-1.5 rounded-full ${
                                service.approved
                                  ? "text-green-600 bg-green-50"
                                  : "text-gray-500 hover:text-green-600 hover:bg-green-50"
                              }`}
                              title="Aprovar"
                            >
                              <Check size={18} />
                            </button>
                            
                            <button
                              onClick={() => handleReject(service)}
                              className={`p-1.5 rounded-full ${
                                !service.approved
                                  ? "text-red-600 bg-red-50"
                                  : "text-gray-500 hover:text-red-600 hover:bg-red-50"
                              }`}
                              title="Rejeitar"
                            >
                              <X size={18} />
                            </button>
                            
                            <button
                              onClick={() => handleToggleFeatured(service)}
                              className={`p-1.5 rounded-full ${
                                service.featured
                                  ? "text-purple-600 bg-purple-50"
                                  : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                              }`}
                              title={service.featured ? "Remover destaque" : "Adicionar destaque"}
                            >
                              <Star size={18} />
                            </button>
                            
                            <button
                              onClick={() => handleDelete(service.id)}
                              className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
                              title="Excluir"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center">
                        <div className="text-gray-500">
                          {services.length === 0 ? (
                            <div>
                              <p className="text-lg">Carregando serviços...</p>
                              <div className="mt-2 animate-spin w-8 h-8 border-4 border-gray-300 border-t-divulgaja-blue rounded-full mx-auto"></div>
                            </div>
                          ) : (
                            <p>Nenhum serviço encontrado com os filtros selecionados.</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Modal de visualização do serviço */}
      {isViewModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 p-4 bg-white border-b flex items-center justify-between z-10">
              <h3 className="text-lg font-bold">{selectedService.name}</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <ServiceCard service={selectedService} featured={selectedService.featured} />
            </div>
            
            <div className="sticky bottom-0 p-4 bg-white border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

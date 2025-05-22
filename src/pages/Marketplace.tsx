
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceCard } from "@/components/services/ServiceCard";
import { WhatsappButton } from "@/components/shared/WhatsappButton";
import { Button } from "@/components/shared/Button";
import { Search, Filter } from "lucide-react";
import { Service } from "@/lib/types";
import { mockServices, categories } from "@/lib/data";

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const locationParam = searchParams.get("location") || "";
  const searchParam = searchParams.get("q") || "";

  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [categoryFilter, setCategoryFilter] = useState(categoryParam);
  const [locationFilter, setLocationFilter] = useState(locationParam);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Localizações únicas extraídas dos serviços
  const locations = Array.from(new Set(mockServices.map(service => service.location)));

  // Inicializar os serviços
  useEffect(() => {
    setServices(mockServices);
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let results = services;
    
    if (searchTerm) {
      results = results.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter) {
      results = results.filter(service => service.category === categoryFilter);
    }
    
    if (locationFilter) {
      results = results.filter(service => service.location === locationFilter);
    }
    
    setFilteredServices(results);
  }, [services, searchTerm, categoryFilter, locationFilter]);

  // Atualizar URL com os parâmetros de busca
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (categoryFilter) params.set("category", categoryFilter);
    if (locationFilter) params.set("location", locationFilter);
    setSearchParams(params);
  }, [searchTerm, categoryFilter, locationFilter, setSearchParams]);

  // Handler para o formulário de busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // A busca é realizada automaticamente pelo useEffect
  };

  // Limpar todos os filtros
  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setLocationFilter("");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-divulgaja-purple bg-opacity-10 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold font-heading mb-6">Encontre Serviços</h1>
            
            <form onSubmit={handleSearch} className="flex flex-wrap gap-4 mb-6">
              <div className="flex-grow min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="O que você está procurando?"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple"
                  />
                </div>
              </div>
              
              <Button 
                type="button"
                variant="outline"
                className="md:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={20} className="mr-2" />
                Filtros
              </Button>
              
              {/* Filtros para desktop */}
              <div className="hidden md:flex gap-4">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-lg border px-4 py-3 focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
                
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="rounded-lg border px-4 py-3 focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple"
                >
                  <option value="">Todos os bairros</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                
                <Button type="submit" variant="default">
                  Buscar
                </Button>
                
                {(searchTerm || categoryFilter || locationFilter) && (
                  <Button type="button" variant="ghost" onClick={handleClearFilters}>
                    Limpar Filtros
                  </Button>
                )}
              </div>
            </form>
            
            {/* Filtros para mobile */}
            {isFilterOpen && (
              <div className="md:hidden mb-6 p-4 bg-white rounded-lg shadow-md">
                <h3 className="font-medium mb-3">Filtrar por:</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Categoria</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple"
                    >
                      <option value="">Todas as categorias</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Bairro</label>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple"
                    >
                      <option value="">Todos os bairros</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="submit" onClick={() => setIsFilterOpen(false)}>
                      Aplicar Filtros
                    </Button>
                    
                    {(searchTerm || categoryFilter || locationFilter) && (
                      <Button type="button" variant="ghost" onClick={handleClearFilters}>
                        Limpar Filtros
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-heading">
                {filteredServices.length} {filteredServices.length === 1 ? 'serviço encontrado' : 'serviços encontrados'}
              </h2>
            </div>
            
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} featured={service.featured} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Nenhum serviço encontrado com os filtros selecionados.</p>
                <Button onClick={handleClearFilters} variant="link" className="mt-4">
                  Limpar filtros e ver todos
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappButton phoneNumber="5511999999999" fixed />
    </div>
  );
};

export default Marketplace;

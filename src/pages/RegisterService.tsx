
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/shared/Button";
import { WhatsappButton } from "@/components/shared/WhatsappButton";
import { Upload, Check, X } from "lucide-react";
import { categories } from "@/lib/data";
import { ServiceFormData } from "@/lib/types";

const RegisterService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    description: "",
    category: "",
    location: "",
    whatsapp: "",
    images: [],
    featured: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Atualizar o estado do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Limpar erro quando o campo é preenchido
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Manipulador de upload de imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length) {
      // Verificar se não ultrapassa o limite de 3 imagens
      if (formData.images.length + files.length > 3) {
        setErrors(prev => ({
          ...prev,
          images: "Máximo de 3 imagens permitidas",
        }));
        return;
      }
      
      // Adicionar as novas imagens
      const newImages = [...formData.images];
      const newPreviews = [...imagePreview];
      
      for (let i = 0; i < files.length; i++) {
        newImages.push(files[i]);
        newPreviews.push(URL.createObjectURL(files[i]));
      }
      
      setFormData(prev => ({
        ...prev,
        images: newImages,
      }));
      setImagePreview(newPreviews);
      
      // Limpar erro se houver
      if (errors.images) {
        setErrors(prev => {
          const updated = { ...prev };
          delete updated.images;
          return updated;
        });
      }
    }
  };

  // Remover imagem
  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    
    setFormData(prev => ({
      ...prev,
      images: newImages,
    }));
    setImagePreview(newPreviews);
  };

  // Validar o formulário
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Nome do negócio é obrigatório";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Descrição do serviço é obrigatória";
    }
    
    if (!formData.category) {
      newErrors.category = "Selecione uma categoria";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Localização é obrigatória";
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (!/^\d+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Digite apenas números";
    }
    
    if (formData.images.length === 0) {
      newErrors.images = "Adicione pelo menos uma imagem";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/confirmation", { 
        state: { 
          service: {
            ...formData,
            id: Date.now().toString(),
          } 
        } 
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="gradient-primary p-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold font-heading">Cadastre seu Serviço</h1>
              <p className="mt-2 text-white/80">
                Preencha o formulário abaixo para cadastrar seu negócio na plataforma
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Nome do Negócio */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nome do Negócio*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple`}
                    placeholder="Ex: Salão da Ana"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                {/* Descrição */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Descrição do Serviço*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple`}
                    placeholder="Descreva seu serviço ou negócio..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                  )}
                </div>
                
                {/* Categoria */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">
                    Categoria*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple`}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>
                
                {/* Localização */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1">
                    Bairro/Localização*
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple`}
                    placeholder="Ex: Centro"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                </div>
                
                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium mb-1">
                    WhatsApp para contato* (apenas números)
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                      +
                    </span>
                    <input
                      type="text"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-r-lg border ${
                        errors.whatsapp ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple`}
                      placeholder="55999999999 (sem traço ou parênteses)"
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>
                  )}
                </div>
                
                {/* Upload de imagens */}
                <div>
                  <label htmlFor="images" className="block text-sm font-medium mb-1">
                    Imagens* (máx: 3)
                  </label>
                  
                  <div className="mt-2 space-y-2">
                    {/* Previews de imagens */}
                    {imagePreview.length > 0 && (
                      <div className="flex flex-wrap gap-4 mb-4">
                        {imagePreview.map((url, index) => (
                          <div key={index} className="relative">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {formData.images.length < 3 && (
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="images"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Clique para fazer upload</span> ou
                              arraste e solte
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG (MAX. 3 arquivos)
                            </p>
                          </div>
                          <input
                            id="images"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    )}
                    
                    {errors.images && (
                      <p className="mt-1 text-sm text-red-500">{errors.images}</p>
                    )}
                  </div>
                </div>
                
                {/* Destaque */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-divulgaja-purple focus:ring-divulgaja-purple"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm">
                    Quero destacar meu anúncio
                  </label>
                </div>
                
                <div className="pt-4 border-t">
                  <Button
                    type="submit"
                    variant="gradient"
                    fullWidth
                    className="flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Enviar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton phoneNumber="5511999999999" fixed />
    </div>
  );
};

export default RegisterService;

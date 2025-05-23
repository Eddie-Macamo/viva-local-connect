
import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { User, Lock, Mail, Phone } from "lucide-react";

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function AuthForm({ mode, onSubmit, isLoading = false }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (mode === 'register' && !formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (mode === 'register' && !formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    }
    
    if (!formData.password) {
      newErrors.password = "Password é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password deve ter pelo menos 6 caracteres";
    }
    
    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords não coincidem";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      {mode === 'register' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome Completo*
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple`}
              placeholder="Seu nome completo"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email*
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple`}
            placeholder="seu@email.com"
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {mode === 'register' && (
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Telefone/WhatsApp*
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple`}
              placeholder="258 XX XXX XXXX"
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password*
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple`}
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>

      {mode === 'register' && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            Confirmar Password*
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-divulgaja-purple focus:border-divulgaja-purple`}
              placeholder="Repita a password"
            />
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>
      )}

      <Button
        type="submit"
        variant="gradient"
        fullWidth
        className="flex items-center justify-center py-3"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {mode === 'register' ? 'Criando conta...' : 'Entrando...'}
          </>
        ) : (
          mode === 'register' ? 'Criar Conta' : 'Entrar'
        )}
      </Button>
    </form>
  );
}

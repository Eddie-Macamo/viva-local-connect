
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/shared/Button";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    
    // Simular processo de autenticação
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'register') {
        // Redirecionar para página de pagamento da subscrição
        navigate('/subscription');
      } else {
        // Redirecionar para dashboard ou página anterior
        navigate('/register');
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="gradient-primary p-6 text-white text-center">
              <h1 className="text-2xl md:text-3xl font-bold font-heading">
                {mode === 'register' ? 'Criar Conta' : 'Entrar'}
              </h1>
              <p className="mt-2 text-white/80 text-sm md:text-base">
                {mode === 'register' 
                  ? 'Crie sua conta para começar a divulgar'
                  : 'Entre na sua conta'
                }
              </p>
            </div>
            
            <div className="p-6">
              <AuthForm 
                mode={mode} 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
              />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {mode === 'register' 
                    ? 'Já tem uma conta?' 
                    : 'Não tem uma conta?'
                  }
                </p>
                <Button
                  variant="link"
                  onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
                  className="mt-1"
                >
                  {mode === 'register' ? 'Entrar' : 'Criar conta'}
                </Button>
              </div>

              {mode === 'register' && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">
                    💡 Subscrição Anual
                  </h3>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Acesso por 1 ano completo</li>
                    <li>• Cadastrar serviços ilimitados</li>
                    <li>• Suporte via WhatsApp</li>
                    <li>• Apenas 10 USD via M-Pesa ou E-mola</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;

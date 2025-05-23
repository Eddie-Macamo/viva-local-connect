
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/shared/Button";
import { Upload, Check, CreditCard, Smartphone } from "lucide-react";

const Subscription = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola'>('mpesa');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceipt(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio do comprovativo
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/subscription-pending');
    }, 2000);
  };

  const paymentInfo = {
    mpesa: {
      name: "M-Pesa",
      number: "258 84 123 4567",
      instructions: "Envie 500 MT (≈10 USD) para o número acima",
      icon: <Smartphone className="w-6 h-6" />
    },
    emola: {
      name: "E-mola",
      number: "258 82 765 4321",
      instructions: "Envie 500 MT (≈10 USD) para o número acima",
      icon: <CreditCard className="w-6 h-6" />
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="gradient-primary p-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold font-heading">Subscrição Anual</h1>
              <p className="mt-2 text-white/80">
                Ative sua conta por apenas 10 USD (500 MT) por ano
              </p>
            </div>
            
            <div className="p-6">
              {/* Benefícios */}
              <div className="mb-8 p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-3">
                  ✨ O que inclui sua subscrição:
                </h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Acesso por 1 ano completo
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Cadastrar serviços ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Suporte via WhatsApp
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Visibilidade em toda Moçambique
                  </li>
                </ul>
              </div>

              {/* Métodos de pagamento */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Escolha o método de pagamento:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(['mpesa', 'emola'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === method
                          ? 'border-divulgaja-purple bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {paymentInfo[method].icon}
                        <div className="text-left">
                          <h4 className="font-semibold">{paymentInfo[method].name}</h4>
                          <p className="text-sm text-gray-600">{paymentInfo[method].number}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instruções de pagamento */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  📱 Instruções de pagamento:
                </h3>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. {paymentInfo[paymentMethod].instructions}</li>
                  <li>2. Use a referência: "DIVULGAJA-SUB"</li>
                  <li>3. Faça screenshot do comprovativo</li>
                  <li>4. Envie o comprovativo abaixo</li>
                </ol>
              </div>

              {/* Upload do comprovativo */}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Comprovativo de Pagamento*
                  </label>
                  
                  {receipt ? (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-800">{receipt.name}</span>
                      <button
                        type="button"
                        onClick={() => setReceipt(null)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Clique para fazer upload</span>
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleReceiptUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  fullWidth
                  className="flex items-center justify-center"
                  disabled={!receipt || isSubmitting}
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
                      Confirmar Pagamento
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Após o envio, sua conta será ativada em até 24 horas úteis
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Subscription;

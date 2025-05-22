
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsappButton } from "@/components/shared/WhatsappButton";
import { Button } from "@/components/shared/Button";
import { Upload, Check, ArrowLeft, Clock } from "lucide-react";
import { ServiceFormData } from "@/lib/types";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "paypal">("mpesa");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const serviceData = location.state?.service as ServiceFormData & { id: string } | undefined;
  
  // Redirecionar se não houver dados do serviço
  useEffect(() => {
    if (!serviceData) {
      navigate("/register");
    }
  }, [serviceData, navigate]);
  
  if (!serviceData) {
    return null; // Não renderizar nada enquanto redireciona
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      const preview = URL.createObjectURL(file);
      setReceiptPreview(preview);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };
  
  // Se não for um serviço destacado, redirecionar para sucesso simples
  if (!serviceData.featured) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-green-500 p-6 text-white">
                <h1 className="text-2xl md:text-3xl font-bold font-heading">Serviço Cadastrado!</h1>
                <p className="mt-2 text-white/80">
                  Seu serviço foi enviado com sucesso e está aguardando aprovação.
                </p>
              </div>
              
              <div className="p-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Check className="h-12 w-12 text-green-500" />
                </div>
                
                <h2 className="text-xl font-bold mb-2">Obrigado pelo seu cadastro!</h2>
                <p className="text-center text-gray-600 mb-6">
                  Seu serviço foi enviado para análise e será publicado em breve.
                  Você receberá uma notificação quando ele estiver disponível na plataforma.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="default" href="/marketplace">
                    Ver serviços disponíveis
                  </Button>
                  <Button variant="outline" href="/">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Voltar para a página inicial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Para serviços destacados, mostrar opções de pagamento
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            {isSuccess ? (
              // Tela de sucesso após pagamento
              <div>
                <div className="bg-green-500 p-6 text-white">
                  <h1 className="text-2xl md:text-3xl font-bold font-heading">Comprovante Enviado!</h1>
                  <p className="mt-2 text-white/80">
                    Obrigado pelo seu pagamento.
                  </p>
                </div>
                
                <div className="p-6 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <Check className="h-12 w-12 text-green-500" />
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2">Pagamento Recebido</h2>
                  <p className="text-center text-gray-600 mb-6">
                    Seu comprovante foi recebido e está em análise. 
                    Seu serviço será destacado assim que o pagamento for confirmado.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="default" href="/marketplace">
                      Ver serviços disponíveis
                    </Button>
                    <Button variant="outline" href="/">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Voltar para a página inicial
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Tela de pagamento
              <div>
                <div className="gradient-primary p-6 text-white">
                  <h1 className="text-2xl md:text-3xl font-bold font-heading">Destaque seu Anúncio</h1>
                  <p className="mt-2 text-white/80">
                    Complete o pagamento para destacar seu serviço na plataforma.
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-yellow-800">Seu serviço foi cadastrado!</h3>
                        <p className="text-sm text-yellow-700">
                          Para destacá-lo na plataforma, finalize o pagamento conforme as instruções abaixo.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-bold mb-4">Escolha a forma de pagamento:</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("mpesa")}
                      className={`p-4 border rounded-lg flex items-center ${
                        paymentMethod === "mpesa"
                          ? "border-divulgaja-blue bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mr-3">
                        <span className="font-bold">M</span>
                      </div>
                      <div>
                        <span className="block font-medium">M-Pesa</span>
                        <span className="text-sm text-gray-600">Pagamento móvel</span>
                      </div>
                      {paymentMethod === "mpesa" && (
                        <Check className="ml-auto h-5 w-5 text-divulgaja-blue" />
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-4 border rounded-lg flex items-center ${
                        paymentMethod === "paypal"
                          ? "border-divulgaja-blue bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-3">
                        <span className="font-bold">P</span>
                      </div>
                      <div>
                        <span className="block font-medium">PayPal</span>
                        <span className="text-sm text-gray-600">Pagamento online</span>
                      </div>
                      {paymentMethod === "paypal" && (
                        <Check className="ml-auto h-5 w-5 text-divulgaja-blue" />
                      )}
                    </button>
                  </div>
                  
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Instruções de Pagamento:</h3>
                    {paymentMethod === "mpesa" ? (
                      <div className="space-y-2">
                        <p>Valor: <strong>500 MT</strong></p>
                        <p>Número M-Pesa: <strong>84 1234567</strong></p>
                        <p>Referência: <strong>DIV-{serviceData.id}</strong></p>
                        <p className="text-sm text-gray-600">
                          Após efetuar o pagamento, envie o comprovativo abaixo.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p>Valor: <strong>$10 USD</strong></p>
                        <p>
                          Link de pagamento: <a 
                            href="https://paypal.me/example" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-divulgaja-blue hover:underline"
                          >
                            paypal.me/example
                          </a>
                        </p>
                        <p>Referência: <strong>DIV-{serviceData.id}</strong></p>
                        <p className="text-sm text-gray-600">
                          Após efetuar o pagamento, envie o comprovativo abaixo.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Anexar comprovativo de pagamento*
                      </label>
                      
                      {receiptPreview ? (
                        <div className="relative mb-4">
                          <img
                            src={receiptPreview}
                            alt="Preview do comprovativo"
                            className="max-h-48 rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setReceiptFile(null);
                              setReceiptPreview(null);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                          >
                            <Upload className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="receipt"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Clique para fazer upload</span> ou
                                arraste e solte
                              </p>
                              <p className="text-xs text-gray-500">
                                PNG, JPG ou PDF
                              </p>
                            </div>
                            <input
                              id="receipt"
                              type="file"
                              className="hidden"
                              accept="image/*,.pdf"
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                        </div>
                      )}
                      
                      <div className="mt-4 flex items-center justify-center">
                        <div className="border-t border-gray-300 w-full"></div>
                        <span className="px-2 bg-white text-sm text-gray-500">ou</span>
                        <div className="border-t border-gray-300 w-full"></div>
                      </div>
                      
                      <div className="mt-4 text-center">
                        <a
                          href={`https://wa.me/5511999999999?text=Olá! Realizei o pagamento para destaque do serviço DIV-${serviceData.id}. Anexo segue o comprovante.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-600 hover:text-green-700"
                        >
                          Enviar comprovativo por WhatsApp
                          <svg
                            className="ml-1 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
                            <path
                              fillRule="evenodd"
                              d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 1.87.518 3.617 1.417 5.11l-.943 3.394 3.506-.91a9.957 9.957 0 005.019 1.356c5.522 0 9.998-4.477 9.998-9.999 0-5.523-4.477-10-9.998-10zm0 18.177a8.13 8.13 0 01-4.474-1.325l-.316-.189-3.337.873.892-3.242-.206-.328a7.98 7.98 0 01-1.337-4.422 8.177 8.177 0 018.176-8.176 8.177 8.177 0 018.176 8.176 8.178 8.178 0 01-8.176 8.176z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/marketplace")}
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Pular por agora
                      </Button>
                      
                      <Button
                        type="submit"
                        variant="gradient"
                        disabled={!receiptFile || isSubmitting}
                        className="min-w-[150px]"
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
                            Enviar Comprovativo
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton phoneNumber="5511999999999" fixed />
    </div>
  );
};

export default Confirmation;

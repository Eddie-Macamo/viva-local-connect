
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { CategorySection } from "@/components/home/CategorySection";
import { WhatsappButton } from "@/components/shared/WhatsappButton";
import { mockServices } from "@/lib/data";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedServices services={mockServices} />
        <CategorySection />
        
        {/* Seção CTA */}
        <section className="gradient-primary py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
              Pronto para impulsionar seu negócio?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Cadastre seu serviço gratuitamente e destaque-se na sua região.
              Alcance novos clientes e faça seu negócio crescer!
            </p>
            <a 
              href="/register" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-divulgaja-purple font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Cadastrar agora
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappButton phoneNumber="5511999999999" fixed />
    </div>
  );
};

export default Index;


import { Link } from "react-router-dom";
import { 
  Scissors, 
  Bike, 
  Wrench, 
  Shirt, 
  UtensilsCrossed, 
  Bath, 
  ShoppingBag, 
  Truck, 
  Building, 
  Laptop,
  Hammer,
  Car,
  Camera,
  Stethoscope,
  GraduationCap,
  Music,
  Flower,
  Zap
} from "lucide-react";
import { Category } from "@/lib/types";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<any>> = {
  Scissors,
  Bike,
  Wrench,
  Shirt,
  UtensilsCrossed,
  Bath,
  ShoppingBag,
  Truck,
  Building,
  Laptop,
  Hammer,
  Car,
  Camera,
  Stethoscope,
  GraduationCap,
  Music,
  Flower,
  Zap
};

export function CategorySection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
            Serviços em Moçambique
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Escolha entre diversas categorias de serviços disponíveis em todas as províncias
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon];
  
  return (
    <Link
      to={`/marketplace?category=${category.slug}`}
      className={cn(
        "flex flex-col items-center justify-center p-3 md:p-4 lg:p-6 rounded-xl border bg-white",
        "hover:shadow-md hover:-translate-y-1 transition-all duration-300",
        "text-center card-hover min-h-[100px] md:min-h-[120px]"
      )}
    >
      <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center bg-gray-100 mb-2 md:mb-3">
        {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-divulgaja-blue" />}
      </div>
      <h3 className="font-medium text-xs md:text-sm lg:text-base leading-tight">{category.name}</h3>
    </Link>
  );
}


import { Link } from "react-router-dom";
import { 
  Scissors, 
  Bike, 
  Wrench, 
  Paintbrush, 
  UtensilsCrossed, 
  Bath, 
  ShoppingBag, 
  Truck, 
  Home, 
  Laptop 
} from "lucide-react";
import { Category } from "@/lib/types";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<any>> = {
  Scissors,
  Bike,
  Wrench,
  Paintbrush,
  UtensilsCrossed,
  Bath,
  ShoppingBag,
  Truck,
  Home,
  Laptop
};

export function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
            Encontre serviços por categoria
          </h2>
          <p className="text-gray-600">
            Escolha entre diversas categorias de serviços disponíveis na sua região
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
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
        "flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border bg-white",
        "hover:shadow-md hover:-translate-y-1 transition-all duration-300",
        "text-center card-hover"
      )}
    >
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-gray-100 mb-3">
        {Icon && <Icon className="w-6 h-6 md:w-8 md:h-8 text-divulgaja-blue" />}
      </div>
      <h3 className="font-medium text-sm md:text-base">{category.name}</h3>
    </Link>
  );
}

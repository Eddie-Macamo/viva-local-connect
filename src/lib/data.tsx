
import { Category, Service } from "./types";
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

// Categorias de serviço
export const categories: Category[] = [
  {
    id: "1",
    name: "Cabeleireiros",
    icon: "Scissors",
    slug: "cabeleireiros"
  },
  {
    id: "2",
    name: "Mototáxi",
    icon: "Bike",
    slug: "mototaxi"
  },
  {
    id: "3",
    name: "Técnicos",
    icon: "Wrench",
    slug: "tecnicos"
  },
  {
    id: "4",
    name: "Costureiras",
    icon: "Paintbrush", // Ícone aproximado
    slug: "costureiras"
  },
  {
    id: "5",
    name: "Comidas",
    icon: "UtensilsCrossed",
    slug: "comidas"
  },
  {
    id: "6",
    name: "Limpeza",
    icon: "Bath",
    slug: "limpeza"
  },
  {
    id: "7",
    name: "Comércio",
    icon: "ShoppingBag",
    slug: "comercio"
  },
  {
    id: "8",
    name: "Fretes",
    icon: "Truck",
    slug: "fretes"
  },
  {
    id: "9",
    name: "Diaristas",
    icon: "Home",
    slug: "diaristas"
  },
  {
    id: "10",
    name: "Informática",
    icon: "Laptop",
    slug: "informatica"
  }
];

// Dados simulados de serviços
export const mockServices: Service[] = [
  {
    id: "1",
    name: "Salão da Ana",
    description: "Cortes masculinos e femininos, coloração, tratamentos capilares e muito mais.",
    category: "cabeleireiros",
    location: "Centro",
    whatsapp: "5511999999999",
    images: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1974"],
    featured: true,
    approved: true,
    createdAt: new Date("2023-05-15")
  },
  {
    id: "2",
    name: "Moto Expresso",
    description: "Serviços de mototáxi rápidos e seguros para toda a cidade.",
    category: "mototaxi",
    location: "Vila Nova",
    whatsapp: "5511988888888",
    images: ["https://images.unsplash.com/photo-1611279290747-744d299dde51?auto=format&fit=crop&q=80&w=2071"],
    featured: true,
    approved: true,
    createdAt: new Date("2023-06-10")
  },
  {
    id: "3",
    name: "Conserto Rápido",
    description: "Assistência técnica para eletrodomésticos, instalações elétricas e hidráulicas.",
    category: "tecnicos",
    location: "Jardim América",
    whatsapp: "5511977777777",
    images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=2069"],
    featured: false,
    approved: true,
    createdAt: new Date("2023-06-22")
  },
  {
    id: "4",
    name: "Costura & Cia",
    description: "Serviços de costura, ajustes, reformas e confecção de roupas sob medida.",
    category: "costureiras",
    location: "Boa Vista",
    whatsapp: "5511966666666",
    images: ["https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?auto=format&fit=crop&q=80&w=2070"],
    featured: false,
    approved: true,
    createdAt: new Date("2023-07-05")
  },
  {
    id: "5",
    name: "Sabor Caseiro",
    description: "Comida caseira por encomenda, marmitas fitness e eventos.",
    category: "comidas",
    location: "Centro",
    whatsapp: "5511955555555",
    images: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070"],
    featured: true,
    approved: true,
    createdAt: new Date("2023-07-18")
  },
  {
    id: "6",
    name: "Limpa Tudo",
    description: "Serviços profissionais de limpeza residencial e comercial.",
    category: "limpeza",
    location: "Vila Maria",
    whatsapp: "5511944444444",
    images: ["https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=2070"],
    featured: false,
    approved: true,
    createdAt: new Date("2023-08-01")
  }
];

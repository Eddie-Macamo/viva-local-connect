
import { Category, Service, Province } from "./types";
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
  Laptop,
  Building,
  Hammer,
  Car,
  Shirt,
  Camera,
  Stethoscope,
  GraduationCap,
  Music,
  Flower,
  Zap
} from "lucide-react";

// Categorias de serviço adaptadas para Moçambique
export const categories: Category[] = [
  {
    id: "1",
    name: "Cabeleireiros & Estética",
    icon: "Scissors",
    slug: "cabeleireiros"
  },
  {
    id: "2",
    name: "Mototáxi & Transporte",
    icon: "Bike",
    slug: "transporte"
  },
  {
    id: "3",
    name: "Técnicos & Reparações",
    icon: "Wrench",
    slug: "tecnicos"
  },
  {
    id: "4",
    name: "Costureiras & Alfaiataria",
    icon: "Shirt",
    slug: "costura"
  },
  {
    id: "5",
    name: "Comidas & Restauração",
    icon: "UtensilsCrossed",
    slug: "comidas"
  },
  {
    id: "6",
    name: "Limpeza & Domésticas",
    icon: "Bath",
    slug: "limpeza"
  },
  {
    id: "7",
    name: "Comércio Geral",
    icon: "ShoppingBag",
    slug: "comercio"
  },
  {
    id: "8",
    name: "Fretes & Mudanças",
    icon: "Truck",
    slug: "fretes"
  },
  {
    id: "9",
    name: "Imobiliária",
    icon: "Building",
    slug: "imobiliaria"
  },
  {
    id: "10",
    name: "Carpintaria & Marcenaria",
    icon: "Hammer",
    slug: "carpintaria"
  },
  {
    id: "11",
    name: "Venda de Carros",
    icon: "Car",
    slug: "carros"
  },
  {
    id: "12",
    name: "Informática & Tecnologia",
    icon: "Laptop",
    slug: "informatica"
  },
  {
    id: "13",
    name: "Fotografia & Eventos",
    icon: "Camera",
    slug: "fotografia"
  },
  {
    id: "14",
    name: "Saúde & Medicina",
    icon: "Stethoscope",
    slug: "saude"
  },
  {
    id: "15",
    name: "Educação & Explicações",
    icon: "GraduationCap",
    slug: "educacao"
  },
  {
    id: "16",
    name: "Música & Entretenimento",
    icon: "Music",
    slug: "musica"
  },
  {
    id: "17",
    name: "Jardinagem & Paisagismo",
    icon: "Flower",
    slug: "jardinagem"
  },
  {
    id: "18",
    name: "Electricidade & Energia",
    icon: "Zap",
    slug: "electricidade"
  }
];

// Províncias e bairros de Moçambique
export const provinces: Province[] = [
  {
    id: "1",
    name: "Maputo Cidade",
    districts: [
      "Baixa", "Polana", "Sommerschield", "Alto Maé", "Maxaquene", "Chamanculo", 
      "Xipamanine", "Aeroporto", "Bagamoyo", "Hulene", "Mafalala", "Malhangalene", 
      "Minkadjuine", "Nsalene", "Inhagoia", "Katembe", "Costa do Sol"
    ]
  },
  {
    id: "2",
    name: "Maputo Província",
    districts: [
      "Matola", "Boane", "Marracuene", "Manhiça", "Magude", "Moamba", 
      "Namaacha", "Matutuíne"
    ]
  },
  {
    id: "3",
    name: "Gaza",
    districts: [
      "Xai-Xai", "Chókwè", "Chibuto", "Manjacaze", "Mandlakazi", 
      "Massingir", "Guijá", "Mabalane", "Chicualacuala", "Massangena", "Bilene"
    ]
  },
  {
    id: "4",
    name: "Inhambane",
    districts: [
      "Inhambane", "Maxixe", "Vilanculos", "Massinga", "Morrumbene", 
      "Jangamo", "Inharrime", "Zavala", "Govuro", "Homoíne", "Panda", 
      "Funhalouro", "Mabote"
    ]
  },
  {
    id: "5",
    name: "Sofala",
    districts: [
      "Beira", "Dondo", "Nhamatanda", "Búzi", "Chibabava", "Gorongosa", 
      "Muanza", "Machanga", "Caia", "Chemba", "Maríngué", "Cheringoma"
    ]
  },
  {
    id: "6",
    name: "Manica",
    districts: [
      "Chimoio", "Gondola", "Manica", "Sussundenga", "Báruè", 
      "Tambara", "Guro", "Macossa", "Mossurize"
    ]
  },
  {
    id: "7",
    name: "Tete",
    districts: [
      "Tete", "Moatize", "Cahora Bassa", "Zumbo", "Magoe", "Maravia", 
      "Tsangano", "Changara", "Mutarara", "Dôa", "Chiúta", "Marávia", 
      "Macanga", "Angónia", "Chifunde"
    ]
  },
  {
    id: "8",
    name: "Zambézia",
    districts: [
      "Quelimane", "Mocuba", "Gurué", "Milange", "Alto Molócuè", 
      "Lugela", "Namarrói", "Ile", "Nicoadala", "Inhassunge", "Maganja da Costa", 
      "Namacurra", "Chinde", "Morrumbala", "Luabo", "Mopeia", "Pebane"
    ]
  },
  {
    id: "9",
    name: "Nampula",
    districts: [
      "Nampula", "Nacala", "Angoche", "Ilha de Moçambique", "Monapo", 
      "Mossuril", "Memba", "Erati", "Lalaua", "Ribaué", "Malema", 
      "Murrupula", "Mecubúri", "Muecate", "Mogincual", "Moma", 
      "Nacarôa", "Rapale", "Larde", "Mogovolas", "Meconta"
    ]
  },
  {
    id: "10",
    name: "Cabo Delgado",
    districts: [
      "Pemba", "Montepuez", "Chiúre", "Ancuabe", "Balama", "Namuno", 
      "Mueda", "Muidumbe", "Nangade", "Palma", "Mocímboa da Praia", 
      "Macomia", "Quissanga", "Ibo", "Meluco"
    ]
  },
  {
    id: "11",
    name: "Niassa",
    districts: [
      "Lichinga", "Cuamba", "Mandimba", "Ngauma", "Sanga", "Lago", 
      "Chimbonila", "Maúa", "Mavago", "Muembe", "N'gauma", "Majune", 
      "Metarica", "Marrupa", "Mecanhelas"
    ]
  }
];

// Dados simulados de serviços
export const mockServices: Service[] = [
  {
    id: "1",
    name: "Salão Beleza Africana",
    description: "Especialistas em penteados tradicionais, tranças, cortes modernos e tratamentos capilares para todos os tipos de cabelo.",
    category: "cabeleireiros",
    province: "Maputo Cidade",
    location: "Polana",
    whatsapp: "258844123456",
    images: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1974"],
    featured: true,
    approved: true,
    createdAt: new Date("2023-05-15"),
    userId: "user1"
  },
  {
    id: "2",
    name: "Moto Rápida Maputo",
    description: "Serviços de mototáxi 24h em toda cidade de Maputo. Rápido, seguro e confiável.",
    category: "transporte",
    province: "Maputo Cidade",
    location: "Baixa",
    whatsapp: "258823456789",
    images: ["https://images.unsplash.com/photo-1611279290747-744d299dde51?auto=format&fit=crop&q=80&w=2071"],
    featured: true,
    approved: true,
    createdAt: new Date("2023-06-10"),
    userId: "user2"
  },
  {
    id: "3",
    name: "Casa dos Móveis",
    description: "Móveis sob medida, camas, mesas, cadeiras, armários. Carpintaria de qualidade com madeira local.",
    category: "carpintaria",
    province: "Maputo Cidade",
    location: "Maxaquene",
    whatsapp: "258834567890",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=2058"],
    featured: false,
    approved: true,
    createdAt: new Date("2023-06-22"),
    userId: "user3"
  },
  {
    id: "4",
    name: "Imobiliária Maputo Prime",
    description: "Venda e arrendamento de casas, apartamentos e terrenos em Maputo e arredores.",
    category: "imobiliaria",
    province: "Maputo Cidade",
    location: "Sommerschield",
    whatsapp: "258845678901",
    images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1973"],
    featured: true,
    approved: true,
    createdAt: new Date("2023-07-05"),
    userId: "user4"
  },
  {
    id: "5",
    name: "Auto Stand Beira",
    description: "Venda de carros usados e novos. Financiamento disponível. Garantia em todos os veículos.",
    category: "carros",
    province: "Sofala",
    location: "Beira",
    whatsapp: "258856789012",
    images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1966"],
    featured: false,
    approved: true,
    createdAt: new Date("2023-07-18"),
    userId: "user5"
  },
  {
    id: "6",
    name: "Sabores de Moçambique",
    description: "Comida tradicional moçambicana, caril de caranguejo, matapa, xima com frango. Entregas ao domicílio.",
    category: "comidas",
    province: "Maputo Cidade",
    location: "Mafalala",
    whatsapp: "258867890123",
    images: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070"],
    featured: true,
    approved: true,
    createdAt: new Date("2023-08-01"),
    userId: "user6"
  }
];

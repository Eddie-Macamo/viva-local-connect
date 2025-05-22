
export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  whatsapp: string;
  images: string[];
  featured: boolean;
  approved: boolean;
  createdAt: Date;
}

export interface ServiceFormData {
  name: string;
  description: string;
  category: string;
  location: string;
  whatsapp: string;
  images: File[];
  featured: boolean;
}

export interface PaymentInfo {
  serviceId: string;
  paymentMethod: 'mpesa' | 'paypal';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  receipt?: string;
}

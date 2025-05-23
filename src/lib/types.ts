
export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface Province {
  id: string;
  name: string;
  districts: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  province: string;
  location: string;
  whatsapp: string;
  images: string[];
  featured: boolean;
  approved: boolean;
  createdAt: Date;
  userId: string;
}

export interface ServiceFormData {
  name: string;
  description: string;
  category: string;
  province: string;
  location: string;
  whatsapp: string;
  images: File[];
  featured: boolean;
}

export interface PaymentInfo {
  serviceId: string;
  paymentMethod: 'mpesa' | 'emola';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  receipt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscriptionStatus: 'active' | 'expired' | 'pending';
  subscriptionExpiry: Date;
  createdAt: Date;
}

export interface UserSubscription {
  userId: string;
  paymentMethod: 'mpesa' | 'emola';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  receipt?: string;
  expiryDate: Date;
  createdAt: Date;
}

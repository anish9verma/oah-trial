export interface Address {
  zipCode: string;
  city: string;
  state: string;
  formatted: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  priceRange: string;
  imageUrl: string;
  category: string;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  rating: number;
  specialties: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  providerId?: string;
}

export interface BookingData {
  address?: Address;
  service?: Service;
  date?: string;
  time?: string;
  provider?: Provider;
  guestInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface BookingStep {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}
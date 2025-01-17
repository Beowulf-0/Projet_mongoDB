export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'client' | 'admin';
  createdAt: string;
}

export interface Offer {
  _id: string;
  type: 'accommodation' | 'activity' | 'transport';
  title: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  availability: {
    startDate: string;
    endDate: string;
  };
  createdAt: string;
}

export interface Reservation {
  _id: string;
  userId: string;
  offerId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
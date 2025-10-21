export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'USER' | 'ADMIN' | 'SELLER';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface CartItem {
  id: string;
  productId: string;
  product: {
    id: string;
    title: string;
    price: number;
    salePrice?: number;
    images: Array<{ url: string; altText: string }>;
  };
  quantity: number;
  priceSnapshot: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  profile: User | null;
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  quantity: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  brand?: string;
  ratingAvg: number;
  ratingCount: number;
  images: Array<{
    id: string;
    url: string;
    altText: string;
    orderIndex: number;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  priceSnapshot: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Remove the circular dependency by defining RootState directly
export type RootState = {
  auth: AuthState;
  cart: CartState;
  user: UserState;
};

export type AppDispatch = typeof import('./index').store.dispatch;
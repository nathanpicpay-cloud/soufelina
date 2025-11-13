

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  sizes: string[];
  rating?: number;
  category: 'vestido' | 'blusa' | 'saia' | 'conjunto' | 'macacao' | 'calca' | 'blazer' | 'body' | 'jaqueta';
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
  cartItemId: string; // Unique identifier for product-size combination, e.g., "1-M"
}

export interface Collection {
  id: number;
  name: string;
  imageUrl: string;
}

export interface InstagramPost {
    id: number;
    imageUrl: string;
}

export interface Coupon {
  id: number;
  code: string;
  discountPercentage: number;
  status: 'active' | 'inactive';
  createdAt: string; // ISO Date string
  expiresAt: string | null; // ISO Date string or null
}
import type { Product, Collection, InstagramPost, Coupon } from './types';

const defaultDescription = "Descubra a peça perfeita que combina elegância e conforto. Feita com tecidos de alta qualidade, esta peça oferece um caimento impecável e um toque suave na pele. Ideal para compor looks sofisticados e modernos, seja para o dia a dia ou para ocasiões especiais. Renove seu guarda-roupa com o estilo único da Sou Felina.";

export const initialProducts: Product[] = [
  { id: 11, name: 'Vestido Longo Rosa de Verão', price: 289.90, imageUrl: 'https://storage.googleapis.com/aistudio-hosting/2024-8-1/8d60c497-6a6d-4952-b91b-9f931d8e69ac.webp', sizes: ['P', 'M', 'G'], rating: 5, category: 'vestido', description: defaultDescription },
  { id: 1, name: 'Vestido Midi Rosa com Laço', price: 299.90, imageUrl: 'https://storage.googleapis.com/aistudio-hosting/2024-8-1/8d60c497-6a6d-4952-b91b-9f931d8e69ac.webp', sizes: ['P', 'M', 'G'], category: 'vestido', description: defaultDescription },
  { id: 2, name: 'Blusa de Seda Nude', price: 189.90, imageUrl: 'https://images.unsplash.com/photo-1581044777550-4cfa6ce7782a?w=400&h=500&fit=crop&q=80', sizes: ['P', 'M', 'G'], category: 'blusa', description: defaultDescription },
  { id: 3, name: 'Saia Plissada Rosé', price: 220.50, imageUrl: 'https://images.unsplash.com/photo-1594618335989-b15b3c54c03a?w=400&h=500&fit=crop&q=80', sizes: ['P', 'M'], category: 'saia', description: defaultDescription },
  { id: 4, name: 'Conjunto de Linho Bege', price: 350.00, imageUrl: 'https://images.unsplash.com/photo-1617137968427-4dd474f33979?w=400&h=500&fit=crop&q=80', sizes: ['P', 'M', 'G'], category: 'conjunto', description: defaultDescription },
  { id: 5, name: 'Macacão Pantalona', price: 320.00, imageUrl: 'https://images.unsplash.com/photo-1596756239103-3158f0f0443c?w=400&h=500&fit=crop&q=80', sizes: ['M', 'G'], category: 'macacao', description: defaultDescription },
  { id: 6, name: 'Vestido Curto de Festa', price: 199.90, oldPrice: 289.90, imageUrl: 'https://images.unsplash.com/photo-1590334860467-33291079e0ab?w=400&h=500&fit=crop&q=80', sizes: ['P', 'M'], rating: 5, category: 'vestido', description: defaultDescription },
  { id: 7, name: 'Calça Alfaiataria Branca', price: 150.00, oldPrice: 250.00, imageUrl: 'https://images.unsplash.com/photo-1551803091-e25622d22262?w=400&h=500&fit=crop&q=80', sizes: ['P', 'M', 'G'], rating: 4, category: 'calca', description: defaultDescription },
  { id: 8, name: 'Blazer Alongado Preto', price: 280.00, oldPrice: 399.90, imageUrl: 'https://images.unsplash.com/photo-1572113462002-3e521feb08a7?w=400&h=500&fit=crop&q=80', sizes: ['G'], rating: 5, category: 'blazer', description: defaultDescription },
  { id: 9, name: 'Body de Renda', price: 99.90, oldPrice: 159.90, imageUrl: 'https://images.unsplash.com/photo-1614441595189-e887a71a0a5e?w=400&h=500&fit=crop&q=80', sizes: ['P', 'M'], rating: 4, category: 'body', description: defaultDescription },
  { id: 10, name: 'Jaqueta Jeans Clássica', price: 180.00, oldPrice: 260.00, imageUrl: 'https://images.unsplash.com/photo-1543087904-7431e5adaea6?w=400&h=500&fit=crop&q=80', sizes: ['P', 'M', 'G'], rating: 5, category: 'jaqueta', description: defaultDescription },
];

export const initialCollections: Collection[] = [
  { id: 1, name: 'Blusas', imageUrl: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b939?w=600&h=800&fit=crop&q=80' },
  { id: 2, name: 'Vestidos', imageUrl: 'https://images.unsplash.com/photo-1595965785399-2778385f0610?w=600&h=800&fit=crop&q=80' },
  { id: 3, name: 'Conjuntos', imageUrl: 'https://images.unsplash.com/photo-1627850993952-f4142c12579b?w=600&h=800&fit=crop&q=80' },
];

export const initialInstagramPosts: InstagramPost[] = [
  { id: 1, imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f3?w=500&h=500&fit=crop&q=80' },
  { id: 2, imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=500&fit=crop&q=80' },
  { id: 3, imageUrl: 'https://images.unsplash.com/photo-1581044777550-4cfa6ce7782a?w=500&h=500&fit=crop&q=80' },
  { id: 4, imageUrl: 'https://images.unsplash.com/photo-1611042553365-96c81f725a3a?w=500&h=500&fit=crop&q=80' },
  { id: 5, imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=500&fit=crop&q=80' },
  { id: 6, imageUrl: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&h=500&fit=crop&q=80' },
  { id: 7, imageUrl: 'https://images.unsplash.com/photo-160321769163-255829658254?w=500&h=500&fit=crop&q=80'},
  { id: 8, imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=500&fit=crop&q=80'},
];

export const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: 'BEMVINDA10',
    discountPercentage: 10,
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    expiresAt: null,
  },
  {
    id: 2,
    code: 'INVERNO24',
    discountPercentage: 10,
    status: 'active',
    createdAt: '2024-07-01T00:00:00.000Z',
    expiresAt: '2024-08-31T23:59:59.000Z',
  },
  {
    id: 3,
    code: 'EXPIRADO',
    discountPercentage: 10,
    status: 'active',
    createdAt: '2023-01-01T00:00:00.000Z',
    expiresAt: '2023-01-31T23:59:59.000Z',
  },
  {
    id: 4,
    code: 'INATIVO',
    discountPercentage: 10,
    status: 'inactive',
    createdAt: '2024-01-01T00:00:00.000Z',
    expiresAt: null,
  }
];
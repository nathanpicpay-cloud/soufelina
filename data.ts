import type { Product, Collection, InstagramPost, Coupon } from './types';

const defaultDescription = "Desenvolvido para oferecer máxima performance e estilo nos seus treinos. Com tecido tecnológico de alta compressão e respirabilidade, esta peça se ajusta perfeitamente ao corpo, garantindo liberdade de movimento e conforto. Ideal para musculação, yoga, corrida ou uso casual.";

// Helper para garantir URLs consistentes e evitar bugs visuais
const getProductImage = (id: string) => `https://images.unsplash.com/${id}?w=500&h=650&fit=crop&q=80`;
const getCollectionImage = (id: string) => `https://images.unsplash.com/${id}?w=600&h=800&fit=crop&q=80`;
const getInstaImage = (id: string) => `https://images.unsplash.com/${id}?w=500&h=500&fit=crop&q=80`;

export const initialProducts: Product[] = [
  { 
    id: 1, 
    name: 'Conjunto Energy Rosa', 
    price: 249.90, 
    imageUrl: getProductImage('photo-1518310383802-640c2de311b2'), // Mulher fitness correndo/treinando
    sizes: ['P', 'M', 'G'], 
    rating: 5, 
    category: 'conjunto', 
    description: defaultDescription 
  },
  { 
    id: 2, 
    name: 'Legging Alta Performance', 
    price: 129.90, 
    imageUrl: getProductImage('photo-1506619216599-9d16d0903dfd'), // Yoga/Legging
    sizes: ['P', 'M', 'G', 'GG'], 
    category: 'legging', 
    description: defaultDescription 
  },
  { 
    id: 3, 
    name: 'Top Suporte Max Azul', 
    price: 89.90, 
    imageUrl: getProductImage('photo-1620799140408-ed5341cd2431'), // Top esportivo
    sizes: ['P', 'M', 'G'], 
    category: 'top', 
    description: defaultDescription 
  },
  { 
    id: 4, 
    name: 'Short Corrida Leve', 
    price: 79.90, 
    imageUrl: getProductImage('photo-1534438327276-14e5300c3a48'), // Academia/Short
    sizes: ['P', 'M', 'G'], 
    category: 'short', 
    description: defaultDescription 
  },
  { 
    id: 5, 
    name: 'Macacão Fitness Costas Nua', 
    price: 289.90, 
    imageUrl: getProductImage('photo-1605296867304-46d5465a13f1'), // Mulher treinando
    sizes: ['M', 'G'], 
    category: 'macacao', 
    description: defaultDescription 
  },
  { 
    id: 6, 
    name: 'Camiseta Dry Fit Branca', 
    price: 69.90, 
    oldPrice: 99.90, 
    imageUrl: getProductImage('photo-1518459031867-a89b944bffe4'), // Mulher correndo
    sizes: ['P', 'M', 'G'], 
    rating: 5, 
    category: 'camiseta', 
    description: defaultDescription 
  },
  { 
    id: 7, 
    name: 'Jaqueta Corta Vento Neon', 
    price: 199.90, 
    oldPrice: 259.90, 
    imageUrl: getProductImage('photo-1552374196-1ab2a1c593e8'), // Roupa fitness urbana
    sizes: ['P', 'M', 'G'], 
    rating: 4, 
    category: 'jaqueta', 
    description: defaultDescription 
  },
  { 
    id: 8, 
    name: 'Top Cropped Manga Longa', 
    price: 119.90, 
    imageUrl: getProductImage('photo-1571731956672-f2b94d7dd0cb'), // Yoga pose
    sizes: ['P', 'M', 'G'], 
    rating: 5, 
    category: 'top', 
    description: defaultDescription 
  },
  { 
    id: 9, 
    name: 'Legging Estampada Abstrata', 
    price: 149.90, 
    oldPrice: 189.90, 
    imageUrl: getProductImage('photo-1545167622-3a6ac756afa4'), // Detalhe legging
    sizes: ['P', 'M'], 
    rating: 4, 
    category: 'legging', 
    description: defaultDescription 
  },
  { 
    id: 10, 
    name: 'Kit Faixas Elásticas', 
    price: 49.90, 
    imageUrl: getProductImage('photo-1598971861713-54ad16a7e72e'), // Acessórios academia
    sizes: ['U'], 
    rating: 5, 
    category: 'acessorios', 
    description: defaultDescription 
  },
  { 
    id: 11, 
    name: 'Conjunto Yoga Zen', 
    price: 229.90, 
    imageUrl: getProductImage('photo-1599058945522-28d584b6f0ff'), // Yoga pose
    sizes: ['P', 'M', 'G'], 
    rating: 5, 
    category: 'conjunto', 
    description: defaultDescription 
  },
];

export const initialCollections: Collection[] = [
  { id: 1, name: 'Treino de Força', imageUrl: getCollectionImage('photo-1583454110551-21f2fa2afe61') },
  { id: 2, name: 'Yoga & Pilates', imageUrl: getCollectionImage('photo-1544367563-12123d8965cd') },
  { id: 3, name: 'Cardio & Corrida', imageUrl: getCollectionImage('photo-1486218119243-1388350add37') },
];

export const initialInstagramPosts: InstagramPost[] = [
  { id: 1, imageUrl: getInstaImage('photo-1571019613454-1cb2f99b2d8b') }, // Abs
  { id: 2, imageUrl: getInstaImage('photo-1517836357463-d25dfeac3438') }, // Gym vibe
  { id: 3, imageUrl: getInstaImage('photo-1574680096145-d05b474e2155') }, // Fitness
  { id: 4, imageUrl: getInstaImage('photo-1552196563-55cd4e45efb3') }, // Yoga
  { id: 5, imageUrl: getInstaImage('photo-1434682881908-b43d0467b798') }, // Running
  { id: 6, imageUrl: getInstaImage('photo-1609605988071-0d1cfd25044e') }, // Stretching
  { id: 7, imageUrl: getInstaImage('photo-1599058945522-28d584b6f0ff') }, // Yoga
  { id: 8, imageUrl: getInstaImage('photo-1583454110551-21f2fa2afe61') }, // Weights
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
    code: 'FITNESS24',
    discountPercentage: 15,
    status: 'active',
    createdAt: '2024-07-01T00:00:00.000Z',
    expiresAt: '2024-08-31T23:59:59.000Z',
  },
  {
    id: 3,
    code: 'VERAO20',
    discountPercentage: 20,
    status: 'inactive',
    createdAt: '2023-01-01T00:00:00.000Z',
    expiresAt: '2023-01-31T23:59:59.000Z',
  },
  {
    id: 4,
    code: 'TREINO10',
    discountPercentage: 10,
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    expiresAt: null,
  }
];
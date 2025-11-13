import React, { useRef } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  id: string;
  title: string;
  products: Product[];
  isSale?: boolean;
}

const ChevronLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);


export const ProductCarousel: React.FC<ProductCarouselProps> = ({ id, title, products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-text-dark tracking-wider">{title}</h2>
            <div className="hidden md:flex items-center space-x-3">
                <button onClick={() => scroll('left')} className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white text-text-dark transition-colors duration-300">
                    <ChevronLeftIcon />
                </button>
                <button onClick={() => scroll('right')} className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white text-text-dark transition-colors duration-300">
                    <ChevronRightIcon />
                </button>
            </div>
        </div>
        <div ref={scrollRef} className="flex space-x-8 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-hide">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
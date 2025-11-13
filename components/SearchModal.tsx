import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (query: string) => void;
  results: Product[];
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, query, onQueryChange, results }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col animate-fade-in-fast">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-playfair font-bold text-text-dark">Buscar Produtos</h2>
            <button onClick={onClose} className="text-text-dark hover:text-primary transition-colors"><CloseIcon /></button>
        </div>
        <div className="mt-8">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="O que você procura?"
            className="w-full text-2xl md:text-4xl bg-transparent border-b-2 border-text-dark/20 focus:border-primary focus:outline-none py-4 transition-colors placeholder:text-text-dark/60"
            autoFocus
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto py-8">
        <div className="container mx-auto px-6">
          {query && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {results.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {query && results.length === 0 && (
             <div className="text-center py-20">
                <p className="text-xl text-gray-500">Nenhum resultado encontrado para "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
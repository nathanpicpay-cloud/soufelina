import React from 'react';
import { useFavorites } from '../FavoritesContext';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../types';
import type { Page } from '../App';

interface FavoritesPageProps {
  allProducts: Product[];
  navigateTo: (page: Page) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ allProducts, navigateTo }) => {
    const { favoriteIds } = useFavorites();

    const favoriteProducts = allProducts.filter(product => favoriteIds.includes(product.id));

    return (
        <div className="container mx-auto px-6 py-16 min-h-[60vh]">
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-playfair font-bold text-text-dark">Meus Favoritos</h1>
                <p className="text-lg mt-3 text-text-dark/80">Seus produtos salvos para não perder de vista.</p>
            </div>
            
            {favoriteProducts.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {favoriteProducts.map(product => (
                        <div key={product.id} className="flex justify-center">
                             <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                    </svg>
                    <p className="text-xl text-gray-500">Você ainda não tem favoritos.</p>
                    <p className="text-md text-gray-400 mt-2">Clique no coração dos produtos para salvá-los aqui.</p>
                    <button onClick={() => navigateTo('shop')} className="mt-8 bg-primary text-white font-semibold py-3 px-8 rounded-full hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg">
                        Ver Produtos
                    </button>
                </div>
            )}
        </div>
    );
};
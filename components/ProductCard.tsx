import React, { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../CartContext';
import { useFavorites } from '../FavoritesContext';

interface ProductCardProps {
  product: Product;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-primary' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const HeartIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);


export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    if(selectedSize) {
      addToCart(product, selectedSize);
      setSelectedSize(null);
    }
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(product.id);
  }

  return (
    <div className="group flex-shrink-0 w-full bg-white rounded-lg overflow-hidden snap-start shadow-md hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        {product.oldPrice && <span className="absolute top-4 left-4 bg-accent text-white text-xs font-bold py-1 px-3 rounded-full">SALE</span>}
         <button 
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${isFavorite(product.id) ? 'text-primary bg-white/80 scale-110' : 'text-white bg-black/30 hover:bg-primary hover:text-white'}`}
            aria-label="Adicionar aos Favoritos"
        >
            <HeartIcon filled={isFavorite(product.id)} />
        </button>
      </div>
      <div className="p-5 text-center flex-grow flex flex-col">
        <h3 className="text-lg font-medium text-text-dark truncate">{product.name}</h3>
         <div className="mt-2 flex justify-center items-center gap-2 h-9">
            {product.sizes.map(size => (
                <button 
                  key={size} 
                  onClick={() => setSelectedSize(size)}
                  className={`text-sm font-medium border rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200 ${selectedSize === size ? 'bg-primary text-white border-primary' : 'bg-white text-text-dark/80 border-gray-200 hover:border-primary'}`}>
                    {size}
                </button>
            ))}
        </div>
        <div className="flex items-baseline justify-center space-x-2 mt-3">
          {product.oldPrice && (
            <p className="text-sm text-gray-500 line-through">
              R${product.oldPrice.toFixed(2).replace('.', ',')}
            </p>
          )}
          <p className="text-lg font-semibold text-text-dark">
            R${product.price.toFixed(2).replace('.', ',')}
          </p>
        </div>
        {product.rating && (
            <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < product.rating!} />
                ))}
            </div>
        )}
        <div className="mt-auto pt-4">
             <button 
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform disabled:transform-none disabled:shadow-none disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-accent text-white hover:bg-primary hover:scale-105">
                {selectedSize ? 'Adicionar ao Carrinho' : 'Selecione um Tamanho'}
            </button>
        </div>
      </div>
    </div>
  );
};
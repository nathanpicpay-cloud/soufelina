import React from 'react';
import type { Collection } from '../types';

interface CollectionsProps {
  id: string;
  collections: Collection[];
  navigateTo: (page: 'shop') => void;
}

export const Collections: React.FC<CollectionsProps> = ({ id, collections, navigateTo }) => {
  return (
    <section id={id} className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-text-dark mb-12">Nossas Coleções</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map(collection => (
            <div key={collection.id} className="relative group rounded-lg overflow-hidden shadow-lg h-[28rem]">
              <img src={collection.imageUrl} alt={collection.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
                <h3 className="font-playfair text-4xl text-white font-bold drop-shadow-md mb-4">{collection.name}</h3>
                <button 
                  onClick={() => navigateTo('shop')}
                  className="bg-accent text-white font-semibold py-2 px-8 rounded-full hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg">
                  Ver coleção
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
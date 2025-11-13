import React from 'react';
import { PriceRange } from './PriceRange';
import type { Product } from '../types';

interface FilterPanelProps {
    filters: {
        categories: string[];
        sizes: string[];
        price: number;
    };
    onCategoryChange: (category: string) => void;
    onSizeChange: (size: string) => void;
    onPriceChange: (price: number) => void;
    onClearFilters: () => void;
    allCategories: { key: Product['category']; name: string }[];
    allSizes: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
    filters,
    onCategoryChange,
    onSizeChange,
    onPriceChange,
    onClearFilters,
    allCategories,
    allSizes
}) => {
    return (
        <div>
            <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-xl font-bold font-playfair">Filtros</h2>
                <button onClick={onClearFilters} className="text-sm text-primary hover:text-accent">Limpar</button>
            </div>
            
            {/* Categories */}
            <div className="mb-8 border-b pb-8">
                <h3 className="font-semibold mb-3">Categorias</h3>
                <div className="space-y-2">
                    {allCategories.map(cat => (
                        <label key={cat.key} className="flex items-center">
                            <input type="checkbox" checked={filters.categories.includes(cat.key)} onChange={() => onCategoryChange(cat.key)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                            <span className="ml-2 text-text-dark/90">{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

             {/* Sizes */}
            <div className="mb-8 border-b pb-8">
                <h3 className="font-semibold mb-3">Tamanhos</h3>
                <div className="flex gap-2 flex-wrap">
                     {allSizes.map(size => (
                        <button key={size} onClick={() => onSizeChange(size)} className={`text-sm font-medium border rounded-full w-9 h-9 flex items-center justify-center transition-colors ${filters.sizes.includes(size) ? 'bg-primary text-white border-primary' : 'bg-white text-text-dark/80 border-gray-200 hover:border-primary'}`}>{size}</button>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div>
                <h3 className="font-semibold mb-3">Preço</h3>
                <PriceRange 
                    min={50} 
                    max={500} 
                    value={filters.price} 
                    onChange={onPriceChange} 
                />
            </div>
        </div>
    );
};
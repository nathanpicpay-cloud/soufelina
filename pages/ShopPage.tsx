import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { FilterPanel } from '../components/FilterPanel';
import { FilterDrawer } from '../components/FilterDrawer';
import type { Product } from '../types';

interface ShopPageProps {
  allProducts: Product[];
}

const ALL_SIZES = ['P', 'M', 'G', 'GG', 'U'];
const ALL_CATEGORIES: { key: Product['category']; name: string }[] = [
    { key: 'legging', name: 'Leggings' },
    { key: 'top', name: 'Tops' },
    { key: 'short', name: 'Shorts' },
    { key: 'conjunto', name: 'Conjuntos' },
    { key: 'macacao', name: 'Macacões' },
    { key: 'camiseta', name: 'Camisetas' },
    { key: 'jaqueta', name: 'Jaquetas' },
    { key: 'acessorios', name: 'Acessórios' },
];

const FilterIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 12h10M10 20h4" />
    </svg>
);


export const ShopPage: React.FC<ShopPageProps> = ({ allProducts }) => {
    const [filters, setFilters] = useState({
        categories: [] as string[],
        sizes: [] as string[],
        price: 500,
    });
    const [sort, setSort] = useState('default');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleCategoryChange = (category: string) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleSizeChange = (size: string) => {
        setFilters(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };
    
    const handlePriceChange = (price: number) => {
        setFilters(prev => ({...prev, price: price}))
    }

    const clearFilters = () => {
        setFilters({ categories: [], sizes: [], price: 500 });
        setSort('default');
    }

    const filteredAndSortedProducts = useMemo(() => {
        let result = allProducts.filter(product => {
            const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
            const sizeMatch = filters.sizes.length === 0 || product.sizes.some(s => filters.sizes.includes(s));
            const priceMatch = product.price <= filters.price;
            return categoryMatch && sizeMatch && priceMatch;
        });

        switch (sort) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        return result;
    }, [allProducts, filters, sort]);

  return (
    <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-text-dark">Loja Fitness</h1>
            <p className="text-lg mt-3 text-text-dark/80">Descubra a performance e estilo em cada peça.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
            {/* Filters - Desktop Sidebar */}
            <aside className="w-full lg:w-1/4 hidden lg:block">
                <div className="sticky top-28">
                    <FilterPanel 
                        filters={filters}
                        onCategoryChange={handleCategoryChange}
                        onSizeChange={handleSizeChange}
                        onPriceChange={handlePriceChange}
                        onClearFilters={clearFilters}
                        allCategories={ALL_CATEGORIES}
                        allSizes={ALL_SIZES}
                    />
                </div>
            </aside>
            
             {/* Filters - Mobile Drawer */}
            <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
                <FilterPanel 
                    filters={filters}
                    onCategoryChange={handleCategoryChange}
                    onSizeChange={handleSizeChange}
                    onPriceChange={handlePriceChange}
                    onClearFilters={clearFilters}
                    allCategories={ALL_CATEGORIES}
                    allSizes={ALL_SIZES}
                />
            </FilterDrawer>

            {/* Products Grid */}
            <main className="w-full lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                    <div className="lg:hidden">
                        <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 text-sm font-semibold py-2 px-4 bg-white border rounded-full shadow-sm">
                            <FilterIcon />
                            Filtrar
                        </button>
                    </div>
                    <p className="text-sm text-text-dark/80 hidden sm:block">{filteredAndSortedProducts.length} produtos encontrados</p>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary text-sm">
                        <option value="default">Ordenar por</option>
                        <option value="price-asc">Menor Preço</option>
                        <option value="price-desc">Maior Preço</option>
                    </select>
                </div>
                 {filteredAndSortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                        {filteredAndSortedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                 ) : (
                    <div className="text-center py-20">
                         <p className="text-xl text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
                    </div>
                 )}

            </main>
        </div>
    </div>
  );
};
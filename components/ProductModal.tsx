import React, { useState, useEffect } from 'react';
import type { Product } from '../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  product: Product | null;
}

const ALL_SIZES = ['P', 'M', 'G', 'GG', 'U'];
const ALL_CATEGORIES: { key: Product['category']; name: string }[] = [
    { key: 'legging', name: 'Legging' },
    { key: 'top', name: 'Top' },
    { key: 'short', name: 'Short' },
    { key: 'conjunto', name: 'Conjunto' },
    { key: 'macacao', name: 'Macacão' },
    { key: 'camiseta', name: 'Camiseta' },
    { key: 'jaqueta', name: 'Jaqueta' },
    { key: 'acessorios', name: 'Acessórios' },
];

const initialFormState: Omit<Product, 'id'> = {
  name: '',
  price: 0,
  oldPrice: undefined,
  imageUrl: '',
  sizes: [],
  category: 'legging',
  description: '',
  rating: undefined,
};

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        imageUrl: product.imageUrl,
        sizes: product.sizes,
        category: product.category,
        description: product.description,
        rating: product.rating,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumber ? (value ? parseFloat(value) : undefined) : value }));
  };

  const handleSizeChange = (size: string) => {
    setFormData(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      onSave({ ...formData, id: product.id });
    } else {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="text-2xl font-playfair font-bold text-text-dark">{product ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
            <button onClick={onClose} className="text-text-dark/70 hover:text-primary transition-colors"><CloseIcon /></button>
          </div>
          <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full form-input" />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full form-input">
                  {ALL_CATEGORIES.map(cat => <option key={cat.key} value={cat.key}>{cat.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                    <input type="number" step="0.01" id="price" name="price" value={formData.price} onChange={handleChange} required className="w-full form-input" />
                 </div>
                 <div>
                    <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700 mb-1">Preço Antigo (Opcional)</label>
                    <input type="number" step="0.01" id="oldPrice" name="oldPrice" value={formData.oldPrice || ''} onChange={handleChange} className="w-full form-input" />
                 </div>
                 <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Avaliação (1-5, Opcional)</label>
                    <input type="number" min="1" max="5" id="rating" name="rating" value={formData.rating || ''} onChange={handleChange} className="w-full form-input" />
                 </div>
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full form-input" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required className="w-full form-input"></textarea>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-2">Tamanhos Disponíveis</h3>
              <div className="flex gap-3 flex-wrap">
                {ALL_SIZES.map(size => (
                  <label key={size} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.sizes.includes(size)} onChange={() => handleSizeChange(size)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="text-text-dark/90">{size}</span>
                  </label>
                ))}
              </div>
            </div>
            <style>{`.form-input { display: block; width: 100%; padding: 0.75rem 1rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); outline: none; transition: all 0.2s; } .form-input:focus { border-color: #4A90E2; box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5); }`}</style>
          </form>
          <div className="flex justify-end items-center p-5 border-t gap-4">
            <button onClick={onClose} className="py-2 px-6 rounded-full border border-gray-300 text-text-dark font-semibold hover:bg-gray-100 transition-colors">Cancelar</button>
            <button type="button" onClick={handleSubmit} className="py-2 px-6 rounded-full bg-accent text-white font-semibold hover:bg-primary transition-colors">Salvar Produto</button>
          </div>
        </div>
      </div>
    </>
  );
};
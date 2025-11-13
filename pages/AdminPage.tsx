import React, { useState } from 'react';
import type { Coupon, Product, Collection } from '../types';
import { ProductModal } from '../components/ProductModal';

// --- SVG Icons for Admin Panel ---
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ProductIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const CouponIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>;
const CollectionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;

// --- Type Definitions for AdminPage ---

type AdminTab = 'dashboard' | 'products' | 'collections' | 'coupons';

interface AdminPageProps {
  products: Product[];
  onAddProduct: (newProduct: Omit<Product, 'id'>) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: number) => void;

  collections: Collection[];
  onAddCollection: (newCollection: Omit<Collection, 'id'>) => void;
  onUpdateCollection: (updatedCollection: Collection) => void;
  onDeleteCollection: (collectionId: number) => void;

  coupons: Coupon[];
  onAddCoupon: (newCoupon: { code: string; expiresAt: string | null }) => void;
  onUpdateCouponStatus: (couponId: number, status: 'active' | 'inactive') => void;
  onDeleteCoupon: (couponId: number) => void;
}

// --- Main AdminPage Component ---

export const AdminPage: React.FC<AdminPageProps> = (props) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  
  // State for the product modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Handlers for product modal
  const handleOpenAddProductModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setEditingProduct(null); // Reset after closing
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) {
      props.onUpdateProduct(productData);
    } else {
      props.onAddProduct(productData);
    }
    handleCloseProductModal();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard products={props.products} coupons={props.coupons} collections={props.collections} />;
      case 'products':
        return (
          <ProductManagement 
            products={props.products} 
            onDelete={props.onDeleteProduct} 
            onAddClick={handleOpenAddProductModal}
            onEditClick={handleOpenEditProductModal}
          />
        );
      case 'collections':
        return <CollectionManagement collections={props.collections} onAdd={props.onAddCollection} onUpdate={props.onUpdateCollection} onDelete={props.onDeleteCollection} />;
      case 'coupons':
        return <CouponManagement coupons={props.coupons} onAdd={props.onAddCoupon} onUpdateStatus={props.onUpdateCouponStatus} onDelete={props.onDeleteCoupon} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 sm:p-10">
          {renderContent()}
        </main>
      </div>
       <ProductModal 
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
};

// --- Sub-components for Admin Panel ---

const AdminSidebar: React.FC<{ activeTab: AdminTab; setActiveTab: (tab: AdminTab) => void; }> = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
        { id: 'products', icon: <ProductIcon />, label: 'Produtos' },
        { id: 'collections', icon: <CollectionIcon />, label: 'Coleções' },
        { id: 'coupons', icon: <CouponIcon />, label: 'Cupons' },
    ] as const;

    return (
        <aside className="w-64 bg-footer-bg text-white/80 flex flex-col min-h-screen">
            <div className="p-6 border-b border-white/20">
                <h1 className="text-2xl font-playfair font-bold text-white">Sou Felina</h1>
                <span className="text-sm text-white/60">Painel Administrativo</span>
            </div>
            <nav className="flex-grow p-4">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-md text-left transition-colors ${activeTab === item.id ? 'bg-primary/80 text-white font-semibold' : 'hover:bg-white/10'}`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

const Dashboard: React.FC<{ products: Product[], coupons: Coupon[], collections: Collection[] }> = ({ products, coupons, collections }) => {
    const stats = [
        { label: 'Total de Produtos', value: products.length, icon: <ProductIcon /> },
        { label: 'Total de Coleções', value: collections.length, icon: <CollectionIcon /> },
        { label: 'Cupons Ativos', value: coupons.filter(c => c.status === 'active').length, icon: <CouponIcon /> },
    ];
    return (
        <div>
            <h1 className="text-3xl font-playfair font-bold text-text-dark mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map(stat => (
                    <div key={stat.label} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="text-3xl font-bold text-text-dark">{stat.value}</p>
                        </div>
                        <div className="text-primary">{stat.icon}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Product Management ---
const ProductManagement: React.FC<{ products: Product[], onDelete: (id: number) => void, onAddClick: () => void, onEditClick: (product: Product) => void }> = ({ products, onDelete, onAddClick, onEditClick }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-playfair font-bold text-text-dark">Gerenciar Produtos</h1>
                <button onClick={onAddClick} className="bg-accent text-white font-semibold py-2 px-4 rounded-full hover:bg-primary transition-colors flex items-center gap-2">
                    <PlusIcon /> Adicionar Produto
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                 <table className="w-full text-left min-w-[700px]">
                    <thead><tr className="border-b"><th className="p-3">Produto</th><th className="p-3">Preço</th><th className="p-3">Categoria</th><th className="p-3">Tamanhos</th><th className="p-3 text-right">Ações</th></tr></thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                <td className="p-3 flex items-center gap-3"><img src={p.imageUrl} alt={p.name} className="w-12 h-16 object-cover rounded-md" /> <span className="font-semibold">{p.name}</span></td>
                                <td className="p-3">R${p.price.toFixed(2).replace('.', ',')}</td>
                                <td className="p-3 capitalize">{p.category}</td>
                                <td className="p-3">{p.sizes.join(', ')}</td>
                                <td className="p-3 text-right space-x-2">
                                    <button onClick={() => onEditClick(p)} className="p-2 text-primary hover:text-accent"><EditIcon /></button>
                                    <button onClick={() => onDelete(p.id)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
};

// --- Collection Management ---
const CollectionManagement: React.FC<{ collections: Collection[], onAdd: any, onUpdate: any, onDelete: any }> = ({ collections, onAdd, onUpdate, onDelete }) => {
    const handleAddClick = () => {
        const newName = prompt("Nome da nova coleção:");
        const newImageUrl = prompt("URL da imagem da nova coleção:");
        if (newName && newImageUrl) {
            onAdd({ name: newName, imageUrl: newImageUrl });
        }
    };
    
    const handleEditClick = (collection: Collection) => {
        const updatedName = prompt("Novo nome da coleção:", collection.name);
        const updatedImageUrl = prompt("Nova URL da imagem:", collection.imageUrl);
        if (updatedName && updatedImageUrl) {
            onUpdate({ ...collection, name: updatedName, imageUrl: updatedImageUrl });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-playfair font-bold text-text-dark">Gerenciar Coleções</h1>
                <button onClick={handleAddClick} className="bg-accent text-white font-semibold py-2 px-4 rounded-full hover:bg-primary transition-colors flex items-center gap-2">
                    <PlusIcon /> Adicionar Coleção
                </button>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                 <table className="w-full text-left min-w-[500px]">
                    <thead><tr className="border-b"><th className="p-3">Coleção</th><th className="p-3 text-right">Ações</th></tr></thead>
                    <tbody>
                        {collections.map(c => (
                            <tr key={c.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                <td className="p-3 flex items-center gap-3"><img src={c.imageUrl} alt={c.name} className="w-12 h-16 object-cover rounded-md" /> <span className="font-semibold">{c.name}</span></td>
                                <td className="p-3 text-right space-x-2">
                                    <button onClick={() => handleEditClick(c)} className="p-2 text-primary hover:text-accent"><EditIcon /></button>
                                    <button onClick={() => onDelete(c.id)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
};


// --- Coupon Management ---
const CouponManagement: React.FC<{ coupons: Coupon[], onAdd: any, onUpdateStatus: any, onDelete: any }> = ({ coupons, onAdd, onUpdateStatus, onDelete }) => {
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponExpiry, setNewCouponExpiry] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCouponCode.trim()) {
      onAdd({ code: newCouponCode.trim().toUpperCase(), expiresAt: newCouponExpiry || null });
      setNewCouponCode('');
      setNewCouponExpiry('');
    }
  };

  return (
    <div>
        <h1 className="text-3xl font-playfair font-bold text-text-dark mb-8">Gerenciar Cupons</h1>
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-playfair font-semibold mb-6">Adicionar Novo Cupom</h2>
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1">
              <label htmlFor="coupon-code" className="block text-sm font-medium text-gray-700">Código do Cupom</label>
              <input type="text" id="coupon-code" value={newCouponCode} onChange={(e) => setNewCouponCode(e.target.value)} placeholder="EX: DESCONTO10" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="coupon-expiry" className="block text-sm font-medium text-gray-700">Data de Expiração (Opcional)</label>
              <input type="date" id="coupon-expiry" value={newCouponExpiry} onChange={(e) => setNewCouponExpiry(e.target.value)} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div className="md:col-span-1">
              <button type="submit" className="w-full justify-center py-3 px-4 border border-transparent rounded-full shadow-sm font-bold text-white bg-accent hover:bg-primary transition-colors">Adicionar</button>
            </div>
          </form>
           <p className="text-xs text-center text-gray-500 mt-2">Todos os cupons criados aplicam 10% de desconto.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-playfair font-semibold mb-6">Lista de Cupons</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b"><th className="p-3">Código</th><th className="p-3">Expira em</th><th className="p-3">Status</th><th className="p-3 text-right">Ações</th></tr>
              </thead>
              <tbody>
                {coupons.length > 0 ? [...coupons].sort((a,b) => b.id - a.id).map(coupon => (
                  <tr key={coupon.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-3 font-mono font-semibold">{coupon.code}</td>
                    <td className="p-3 text-sm text-gray-600">{coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : 'Nunca'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${coupon.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {coupon.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2 whitespace-nowrap">
                       <button onClick={() => onUpdateStatus(coupon.id, coupon.status === 'active' ? 'inactive' : 'active')} className="text-sm font-medium text-primary hover:text-accent">{coupon.status === 'active' ? 'Desativar' : 'Ativar'}</button>
                       <button onClick={() => onDelete(coupon.id)} className="text-sm font-medium text-red-600 hover:text-red-800">Excluir</button>
                    </td>
                  </tr>
                )) : (
                    <tr><td colSpan={5} className="text-center p-8 text-gray-500">Nenhum cupom cadastrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
};

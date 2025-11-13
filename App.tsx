import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';
import { ConfirmationModal } from './components/ConfirmationModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { LookbookPage } from './pages/LookbookPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AdminPage } from './pages/AdminPage';


import { initialProducts, initialCollections, initialInstagramPosts, initialCoupons } from './data';
import type { Product, Collection, Coupon } from './types';
import { useCart } from './CartContext';

export type Page = 'home' | 'shop' | 'lookbook' | 'contact' | 'checkout' | 'confirmation' | 'favorites' | 'admin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [lastOrderDetails, setLastOrderDetails] = useState<{ paymentMethod: string } | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // Dynamic Data State
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [instagramPosts] = useState(initialInstagramPosts); // Assuming IG posts are static for now

  const { isCartOpen, openCart, closeCart, clearCart } = useCart();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredProducts);
  }, [searchQuery, products]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleLogin = (email?: string, password?: string) => {
      if (email === 'admin@felina.com' && password === 'felina123') {
          setIsAdminLoggedIn(true);
          setIsLoggedIn(false);
          setIsLoginOpen(false);
          navigateTo('admin');
      } else {
          setIsAdminLoggedIn(false);
          setIsLoggedIn(true);
          setIsLoginOpen(false);
      }
  }

  const handleLogout = () => {
      setIsLoggedIn(false);
      setIsAdminLoggedIn(false);
      setIsLogoutConfirmOpen(false);
      navigateTo('home');
  }
  
  const handlePlaceOrder = (paymentMethod: string) => {
    setLastOrderDetails({ paymentMethod });
    clearCart();
    navigateTo('confirmation');
  };

  // --- CRUD Handlers for Admin Panel ---
  
  // Coupons
  const handleAddCoupon = (newCouponData: { code: string; expiresAt: string | null }) => {
      setCoupons(prev => [
          ...prev,
          {
              ...newCouponData,
              id: Date.now(),
              createdAt: new Date().toISOString(),
              status: 'active',
              discountPercentage: 10,
          }
      ]);
  };
  const handleUpdateCouponStatus = (couponId: number, status: 'active' | 'inactive') => {
      setCoupons(prev => prev.map(c => c.id === couponId ? { ...c, status } : c));
  };
  const handleDeleteCoupon = (couponId: number) => {
      setCoupons(prev => prev.filter(c => c.id !== couponId));
  };

  // Products
  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
      setProducts(prev => [{ ...newProduct, id: Date.now() }, ...prev]);
  };
  const handleUpdateProduct = (updatedProduct: Product) => {
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  const handleDeleteProduct = (productId: number) => {
      setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Collections
  const handleAddCollection = (newCollection: Omit<Collection, 'id'>) => {
    setCollections(prev => [{ ...newCollection, id: Date.now() }, ...prev]);
  };
  const handleUpdateCollection = (updatedCollection: Collection) => {
      setCollections(prev => prev.map(c => c.id === updatedCollection.id ? updatedCollection : c));
  };
  const handleDeleteCollection = (collectionId: number) => {
      setCollections(prev => prev.filter(c => c.id !== collectionId));
  };
  

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage allProducts={products} />;
      case 'lookbook':
        return <LookbookPage posts={instagramPosts} />;
      case 'contact':
        return <ContactPage />;
      case 'checkout':
        return <CheckoutPage handlePlaceOrder={handlePlaceOrder} navigateTo={navigateTo} allCoupons={coupons} />;
      case 'confirmation':
        return <OrderConfirmationPage navigateTo={navigateTo} lastOrderDetails={lastOrderDetails} />;
      case 'favorites':
        return <FavoritesPage allProducts={products} navigateTo={navigateTo} />;
      case 'admin':
        if (!isAdminLoggedIn) {
            return <HomePage
                products={products}
                collections={collections}
                instagramPosts={instagramPosts}
                navigateTo={navigateTo}
              />;
        }
        return <AdminPage 
            coupons={coupons} 
            onAddCoupon={handleAddCoupon}
            onUpdateCouponStatus={handleUpdateCouponStatus}
            onDeleteCoupon={handleDeleteCoupon}
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            collections={collections}
            onAddCollection={handleAddCollection}
            onUpdateCollection={handleUpdateCollection}
            onDeleteCollection={handleDeleteCollection}
        />;
      case 'home':
      default:
        return (
          <HomePage
            products={products}
            collections={collections}
            instagramPosts={instagramPosts}
            navigateTo={navigateTo}
          />
        );
    }
  };

  return (
    <div className="bg-background font-poppins text-text-dark">
      <Header
        onCartClick={openCart}
        navigateTo={navigateTo}
        onSearchClick={() => setIsSearchOpen(true)}
        onUserClick={() => (isLoggedIn || isAdminLoggedIn ? setIsLogoutConfirmOpen(true) : setIsLoginOpen(true))}
        isLoggedIn={isLoggedIn}
        isAdminLoggedIn={isAdminLoggedIn}
      />
      <main>{renderPage()}</main>
      <Footer navigateTo={navigateTo} isAdminLoggedIn={isAdminLoggedIn} />
      <WhatsAppButton />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} navigateTo={navigateTo} allCoupons={coupons} />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => {
            setIsSearchOpen(false);
            setSearchQuery('');
        }}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        results={searchResults}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
      <ConfirmationModal
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleLogout}
        title="Confirmar Saída"
        message="Tem certeza que deseja sair da sua conta?"
      />
    </div>
  );
};

export default App;
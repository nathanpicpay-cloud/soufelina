import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { useFavorites } from '../FavoritesContext';

const CartIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const UserIcon: React.FC<{isLoggedIn: boolean}> = ({ isLoggedIn }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {isLoggedIn ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    )}
  </svg>
);

const SearchIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const AnimatedMenuIcon: React.FC<{ isOpen: boolean; onClick: () => void }> = ({ isOpen, onClick }) => (
    <button onClick={onClick} className="relative h-6 w-6 z-50 focus:outline-none" aria-label="Toggle Menu">
        <span className={`absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
        <span className={`absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
    </button>
);


const HeartIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

type Page = 'home' | 'shop' | 'lookbook' | 'contact' | 'favorites';
interface HeaderProps {
    onCartClick: () => void;
    navigateTo: (page: Page) => void;
    onSearchClick: () => void;
    onUserClick: () => void;
    isLoggedIn: boolean;
    isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, navigateTo, onSearchClick, onUserClick, isLoggedIn, isAdminLoggedIn }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItemCount } = useCart();
    const { favoritesCount } = useFavorites();
    const userIsAuthenticated = isLoggedIn || isAdminLoggedIn;

    const navLinks: {name: string, page: Page}[] = [
        { name: "Home", page: "home" },
        { name: "Loja", page: "shop" },
        { name: "Lookbook", page: "lookbook" },
        { name: "Contato", page: "contact" },
    ];
    
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto' };
    }, [isMenuOpen]);

    const handleNavClick = (page: Page) => {
        navigateTo(page);
        setIsMenuOpen(false);
    }
    
    const handleCartClick = () => {
        onCartClick();
        setIsMenuOpen(false);
    }

  return (
    <header className="sticky top-0 bg-background z-40 shadow-md transition-colors duration-300 border-b border-gray-200">
      <div className="bg-primary text-white text-sm text-center py-2 px-4 font-medium">
        Frete grátis para compras acima de R$299 | Fale conosco no WhatsApp!
      </div>
      <nav className="container mx-auto px-6 h-24 flex items-center">

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden lg:flex items-center justify-between w-full">
            <div className="flex-1 flex justify-start">
                <img src="https://i.imgur.com/szUW3NL.png" alt="Sou Felina Logo" className="h-16 cursor-pointer" onClick={() => navigateTo('home')} />
            </div>
            
            <div className="flex-1 flex justify-center">
                 <ul className="flex items-center space-x-10">
                    {navLinks.map(link => (
                        <li key={link.name}>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick(link.page);}} className="text-text-dark hover:text-primary transition-colors duration-300 font-semibold tracking-wider">{link.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
          
            <div className="flex-1 flex items-center justify-end space-x-3 sm:space-x-4">
                <button onClick={onSearchClick} className="text-text-dark hover:text-primary transition-colors duration-300" title="Buscar"><SearchIcon /></button>
                <button onClick={() => navigateTo('favorites')} className="relative text-text-dark hover:text-primary transition-colors duration-300" title="Favoritos">
                    <HeartIcon />
                    {favoritesCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{favoritesCount}</span>}
                </button>
                <button onClick={onUserClick} className="text-text-dark hover:text-primary transition-colors duration-300" title={userIsAuthenticated ? "Sair" : "Entrar"}>
                    <UserIcon isLoggedIn={userIsAuthenticated} />
                </button>
                <button onClick={onCartClick} className="relative text-text-dark hover:text-primary transition-colors duration-300" title="Carrinho">
                    <CartIcon />
                    {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">{cartItemCount}</span>}
                </button>
            </div>
        </div>

        {/* --- MOBILE LAYOUT --- */}
        <div className="lg:hidden flex items-center justify-between w-full">
            <div className="flex-1 flex justify-start">
                <AnimatedMenuIcon isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>

            <div className="flex-none -ml-16">
                 <img src="https://i.imgur.com/szUW3NL.png" alt="Sou Felina Logo" className="h-12 cursor-pointer" onClick={() => navigateTo('home')} />
            </div>
          
            <div className="flex-1 flex items-center justify-end space-x-3 sm:space-x-4">
                <button onClick={onSearchClick} className="text-text-dark hover:text-primary transition-colors duration-300" title="Buscar"><SearchIcon /></button>
                <button onClick={() => navigateTo('favorites')} className="relative text-text-dark hover:text-primary transition-colors duration-300" title="Favoritos">
                    <HeartIcon />
                    {favoritesCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{favoritesCount}</span>}
                </button>
                <button onClick={onUserClick} className="text-text-dark hover:text-primary transition-colors duration-300" title={userIsAuthenticated ? "Sair" : "Entrar"}>
                    <UserIcon isLoggedIn={userIsAuthenticated} />
                </button>
                <button onClick={onCartClick} className="relative text-text-dark hover:text-primary transition-colors duration-300" title="Carrinho">
                    <CartIcon />
                    {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">{cartItemCount}</span>}
                </button>
            </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}>
          {/* Backdrop */}
          <div 
            onClick={() => setIsMenuOpen(false)} 
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Panel */}
          <div className={`relative w-full max-w-sm h-full bg-secondary shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                   <img src="https://i.imgur.com/szUW3NL.png" alt="Sou Felina Logo" className="h-12 cursor-pointer" onClick={() => handleNavClick('home')} />
              </div>
              <nav className="flex-grow p-6">
                <ul className="flex flex-col space-y-2">
                  {navLinks.map(link => (
                      <li key={link.name}>
                          <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick(link.page); }} className="block text-xl text-text-dark hover:bg-primary/20 rounded-md py-3 px-4 transition-all duration-200">{link.name}</a>
                      </li>
                  ))}
                </ul>
              </nav>

              <div className="p-6 border-t border-gray-200">
                <ul className="space-y-2">
                    <li>
                        <a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('favorites')}} className="flex items-center text-lg text-text-dark hover:bg-primary/20 rounded-md py-3 px-4 transition-all duration-200">
                           <HeartIcon className="h-5 w-5 mr-3" /> Favoritos
                            {favoritesCount > 0 && <span className="ml-auto bg-primary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{favoritesCount}</span>}
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={(e) => {e.preventDefault(); handleCartClick()}} className="flex items-center text-lg text-text-dark hover:bg-primary/20 rounded-md py-3 px-4 transition-all duration-200">
                           <CartIcon /> <span className="ml-3">Meu Carrinho</span>
                           {cartItemCount > 0 && <span className="ml-auto bg-primary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{cartItemCount}</span>}
                        </a>
                    </li>
                </ul>
              </div>
          </div>
      </div>
    </header>
  );
};
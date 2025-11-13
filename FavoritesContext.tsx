import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface FavoritesContextType {
  favoriteIds: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const getInitialFavorites = (): number[] => {
    try {
        const item = window.localStorage.getItem('soufelina-favorites');
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error("Error reading favorites from localStorage", error);
        return [];
    }
};


export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(getInitialFavorites);

  useEffect(() => {
    try {
        window.localStorage.setItem('soufelina-favorites', JSON.stringify(favoriteIds));
    } catch (error) {
        console.error("Error saving favorites to localStorage", error);
    }
  }, [favoriteIds]);

  const toggleFavorite = (productId: number) => {
    setFavoriteIds(prevIds => {
      if (prevIds.includes(productId)) {
        return prevIds.filter(id => id !== productId);
      } else {
        return [...prevIds, productId];
      }
    });
  };

  const isFavorite = (productId: number) => {
    return favoriteIds.includes(productId);
  };
  
  const favoritesCount = favoriteIds.length;

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite, favoritesCount }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product, CartItem, Coupon } from './types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartItemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  applyCoupon: (code: string, allCoupons: Coupon[]) => void;
  removeCoupon: () => void;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  discountAmount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, size: string) => {
    setCartItems(prevItems => {
      const cartItemId = `${product.id}-${size}`;
      const existingItem = prevItems.find(item => item.cartItemId === cartItemId);
      if (existingItem) {
        return prevItems.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1, size, cartItemId }];
    });
    openCart();
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const clearCart = () => {
    setCartItems([]);
    removeCoupon();
  };

  const applyCoupon = (code: string, allCoupons: Coupon[]) => {
    setCouponError(null);
    setAppliedCoupon(null);
    
    if (!code) {
        setCouponError('Por favor, insira um código de cupom.');
        return;
    }

    const coupon = allCoupons.find(c => c.code.toUpperCase() === code.toUpperCase());

    if (!coupon || coupon.status === 'inactive') {
      setCouponError('Cupom inválido ou expirado.');
      return;
    }

    if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
      setCouponError('Cupom inválido ou expirado.');
      return;
    }

    setAppliedCoupon(coupon);
  };


  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? subtotal * (appliedCoupon.discountPercentage / 100) : 0;
  const finalTotal = subtotal - discountAmount;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartItemCount, subtotal, isCartOpen, openCart, closeCart, applyCoupon, removeCoupon, appliedCoupon, couponError, discountAmount, finalTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
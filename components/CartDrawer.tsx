import React, { useState } from 'react';
import { useCart } from '../CartContext';
import type { Page } from '../App';
import type { Coupon } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navigateTo: (page: Page) => void;
  allCoupons: Coupon[];
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, navigateTo, allCoupons }) => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        subtotal,
        applyCoupon,
        removeCoupon,
        appliedCoupon,
        couponError,
        discountAmount,
        finalTotal
    } = useCart();
    
    const [couponInput, setCouponInput] = useState('');

    const handleCheckout = () => {
        navigateTo('checkout');
        onClose();
    }

    const handleApplyCoupon = () => {
        applyCoupon(couponInput, allCoupons);
    };

    const handleRemoveCoupon = () => {
        removeCoupon();
        setCouponInput('');
    };


    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-playfair font-bold text-text-dark">Meu Carrinho</h2>
                        <button onClick={onClose} className="text-text-dark hover:text-primary transition-colors"><CloseIcon /></button>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-lg text-gray-500">Seu carrinho está vazio.</p>
                            <button onClick={onClose} className="mt-6 bg-accent text-white font-semibold py-3 px-8 rounded-full hover:bg-primary transition-all duration-300 shadow-md hover:shadow-lg">
                                Continuar Comprando
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex-grow overflow-y-auto p-6 space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.cartItemId} className="flex items-center space-x-4">
                                        <img src={item.imageUrl} alt={item.name} className="w-24 h-32 object-cover rounded-md" />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-text-dark">{item.name}</h3>
                                            <p className="text-sm text-gray-500">Tamanho: {item.size}</p>
                                            <p className="text-sm text-gray-500">R${item.price.toFixed(2).replace('.', ',')}</p>
                                            <div className="flex items-center mt-2">
                                                <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="border rounded-l px-2 py-1">-</button>
                                                <span className="border-t border-b px-4 py-1">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="border rounded-r px-2 py-1">+</button>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <TrashIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 border-t border-gray-200">
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg text-text-dark">Subtotal</span>
                                        <span className="text-lg font-semibold text-text-dark">R${subtotal.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                    {appliedCoupon && (
                                        <div className="flex justify-between items-center text-sm text-green-600">
                                            <span>Desconto ({appliedCoupon.code})</span>
                                            <span>- R${discountAmount.toFixed(2).replace('.', ',')}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="my-4 py-4 border-y border-gray-200/50">
                                    <p className="font-semibold text-text-dark mb-2">Cupom de Desconto</p>
                                    {appliedCoupon ? (
                                        <div className="flex items-center justify-between bg-green-50 p-2 rounded-md">
                                            <p className="text-sm font-semibold text-green-700">Cupom Aplicado: <span className="font-mono">{appliedCoupon.code}</span></p>
                                            <button onClick={handleRemoveCoupon} type="button" className="text-xs font-bold text-red-600 hover:text-red-800">Remover</button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="text" 
                                                    placeholder="Seu cupom" 
                                                    value={couponInput}
                                                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                                    className="flex-grow px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-colors"
                                                />
                                                <button onClick={handleApplyCoupon} className="py-2 px-5 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-accent hover:bg-primary transition-colors">
                                                    Aplicar
                                                </button>
                                            </div>
                                            {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                                        </>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold text-text-dark">Total</span>
                                    <span className="text-xl font-bold text-text-dark">R${finalTotal.toFixed(2).replace('.', ',')}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 text-center">O valor do frete será calculado na página de checkout.</p>
                                
                                <button onClick={handleCheckout} className="w-full mt-4 bg-text-dark text-white font-bold py-4 rounded-full hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg">
                                    Finalizar Compra
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
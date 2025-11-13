import React, { useState, useMemo } from 'react';
import { useCart } from '../CartContext';
import type { Page } from '../App';
import type { Coupon } from '../types';

interface CheckoutPageProps {
    handlePlaceOrder: (paymentMethod: string) => void;
    navigateTo: (page: Page) => void;
    allCoupons: Coupon[];
}

// --- Ícones ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const PixIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2.5a9.512 9.512 0 100 19.024 9.512 9.512 0 000-19.024zM12 4a8.012 8.012 0 110 16.024A8.012 8.012 0 0112 4zm1.53 11.244l-2.45-2.45-.693.693 3.143 3.143 4.286-4.286-.693-.693-3.6 3.6z" /></svg>;
const CreditCardIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const BoletoIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a2 2 0 002 2h10a2 2 0 002-2L18 7m-9 0l3-4m-3 4l3 1m0 0l3 4m0-5v9" /></svg>;
const SpinnerIcon = () => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

const shippingOptions = [
  { id: 'economico', name: 'Econômico', price: 0, deliveryTime: '7-10 dias úteis' },
  { id: 'pac', name: 'PAC', price: 18.50, deliveryTime: '5-7 dias úteis' },
  { id: 'sedex', name: 'Sedex', price: 32.90, deliveryTime: '2-3 dias úteis' },
];

const OrderSummaryContent: React.FC<{
    subtotal: number;
    shippingCost: number;
    discountAmount: number;
    pixDiscount: number;
    finalTotal: number;
    appliedCoupon: Coupon | null;
    couponInput: string;
    onCouponInputChange: (value: string) => void;
    onApplyCoupon: () => void;
    onRemoveCoupon: () => void;
    couponError: string | null;
}> = ({ subtotal, shippingCost, discountAmount, pixDiscount, finalTotal, appliedCoupon, couponInput, onCouponInputChange, onApplyCoupon, onRemoveCoupon, couponError }) => (
     <div className="space-y-3">
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>R${subtotal.toFixed(2).replace('.', ',')}</span></div>
        <div className="flex justify-between text-sm">
            <span>Frete</span>
            <span>{shippingCost === 0 ? 'Grátis' : `R$${shippingCost.toFixed(2).replace('.', ',')}`}</span>
        </div>
        {discountAmount > 0 && appliedCoupon && (
            <div className="flex justify-between text-sm text-green-600">
                <span>Desconto ({appliedCoupon.code})</span>
                <span>- R${discountAmount.toFixed(2).replace('.', ',')}</span>
            </div>
        )}
        {pixDiscount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Desconto PIX (5%)</span><span>- R${pixDiscount.toFixed(2).replace('.', ',')}</span></div>}
        <div className="pt-4 border-t mt-4">
            <p className="font-semibold mb-2">Cupom de Desconto</p>
            {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 p-2 rounded-md">
                    <p className="text-sm font-semibold text-green-700">Cupom Aplicado: <span className="font-mono">{appliedCoupon.code}</span></p>
                    <button onClick={onRemoveCoupon} type="button" className="text-xs font-bold text-red-600 hover:text-red-800">Remover</button>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <input 
                            type="text" 
                            placeholder="Seu cupom" 
                            value={couponInput}
                            onChange={(e) => onCouponInputChange(e.target.value.toUpperCase())}
                            className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                        <button onClick={onApplyCoupon} type="button" className="py-2 px-5 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-accent hover:bg-primary transition-colors">
                            Aplicar
                        </button>
                    </div>
                    {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                </>
            )}
        </div>
        <div className="flex justify-between text-lg font-bold pt-4 border-t mt-4"><span>Total</span><span>R${finalTotal.toFixed(2).replace('.', ',')}</span></div>
    </div>
);


export const CheckoutPage: React.FC<CheckoutPageProps> = ({ handlePlaceOrder, navigateTo, allCoupons }) => {
    const { cartItems, subtotal, applyCoupon, removeCoupon, appliedCoupon, couponError, discountAmount } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [selectedShipping, setSelectedShipping] = useState('economico');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [couponInput, setCouponInput] = useState('');

    const shippingCost = useMemo(() => shippingOptions.find(opt => opt.id === selectedShipping)?.price ?? 0, [selectedShipping]);
    const subtotalAfterCoupon = subtotal - discountAmount;
    const pixDiscount = useMemo(() => paymentMethod === 'pix' ? subtotalAfterCoupon * 0.05 : 0, [paymentMethod, subtotalAfterCoupon]);
    const finalTotal = subtotalAfterCoupon + shippingCost - pixDiscount;

    const handleApplyCoupon = () => {
        applyCoupon(couponInput, allCoupons);
    };
    
    const handleRemoveCoupon = () => {
        removeCoupon();
        setCouponInput('');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2500)); // Simula o processamento
        setIsProcessing(false);
        handlePlaceOrder(paymentMethod);
    };

    if (cartItems.length === 0 && !isProcessing) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl font-playfair font-bold text-text-dark">Seu carrinho está vazio</h1>
                <p className="text-lg mt-4 text-text-dark/80">Adicione alguns produtos para finalizar a compra.</p>
                <button onClick={() => navigateTo('shop')} className="mt-8 bg-primary text-white font-semibold py-3 px-8 rounded-full hover:bg-accent transition-all duration-300">
                    Ir para a Loja
                </button>
            </div>
        );
    }
    
    const orderSummaryProps = {
        subtotal,
        shippingCost,
        discountAmount,
        pixDiscount,
        finalTotal,
        appliedCoupon,
        couponInput,
        onCouponInputChange: setCouponInput,
        onApplyCoupon: handleApplyCoupon,
        onRemoveCoupon: handleRemoveCoupon,
        couponError,
    };

    return (
        <div className="bg-background font-poppins">
            <div className="container mx-auto px-6 py-16">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark text-center mb-4">Finalizar Compra</h1>
                <p className="text-center text-text-dark/70 mb-12">Complete os passos abaixo para finalizar seu pedido.</p>

                {/* Mobile Summary Accordion */}
                <div className="lg:hidden bg-white border rounded-lg mb-8 shadow-sm">
                    <button onClick={() => setIsSummaryOpen(!isSummaryOpen)} className="w-full p-4 flex justify-between items-center text-left">
                        <div>
                            <span className="text-primary font-semibold block">{isSummaryOpen ? 'Ocultar' : 'Mostrar'} resumo do pedido</span>
                            <span className="text-lg font-bold text-text-dark">Total: R${finalTotal.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <ChevronDownIcon />
                    </button>
                    {isSummaryOpen && (
                        <div className="p-4 border-t">
                             <OrderSummaryContent {...orderSummaryProps} />
                        </div>
                    )}
                </div>

                <div className="flex flex-col-reverse lg:flex-row gap-12">
                    {/* Left Side: Forms */}
                    <main className="w-full lg:w-3/5">
                        <form onSubmit={handleSubmit} className="space-y-8">
                           <CheckoutSection title="1. Informações de Contato">
                                <div className="space-y-4">
                                    <InputField icon={<MailIcon />} type="email" placeholder="E-mail" required />
                                    <InputField icon={<PhoneIcon />} type="tel" placeholder="Telefone (com DDD)" required />
                                </div>
                            </CheckoutSection>

                           <CheckoutSection title="2. Endereço de Entrega">
                                <div className="space-y-4">
                                     <InputField icon={<UserIcon />} type="text" placeholder="Nome Completo" required />
                                     <InputField icon={<LocationIcon />} type="text" placeholder="CEP" required />
                                     <InputField icon={<LocationIcon />} type="text" placeholder="Endereço (Rua, Avenida, etc.)" required />
                                    <div className="flex gap-4">
                                        <InputField type="text" placeholder="Número" required wrapperClassName="w-1/3" />
                                        <InputField type="text" placeholder="Complemento (Opcional)" wrapperClassName="w-2/3" />
                                    </div>
                                </div>
                            </CheckoutSection>

                             <CheckoutSection title="3. Opções de Frete">
                                <div className="space-y-3">
                                    {shippingOptions.map(option => (
                                        <ShippingOption key={option.id} {...option} checked={selectedShipping === option.id} onChange={setSelectedShipping} />
                                    ))}
                                </div>
                            </CheckoutSection>

                             <CheckoutSection title="4. Pagamento">
                                <div className="space-y-3">
                                    <PaymentOption id="pix" label="PIX" icon={<PixIcon/>} checked={paymentMethod === 'pix'} onChange={setPaymentMethod} details="5% de desconto!" />
                                    {paymentMethod === 'pix' && (
                                        <div className="p-4 border-2 border-dashed rounded-md bg-gray-50 text-center">
                                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SouFelinaPedido123" alt="QR Code PIX" className="mx-auto border p-1 rounded-md" />
                                            <p className="mt-2 text-sm">Aponte a câmera do seu celular para pagar.</p>
                                            <button type="button" className="mt-2 text-sm font-semibold text-primary hover:text-accent">Copiar código PIX</button>
                                        </div>
                                    )}
                                    <PaymentOption id="card" label="Cartão de Crédito" icon={<CreditCardIcon/>} checked={paymentMethod === 'card'} onChange={setPaymentMethod} />
                                    {paymentMethod === 'card' && (
                                        <div className="p-4 border-2 border-dashed rounded-md bg-gray-50 space-y-4">
                                            <InputField type="text" placeholder="Número do Cartão" />
                                            <InputField type="text" placeholder="Nome do Titular" />
                                            <div className="flex gap-4">
                                                <InputField type="text" placeholder="Validade (MM/AA)" wrapperClassName="w-1/2" />
                                                <InputField type="text" placeholder="CVV" wrapperClassName="w-1/2" />
                                            </div>
                                            <select className="w-full p-3 border rounded-md bg-white focus:ring-primary focus:border-primary">
                                                <option>1x de R${subtotalAfterCoupon.toFixed(2).replace('.', ',')} sem juros</option>
                                                {[...Array(5)].map((_, i) => (
                                                    <option key={i+2}>{i+2}x de R${(subtotalAfterCoupon/(i+2)).toFixed(2).replace('.', ',')} sem juros</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    <PaymentOption id="boleto" label="Boleto Bancário" icon={<BoletoIcon/>} checked={paymentMethod === 'boleto'} onChange={setPaymentMethod} />
                                     {paymentMethod === 'boleto' && (
                                        <div className="p-4 border-2 border-dashed rounded-md bg-gray-50 text-center transition-all duration-300 ease-in-out">
                                            <p className="text-sm text-text-dark/90">O boleto será gerado após a finalização da compra e enviado para o seu e-mail.</p>
                                            <p className="mt-1 text-xs text-gray-500">O pagamento pode levar até 3 dias úteis para ser confirmado.</p>
                                        </div>
                                    )}
                                </div>
                            </CheckoutSection>

                             <div className="lg:mt-10">
                                <button type="submit" disabled={isProcessing} className="w-full bg-text-dark text-white font-bold py-4 rounded-full hover:bg-primary transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-wait flex items-center justify-center gap-3 shadow-md hover:shadow-lg">
                                    {isProcessing ? <><SpinnerIcon /> Processando...</> : `Finalizar Compra - R$${finalTotal.toFixed(2).replace('.', ',')}`}
                                </button>
                            </div>
                        </form>
                    </main>
                    
                    {/* Right Side: Summary */}
                    <aside className="w-full lg:w-2/5 p-8 bg-white rounded-lg self-start sticky top-28 shadow-sm hidden lg:block">
                         <h2 className="text-2xl font-playfair font-semibold mb-6 border-b pb-4">Resumo do Pedido</h2>
                         <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-6">
                            {cartItems.map(item => (
                                <div key={item.cartItemId} className="flex items-center space-x-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-28 object-cover rounded-md" />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-text-dark">{item.name}</p>
                                        <p className="text-sm text-gray-500">Tam: {item.size} | Qtd: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">R${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                                </div>
                            ))}
                         </div>
                         <OrderSummaryContent {...orderSummaryProps} />
                    </aside>
                </div>
            </div>
        </div>
    );
};

const CheckoutSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-playfair font-semibold mb-6">{title}</h2>
        {children}
    </section>
);

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode; wrapperClassName?: string }> = ({ icon, wrapperClassName = '', ...props }) => (
    <div className={`relative ${wrapperClassName}`}>
        {icon && <span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span>}
        <input 
            {...props}
            className={`w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-500 transition-colors ${icon ? 'pl-10' : ''}`} 
        />
    </div>
);

const ShippingOption: React.FC<{ id: string; name: string; price: number; deliveryTime: string; checked: boolean; onChange: (id: string) => void; }> = ({ id, name, price, deliveryTime, checked, onChange }) => (
    <label htmlFor={id} className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${checked ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
        <input type="radio" id={id} name="shippingMethod" checked={checked} onChange={() => onChange(id)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
        <div className="flex-grow ml-4">
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-gray-500">{deliveryTime}</p>
        </div>
        <p className="font-semibold">{price === 0 ? 'Grátis' : `R$${price.toFixed(2).replace('.', ',')}`}</p>
    </label>
);

const PaymentOption: React.FC<{ id: string; label: string; icon: React.ReactNode; checked: boolean; onChange: (id: string) => void; details?: string; }> = ({ id, label, icon, checked, onChange, details }) => (
    <label htmlFor={id} className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${checked ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
        <input type="radio" id={id} name="paymentMethod" checked={checked} onChange={() => onChange(id)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
        <div className="ml-4 flex items-center">{icon}<span className="ml-3 font-semibold">{label}</span></div>
        {details && <span className="ml-auto text-sm font-bold text-green-600 bg-green-100 py-1 px-2 rounded-full">{details}</span>}
    </label>
);
import React from 'react';
import type { Page } from '../App';

interface OrderConfirmationPageProps {
    navigateTo: (page: Page) => void;
    lastOrderDetails: { paymentMethod: string } | null;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ navigateTo, lastOrderDetails }) => {
    const isBoleto = lastOrderDetails?.paymentMethod === 'boleto';

    return (
        <div className="bg-background">
            <div className="container mx-auto px-6 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark">
                    {isBoleto ? 'Pedido realizado com sucesso!' : 'Obrigada por comprar na Sou Felina 💕'}
                </h1>
                <p className="text-lg mt-4 max-w-2xl text-text-dark/80">
                    {isBoleto 
                        ? 'Geramos o seu boleto! Ele foi enviado para o seu e-mail e tem vencimento em 3 dias úteis. O seu pedido será enviado após a confirmação do pagamento.'
                        : 'Seu pedido foi recebido com sucesso e será processado em breve. Você receberá um e-mail com os detalhes da sua compra.'
                    }
                </p>
                {isBoleto && (
                    <div className="mt-8">
                        <a href="#" onClick={(e) => e.preventDefault()} className="inline-block bg-text-dark text-white font-bold py-3 px-10 rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Visualizar Boleto
                        </a>
                    </div>
                )}
                <button onClick={() => navigateTo('shop')} className="mt-10 bg-primary text-white font-semibold py-3 px-10 rounded-full hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Continuar Comprando
                </button>
            </div>
        </div>
    );
};
import React from 'react';

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M1-1h15v4h-2m-4 0H5.5A2.5 2.5 0 013 10V6" transform="translate(5 4)" /></svg>
);
const CreditCardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
);
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
);


const benefits = [
  { icon: <TruckIcon />, text: 'Entrega Rápida em todo o Brasil' },
  { icon: <CreditCardIcon />, text: 'Até 6x sem juros' },
  { icon: <HeartIcon />, text: '5% OFF no Pix' },
  { icon: <ChatIcon />, text: 'Atendimento Online' },
];

export const Benefits: React.FC = () => {
  return (
    <section className="bg-secondary py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              {benefit.icon}
              <p className="text-sm font-medium text-text-dark">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
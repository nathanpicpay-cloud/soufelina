import React, { useState } from 'react';

const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export const ContactPage: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

  return (
    <div className="bg-background py-20">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                 <h1 className="text-5xl md:text-6xl font-playfair font-bold text-text-dark mb-4">Fale Conosco</h1>
                 <p className="text-lg mt-3 text-text-dark/80">Adoraríamos ouvir você. Entre em contato e responderemos o mais breve possível.</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="w-full lg:w-1/3 space-y-8">
                     <div className="flex items-center">
                        <LocationIcon />
                        <div>
                            <h3 className="text-lg font-semibold">Nosso Endereço</h3>
                            <p className="text-text-dark/80">Rua Itaboraí, 13 Campo limpo a Feira de Santana</p>
                        </div>
                    </div>
                     <div className="flex items-center">
                        <MailIcon />
                        <div>
                            <h3 className="text-lg font-semibold">E-mail</h3>
                            <p className="text-text-dark/80">contato@soufelina.com</p>
                        </div>
                    </div>
                     <div className="flex items-center">
                        <PhoneIcon />
                        <div>
                            <h3 className="text-lg font-semibold">WhatsApp</h3>
                            <p className="text-text-dark/80">(11) 98765-4321</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-md">
                    {formSubmitted ? (
                        <div className="text-center py-12">
                             <h2 className="text-2xl font-bold font-playfair text-text-dark">Obrigada!</h2>
                             <p className="mt-2 text-text-dark/80">Sua mensagem foi enviada com sucesso. Retornaremos em breve.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                                    <input type="text" id="name" placeholder="Seu nome completo" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder:text-gray-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                                    <input type="email" id="email" placeholder="seu.email@exemplo.com" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder:text-gray-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Assunto</label>
                                <input type="text" id="subject" placeholder="Sobre o que você gostaria de falar?" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder:text-gray-500" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
                                <textarea id="message" rows={5} placeholder="Digite sua mensagem aqui..." required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder:text-gray-500"></textarea>
                            </div>
                             <div>
                                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-accent hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                                    Enviar Mensagem
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};
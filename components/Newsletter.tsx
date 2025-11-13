import React from 'react';

export const Newsletter: React.FC = () => {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-playfair font-bold text-text-dark">Receba todas as novidades</h2>
        <p className="mt-3 mb-8 text-text-dark/80">Cadastre-se e fique por dentro das promoções exclusivas da Sou Felina.</p>
        <form className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Digite seu melhor e-mail"
            className="w-full sm:flex-grow px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-500"
          />
          <button type="submit" className="w-full sm:w-auto bg-text-dark text-white font-bold py-4 px-8 rounded-full hover:bg-primary transition-colors duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
            Cadastrar
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};
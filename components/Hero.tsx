import React from 'react';

interface HeroProps {
  navigateTo: (page: 'shop') => void;
}

export const Hero: React.FC<HeroProps> = ({ navigateTo }) => {
  return (
    <section className="relative h-[90vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&h=1200&fit=crop&q=80')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg max-w-4xl tracking-wider">
          Sou Felina — Força e estilo em cada movimento.
        </h2>
        <p className="font-poppins text-lg md:text-xl mt-6 mb-10 drop-shadow-md bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            Coleção: Power Move & Gym Tech
        </p>
        <button 
          onClick={() => navigateTo('shop')}
          className="bg-primary text-white font-bold py-3 px-10 rounded-full hover:bg-accent transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          VER COLEÇÃO
        </button>
      </div>
    </section>
  );
};
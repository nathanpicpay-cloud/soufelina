import React from 'react';
import type { InstagramPost } from '../types';

interface InstagramFeedProps {
    id: string;
    posts: InstagramPost[];
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ id, posts }) => {
  return (
    <section id={id} className="py-20 bg-background">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-text-dark">Siga a Sou Felina e inspire-se</h2>
        <p className="text-lg mt-3 mb-10 text-text-dark/80">@sou.felina 💕</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {posts.map(post => (
            <a href="#" key={post.id} className="block relative group overflow-hidden aspect-square rounded-md">
              <img src={post.imageUrl} alt="Instagram post" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </a>
          ))}
        </div>
        <a href="#" className="mt-12 inline-block bg-text-dark text-white font-bold py-3 px-10 rounded-full hover:bg-primary transition-all duration-300 shadow-md hover:shadow-lg">
          Ver no Instagram
        </a>
      </div>
    </section>
  );
};
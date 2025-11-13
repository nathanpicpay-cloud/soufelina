import React from 'react';
import { Hero } from '../components/Hero';
import { Benefits } from '../components/Benefits';
import { ProductCarousel } from '../components/ProductCarousel';
import { Collections } from '../components/Collections';
import { InstagramFeed } from '../components/InstagramFeed';
import { Newsletter } from '../components/Newsletter';
import type { Product, Collection, InstagramPost } from '../types';
import type { Page } from '../App';

interface HomePageProps {
  products: Product[];
  collections: Collection[];
  instagramPosts: InstagramPost[];
  navigateTo: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ products, collections, instagramPosts, navigateTo }) => {
  const newArrivals = products.slice(0, 5);
  const promotions = products.filter(p => p.oldPrice).slice(0, 5);

  return (
    <>
      <Hero navigateTo={navigateTo} />
      <Benefits />
      <ProductCarousel id="lancamentos" title="Lançamentos" products={newArrivals} />
      <Collections id="colecoes" collections={collections} navigateTo={navigateTo} />
      <ProductCarousel id="promocoes" title="Promoções Imperdíveis" products={promotions} />
      <InstagramFeed id="lookbook" posts={instagramPosts.slice(0, 6)} />
      <Newsletter />
    </>
  );
};
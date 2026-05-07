import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetailsClient from '@/app/product-details/components/ProductDetailsClient';

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <ProductDetailsClient />
      </main>
      <Footer />
    </div>
  );
}
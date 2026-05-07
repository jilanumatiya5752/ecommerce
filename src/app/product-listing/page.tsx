import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductListingClient from '@/app/product-listing/components/ProductListingClient';

export default function ProductListingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <ProductListingClient />
      </main>
      <Footer />
    </div>
  );
}
'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function SellerCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setVisible(true); }); },
      { threshold: 0.2 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-6 max-w-7xl mx-auto mb-8">
      <div
        className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-background" />
        <div className="absolute inset-0 border border-primary/20 rounded-3xl" />
        <div className="absolute top-0 left-0 w-80 h-80 blob-violet opacity-40" />
        <div className="absolute bottom-0 right-0 w-64 h-64 blob-amber opacity-30" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(124,58,237,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-0">
          {/* Left: Become a Seller */}
          <div className="p-8 md:p-12 flex flex-col justify-center md:border-r border-border">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-5">
              <Icon name="BuildingStorefrontIcon" size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Become a Seller
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Join 1,200+ sellers on VendorHive. List your products, reach millions of buyers, and grow your business with our powerful seller tools.
            </p>
            <ul className="space-y-2.5 mb-8">
              {['Zero listing fees for first 30 days', 'Built-in analytics dashboard', 'Secure payment processing', 'Dedicated seller support']?.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                    <Icon name="CheckIcon" size={10} className="text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-semibold transition-all duration-200 group self-start glow-violet"
            >
              Start Selling Today
              <Icon name="ArrowRightIcon" size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right: Shop Now */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-5">
              <Icon name="ShoppingBagIcon" size={24} className="text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Shop 50,000+ Products
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Discover the best deals from verified sellers. Electronics, fashion, home goods, and more — all with buyer protection.
            </p>

            {/* Mini Stats */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Avg. Savings', value: '34%' },
                { label: 'Free Shipping', value: '2-Day' },
                { label: 'Easy Returns', value: '30-Day' },
                { label: 'Buyer Protection', value: '100%' },
              ]?.map((stat) => (
                <div key={stat?.label} className="glass-card border border-border rounded-xl p-3">
                  <div className="text-base font-bold text-foreground">{stat?.value}</div>
                  <div className="text-[11px] text-muted-foreground">{stat?.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/product-listing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl text-sm font-semibold transition-all duration-200 group self-start"
            >
              Browse All Products
              <Icon name="ArrowRightIcon" size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
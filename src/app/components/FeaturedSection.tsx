'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/lib/mockData';

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setVisible(true); }); },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-8 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-1 block">Hand-Picked</span>
          <h2 className="section-headline text-foreground">Featured Products</h2>
        </div>
        <Link
          href="/product-listing?filter=featured"
          className="flex items-center gap-1.5 px-4 py-2 glass-card border border-border hover:border-accent/40 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-all group"
        >
          View All
          <Icon name="ArrowRightIcon" size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      {/* Grid */}
      <div
        className={`grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 transition-all duration-700 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {featuredProducts?.map((product, idx) => (
          <div
            key={product?.id}
            className="transition-all"
            style={{ transitionDelay: `${idx * 60}ms` }}
          >
            <ProductCard product={product} layout="grid" />
          </div>
        ))}
      </div>
    </section>
  );
}
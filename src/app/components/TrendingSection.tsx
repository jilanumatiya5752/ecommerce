'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ProductCard';
import { trendingProducts } from '@/lib/mockData';

export default function TrendingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setVisible(true); }); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-8 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 block">Right Now</span>
          <h2 className="section-headline text-foreground flex items-center gap-3">
            Trending
            <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded-full text-xs font-bold text-red-400">
              🔥 HOT
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-9 h-9 glass-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Scroll left"
          >
            <Icon name="ChevronLeftIcon" size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-9 h-9 glass-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Scroll right"
          >
            <Icon name="ChevronRightIcon" size={16} />
          </button>
          <Link
            href="/product-listing?filter=trending"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 glass-card border border-border hover:border-primary/40 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-all group"
          >
            View All
            <Icon name="ArrowRightIcon" size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Horizontal Scroll */}
      <div
        className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {trendingProducts.map((product) => (
            <div key={product.id} className="shrink-0 w-44 sm:w-52 md:w-56">
              <ProductCard product={product} layout="grid" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
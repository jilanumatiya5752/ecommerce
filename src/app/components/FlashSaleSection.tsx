'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ProductCard';
import { flashSaleProducts } from '@/lib/mockData';

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 md:w-16 md:h-16 glass-card border border-primary/30 rounded-xl flex items-center justify-center glow-violet">
        <span className="text-lg md:text-2xl font-bold text-foreground tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] md:text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-medium">{label}</span>
    </div>
  );
}

export default function FlashSaleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 47, seconds: 23 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setVisible(true); }); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) { seconds = 59; minutes -= 1; }
        if (minutes < 0) { minutes = 59; hours -= 1; }
        if (hours < 0) return { hours: 5, minutes: 59, seconds: 59 };
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
              <Icon name="BoltIcon" size={16} className="text-accent" variant="solid" />
            </div>
            <div>
              <h2 className="section-headline text-foreground leading-none">Flash Sale</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Limited time deals — grab before they expire</p>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium mr-1 hidden sm:block">Ends in</span>
          <CountdownUnit value={timeLeft.hours} label="hrs" />
          <span className="text-lg font-bold text-primary mb-4">:</span>
          <CountdownUnit value={timeLeft.minutes} label="min" />
          <span className="text-lg font-bold text-primary mb-4">:</span>
          <CountdownUnit value={timeLeft.seconds} label="sec" />
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 transition-all duration-700 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {flashSaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} layout="grid" />
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-8">
        <Link
          href="/product-listing?filter=deals"
          className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-border hover:border-primary/40 rounded-xl text-sm font-semibold text-foreground hover:text-primary transition-all duration-200 group"
        >
          View All Flash Deals
          <Icon name="ArrowRightIcon" size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { categories } from '@/lib/mockData';

export default function CategoriesSection() {
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

  // BENTO GRID AUDIT:
  // Array has 6 cards: [Electronics, Fashion, Home, Sports, Beauty, Gaming]
  // Row 1: [col-1+2: Electronics rs-2] [col-3: Fashion cs-1] [col-4: Home cs-1]
  // Row 2: [col-1+2: FILLED-Electronics] [col-3: Sports cs-1] [col-4: Beauty cs-1]
  // Row 3: [col-1+2+3+4: Gaming cs-4]
  // Placed 6/6 cards ✓

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div
        className={`mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">Browse By</span>
        <h2 className="section-headline text-foreground">Shop Categories</h2>
      </div>
      {/* Bento Grid */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 transition-all duration-700 delay-150 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Card 1: Electronics — col-span-2 row-span-2 */}
        <Link
          href="/product-listing?category=electronics"
          className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden glass-card border border-border hover:border-primary/40 transition-all duration-300 min-h-[280px] md:min-h-[360px]"
        >
          <AppImage
            src={categories?.[0]?.image}
            alt="Electronics category — laptops and gadgets on dark studio background"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <span className="text-2xl mb-1 block">{categories?.[0]?.icon}</span>
            <h3 className="text-xl md:text-2xl font-bold text-white">{categories?.[0]?.name}</h3>
            <p className="text-sm text-white/60 mt-1">{categories?.[0]?.count?.toLocaleString()} products</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 border border-primary/30 rounded-full text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Shop Now →
            </div>
          </div>
        </Link>

        {/* Card 2: Fashion */}
        <Link
          href="/product-listing?category=fashion"
          className="group relative rounded-2xl overflow-hidden glass-card border border-border hover:border-primary/40 transition-all duration-300 min-h-[140px] md:min-h-[172px]"
        >
          <AppImage
            src={categories?.[1]?.image}
            alt="Fashion category — stylish clothing on bright well-lit background"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
            <span className="text-lg block">{categories?.[1]?.icon}</span>
            <h3 className="text-sm md:text-base font-bold text-white">{categories?.[1]?.name}</h3>
            <p className="text-[10px] text-white/50">{categories?.[1]?.count?.toLocaleString()}+</p>
          </div>
        </Link>

        {/* Card 3: Home & Living */}
        <Link
          href="/product-listing?category=home"
          className="group relative rounded-2xl overflow-hidden glass-card border border-border hover:border-primary/40 transition-all duration-300 min-h-[140px] md:min-h-[172px]"
        >
          <AppImage
            src={categories?.[2]?.image}
            alt="Home and Living category — modern furniture in bright airy living room"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
            <span className="text-lg block">{categories?.[2]?.icon}</span>
            <h3 className="text-sm md:text-base font-bold text-white">{categories?.[2]?.name}</h3>
            <p className="text-[10px] text-white/50">{categories?.[2]?.count?.toLocaleString()}+</p>
          </div>
        </Link>

        {/* Card 4: Sports */}
        <Link
          href="/product-listing?category=sports"
          className="group relative rounded-2xl overflow-hidden glass-card border border-border hover:border-primary/40 transition-all duration-300 min-h-[140px] md:min-h-[172px]"
        >
          <AppImage
            src={categories?.[3]?.image}
            alt="Sports category — athlete running in bright open gym environment"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
            <span className="text-lg block">{categories?.[3]?.icon}</span>
            <h3 className="text-sm md:text-base font-bold text-white">{categories?.[3]?.name}</h3>
            <p className="text-[10px] text-white/50">{categories?.[3]?.count?.toLocaleString()}+</p>
          </div>
        </Link>

        {/* Card 5: Beauty */}
        <Link
          href="/product-listing?category=beauty"
          className="group relative rounded-2xl overflow-hidden glass-card border border-border hover:border-primary/40 transition-all duration-300 min-h-[140px] md:min-h-[172px]"
        >
          <AppImage
            src={categories?.[4]?.image}
            alt="Beauty category — cosmetics and skincare on bright white well-lit surface"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
            <span className="text-lg block">{categories?.[4]?.icon}</span>
            <h3 className="text-sm md:text-base font-bold text-white">{categories?.[4]?.name}</h3>
            <p className="text-[10px] text-white/50">{categories?.[4]?.count?.toLocaleString()}+</p>
          </div>
        </Link>

        {/* Card 6: Gaming — col-span-4 */}
        <Link
          href="/product-listing?category=gaming"
          className="col-span-2 md:col-span-4 group relative rounded-2xl overflow-hidden glass-card border border-border hover:border-primary/40 transition-all duration-300 min-h-[120px] md:min-h-[140px]"
        >
          <AppImage
            src={categories?.[5]?.image}
            alt="Gaming category — dark gaming setup with glowing RGB lights and controllers"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center p-5 md:p-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{categories?.[5]?.icon}</span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">{categories?.[5]?.name}</h3>
                <p className="text-sm text-white/60">{categories?.[5]?.count?.toLocaleString()} products • Consoles, Games, Accessories</p>
              </div>
            </div>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-4">
            <span className="text-sm font-semibold text-primary">Explore Gaming</span>
            <span className="text-primary">→</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
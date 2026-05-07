'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { products } from '@/lib/mockData';

const floatingProducts = products?.slice(0, 3);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('active');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary violet blob */}
        <div
          className="blob-violet absolute w-[600px] h-[600px] animate-pulse-glow"
          style={{ top: '-10%', left: '-5%' }}
        />
        {/* Amber blob */}
        <div
          className="blob-amber absolute w-[400px] h-[400px]"
          style={{ top: '20%', right: '-8%' }}
        />
        {/* Indigo blob */}
        <div
          className="blob-indigo absolute w-[500px] h-[500px]"
          style={{ bottom: '-15%', left: '30%' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      {/* Floating Product Cards */}
      {/* Card 1 — Top Left */}
      <div
        className="hidden lg:block absolute top-[18%] left-[5%] w-52 animate-float-1 z-10"
        aria-hidden="true"
      >
        <div className="glass-card rounded-2xl p-3 shadow-[0_8px_32px_rgba(124,58,237,0.2)]">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted mb-2.5">
            <AppImage
              src={floatingProducts?.[0]?.images?.[0]}
              alt={`${floatingProducts?.[0]?.name} — floating product preview on dark background`}
              fill
              className="object-cover"
              sizes="208px"
            />
            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-accent text-accent-foreground text-[9px] font-bold rounded-md">
              -{floatingProducts?.[0]?.discount}%
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground truncate">{floatingProducts?.[0]?.brand}</p>
          <p className="text-xs font-semibold text-foreground truncate">{floatingProducts?.[0]?.name?.split(' ')?.slice(0, 4)?.join(' ')}</p>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-sm font-bold text-foreground">${floatingProducts?.[0]?.price}</span>
            <div className="flex items-center gap-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <span className="text-[10px] text-muted-foreground">{floatingProducts?.[0]?.rating}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Card 2 — Top Right */}
      <div
        className="hidden lg:block absolute top-[22%] right-[5%] w-48 animate-float-2 z-10"
        aria-hidden="true"
      >
        <div className="glass-card rounded-2xl p-3 shadow-[0_8px_32px_rgba(245,158,11,0.15)]">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted mb-2.5">
            <AppImage
              src={floatingProducts?.[1]?.images?.[0]}
              alt={`${floatingProducts?.[1]?.name} — floating product preview on dark background`}
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>
          <p className="text-[10px] text-muted-foreground truncate">{floatingProducts?.[1]?.brand}</p>
          <p className="text-xs font-semibold text-foreground truncate">{floatingProducts?.[1]?.name?.split(' ')?.slice(0, 3)?.join(' ')}</p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="text-sm font-bold text-foreground">${floatingProducts?.[1]?.price}</span>
            <span className="text-[10px] text-green-400 font-semibold">-{floatingProducts?.[1]?.discount}%</span>
          </div>
        </div>
      </div>
      {/* Card 3 — Bottom Left */}
      <div
        className="hidden lg:block absolute bottom-[15%] left-[8%] w-44 animate-float-3 z-10"
        aria-hidden="true"
      >
        <div className="glass-card rounded-2xl p-3 border border-primary/20 shadow-[0_8px_32px_rgba(124,58,237,0.15)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400 font-semibold">Live Sales</span>
          </div>
          <div className="space-y-1.5">
            {[{ label: 'Orders Today', value: '2,847' }, { label: 'Active Sellers', value: '1,203' }, { label: 'Happy Buyers', value: '94.8%' }]?.map((stat) => (
              <div key={stat?.label} className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{stat?.label}</span>
                <span className="text-[11px] font-bold text-foreground">{stat?.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="animate-in-1 inline-flex items-center gap-2 px-4 py-2 glass-card border border-primary/20 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-semibold text-muted-foreground">
            Over <span className="text-accent">50,000+ products</span> from verified sellers
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline text-foreground mb-4 animate-in-2">
          <span className="block text-gradient-violet">SHOP</span>
          <span className="block">SMARTER</span>
          <span className="block text-foreground/30">LIVE BETTER</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-in-3 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          Discover thousands of products from hundreds of verified sellers.
          Flash deals, trending items, and seamless checkout — all in one place.
        </p>

        {/* CTAs */}
        <div className="animate-in-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA — Border Beam */}
          <Link
            href="/product-listing"
            className="border-beam-wrapper group relative flex items-center gap-3 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 border border-primary/30 rounded-full px-8 py-4 overflow-hidden hover:border-primary/60 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="absolute -inset-1 animate-spin-slow opacity-60"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg 300deg, #7C3AED 360deg)',
                }}
              />
            </div>
            <div className="relative z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.5)] shrink-0">
              <Icon name="BoltIcon" size={18} className="text-primary-foreground" variant="solid" />
            </div>
            <span className="relative z-10 text-base font-semibold text-foreground">
              Start Shopping
            </span>
            <Icon name="ArrowRightIcon" size={16} className="relative z-10 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/product-listing?filter=deals"
            className="group flex items-center gap-2 px-6 py-4 bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-full text-accent font-semibold text-sm transition-all duration-200"
          >
            <span>Flash Deals</span>
            <span className="px-1.5 py-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-md">HOT</span>
            <Icon name="ArrowRightIcon" size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Stats Row */}
        <div className="animate-in-5 flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-14 pt-10 border-t border-border/50">
          {[
            { value: '50K+', label: 'Products' },
            { value: '1,200+', label: 'Sellers' },
            { value: '2M+', label: 'Happy Buyers' },
            { value: '4.8★', label: 'Avg Rating' },
          ]?.map((stat) => (
            <div key={stat?.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient-violet">{stat?.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
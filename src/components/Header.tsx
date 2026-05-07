'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/product-listing' },
  { label: 'Deals', href: '/product-listing?filter=deals' },
  { label: 'Categories', href: '/product-listing?filter=categories' },
  { label: 'Cart', href: '/cart' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-card/90 backdrop-blur-xl border-b border-border shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <AppLogo size={36} />
              <span className="font-bold text-xl tracking-tight text-foreground hidden sm:block group-hover:text-primary transition-colors">
                VendorHive
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
                >
                  {link?.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div
              className={`hidden md:flex items-center flex-1 max-w-md relative transition-all duration-300 ${
                searchFocused ? 'max-w-lg' : ''
              }`}
            >
              <div
                className={`flex items-center w-full bg-muted border rounded-xl px-3 py-2 gap-2 transition-all duration-200 ${
                  searchFocused ? 'border-primary/50 shadow-[0_0_0_2px_rgba(124,58,237,0.15)]' : 'border-border'
                }`}
              >
                <Icon name="MagnifyingGlassIcon" size={16} className="text-muted-foreground shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-muted-foreground hover:text-foreground shrink-0"
                  >
                    <Icon name="XMarkIcon" size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Mobile Search */}
              <button className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                <Icon name="MagnifyingGlassIcon" size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/"
                className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all hidden sm:flex items-center"
              >
                <Icon name="HeartIcon" size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all flex items-center"
              >
                <Icon name="ShoppingCartIcon" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <Link
                href="/"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-sm font-medium text-primary transition-all duration-200"
              >
                <Icon name="UserIcon" size={16} />
                <span>Sign In</span>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                aria-label="Open menu"
              >
                <Icon name="Bars3Icon" size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-card border-l border-border flex flex-col animate-slide-right">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <AppLogo size={32} />
                <span className="font-bold text-lg">VendorHive</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                aria-label="Close menu"
              >
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center bg-muted border border-border rounded-xl px-3 py-2.5 gap-2">
                <Icon name="MagnifyingGlassIcon" size={16} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
            </div>

            <nav className="flex flex-col p-4 gap-1">
              {navLinks?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all"
                >
                  {link?.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto p-4 border-t border-border flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                <Icon name="UserIcon" size={16} />
                Sign In
              </Link>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 py-3 bg-muted border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted/80 transition-all"
              >
                <Icon name="HeartIcon" size={16} />
                Wishlist ({wishlistCount})
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
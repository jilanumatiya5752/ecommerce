import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const footerLinks = {
  Shop: [
    { label: 'All Products', href: '/product-listing' },
    { label: 'Flash Deals', href: '/product-listing?filter=deals' },
    { label: 'New Arrivals', href: '/product-listing?filter=new' },
    { label: 'Trending', href: '/product-listing?filter=trending' },
  ],
  Support: [
    { label: 'Help Center', href: '/' },
    { label: 'Order Tracking', href: '/' },
    { label: 'Returns', href: '/' },
    { label: 'Contact Us', href: '/' },
  ],
  Sellers: [
    { label: 'Become a Seller', href: '/' },
    { label: 'Seller Login', href: '/' },
    { label: 'Seller Guide', href: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      {/* Main Links Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <AppLogo size={32} />
              <span className="font-bold text-lg text-foreground">VendorHive</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              Your dark tech-forward multi-vendor marketplace for the best deals.
            </p>
          </div>

          {Object.entries(footerLinks)?.map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links?.map((link) => (
                  <li key={link?.label}>
                    <Link
                      href={link?.href}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">© 2025 VendorHive Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Twitter</Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
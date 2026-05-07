'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import type { Product } from '@/lib/mockData';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? '#F59E0B' : 'none'}
          stroke={star <= Math.round(rating) ? '#F59E0B' : '#374151'}
          strokeWidth={2}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export { StarRating };

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  if (layout === 'list') {
    return (
      <Link href="/product-details" className="block group">
        <div className="glass-card glass-card-hover rounded-xl overflow-hidden flex gap-4 p-4">
          <div className="relative w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-muted">
            <AppImage
              src={product.images[0]}
              alt={`${product.name} — ${product.brand} product image`}
              fill
              className="object-cover product-image-zoom"
              sizes="128px"
            />
            {product.badge && (
              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-md">
                {product.badge}
              </span>
            )}
          </div>
          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">{product.brand}</p>
              <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <StarRating rating={product.rating} />
                <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">${product.price}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-sm price-strike text-muted-foreground">${product.originalPrice}</span>
                    <span className="text-xs font-semibold text-green-400">-{product.discount}%</span>
                  </>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  addedToCart
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' :'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {addedToCart ? '✓ Added' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/product-details" className="block group">
      <div className="glass-card glass-card-hover rounded-xl overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <AppImage
            src={product.images[0]}
            alt={`${product.name} — ${product.brand} product on dark background`}
            fill
            className="object-cover product-image-zoom"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.badge && (
              <span className="px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-md shadow-sm">
                {product.badge}
              </span>
            )}
            {product.discount >= 20 && !product.badge && (
              <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-md">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Stock warning */}
          {product.stock < 10 && (
            <div className="absolute bottom-2.5 left-2.5 right-2.5">
              <div className="bg-background/80 backdrop-blur-sm border border-red-500/30 rounded-lg px-2 py-1 text-center">
                <span className="text-[10px] font-semibold text-red-400">Only {product.stock} left!</span>
              </div>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              wishlisted
                ? 'bg-red-500 text-white scale-110' :'bg-background/70 backdrop-blur-sm text-muted-foreground hover:text-red-400 hover:bg-background/90'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Icon name="HeartIcon" size={14} variant={wishlisted ? 'solid' : 'outline'} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-1">
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors flex-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-foreground">${product.price}</span>
                {product.discount > 0 && (
                  <span className="text-xs price-strike text-muted-foreground">${product.originalPrice}</span>
                )}
              </div>
              {product.discount > 0 && (
                <span className="text-[11px] font-semibold text-green-400">{product.discount}% off</span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                addedToCart
                  ? 'bg-green-500/20 text-green-400' :'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
              }`}
              aria-label={addedToCart ? 'Added to cart' : 'Add to cart'}
            >
              <Icon name={addedToCart ? 'CheckIcon' : 'ShoppingCartIcon'} size={14} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
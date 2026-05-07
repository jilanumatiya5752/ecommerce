'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { products, reviews } from '@/lib/mockData';
import { StarRating } from '@/components/ProductCard';
import ProductCard from '@/components/ProductCard';
import ReviewsTab from './ReviewsTab';
import SpecificationsTab from './SpecificationsTab';

const product = products[0];
const relatedProducts = products.slice(1, 6);

type TabId = 'description' | 'specifications' | 'reviews';

export default function ProductDetailsClient() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? '');
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('description');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const scrollRelated = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  const ratingBreakdown = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground py-4 flex-wrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <Link href="/product-listing" className="hover:text-foreground transition-colors">Products</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <Link href="/product-listing" className="hover:text-foreground transition-colors">{product.category}</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* LEFT: Image Gallery */}
        <div className="flex flex-col gap-3">
          {/* Main Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden glass-card border border-border group">
            <AppImage
              src={product.images[selectedImage]}
              alt={`${product.name} — ${product.brand} product view ${selectedImage + 1}, dark studio photography`}
              fill
              className="object-cover product-image-zoom"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full shadow-sm">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                wishlisted
                  ? 'bg-red-500 text-white' :'bg-background/70 backdrop-blur-sm text-muted-foreground hover:text-red-400 hover:bg-background/90'
              }`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Icon name="HeartIcon" size={18} variant={wishlisted ? 'solid' : 'outline'} />
            </button>

            {/* Image Nav Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((i) => (i > 0 ? i - 1 : product.images.length - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/70 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-background/90"
                  aria-label="Previous image"
                >
                  <Icon name="ChevronLeftIcon" size={16} />
                </button>
                <button
                  onClick={() => setSelectedImage((i) => (i < product.images.length - 1 ? i + 1 : 0))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/70 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-background/90"
                  aria-label="Next image"
                >
                  <Icon name="ChevronRightIcon" size={16} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImage === idx ? 'border-primary' : 'border-border hover:border-primary/40'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <AppImage
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col gap-5">
          {/* Brand + Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-primary">{product.brand}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-xs text-muted-foreground">{product.category} / {product.subcategory}</span>
            {product.isNew && (
              <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full text-[10px] font-bold text-green-400">
                NEW
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
            {product.name}
          </h1>

          {/* Rating Row */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} size={16} />
              <span className="text-sm font-semibold text-foreground">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
            <span className="text-sm text-muted-foreground">
              {product.soldCount.toLocaleString()} sold
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-3xl font-bold text-foreground">${product.price}</span>
            {product.discount > 0 && (
              <>
                <span className="text-lg price-strike text-muted-foreground">${product.originalPrice}</span>
                <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-lg text-sm font-bold text-green-400">
                  -{product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Delivery Info */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/50 border border-border rounded-xl">
            <Icon name="TruckIcon" size={16} className="text-primary shrink-0" />
            <span className="text-sm text-muted-foreground">
              Free delivery in <span className="text-foreground font-semibold">{product.deliveryDays} days</span>
            </span>
            <span className="ml-auto text-xs text-green-400 font-semibold">FREE</span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${product.stock > 20 ? 'bg-green-400' : product.stock > 0 ? 'bg-amber-400 animate-pulse' : 'bg-red-400'}`} />
            <span className={`text-sm font-medium ${product.stock > 20 ? 'text-green-400' : product.stock > 0 ? 'text-amber-400' : 'text-red-400'}`}>
              {product.stock > 20 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left!` : 'Out of Stock'}
            </span>
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-foreground mb-2.5">
                Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                      selectedColor === color
                        ? 'border-primary bg-primary/10 text-primary' :'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-foreground mb-2.5">
                Size: <span className="font-normal text-muted-foreground">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-primary' :'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">Qty:</span>
            <div className="flex items-center gap-1 glass-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                aria-label="Decrease quantity"
              >
                <Icon name="MinusIcon" size={14} />
              </button>
              <span className="w-10 text-center text-sm font-bold text-foreground">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                aria-label="Increase quantity"
              >
                <Icon name="PlusIcon" size={14} />
              </button>
            </div>
            <span className="text-xs text-muted-foreground">{product.stock} available</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                addedToCart
                  ? 'bg-green-500 text-white' :'bg-primary hover:bg-primary/90 text-primary-foreground glow-violet'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Icon name={addedToCart ? 'CheckIcon' : 'ShoppingCartIcon'} size={16} />
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="BoltIcon" size={16} variant="solid" />
              Buy Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { icon: 'ShieldCheckIcon', label: 'Buyer Protection' },
              { icon: 'ArrowPathIcon', label: '30-Day Returns' },
              { icon: 'LockClosedIcon', label: 'Secure Payment' },
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-1.5 p-2.5 glass-card border border-border rounded-xl text-center">
                <Icon name={badge.icon as 'ShieldCheckIcon'} size={18} className="text-primary" />
                <span className="text-[10px] text-muted-foreground font-medium leading-tight">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-3 p-3 glass-card border border-border rounded-xl">
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <Icon name="BuildingStorefrontIcon" size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Sold by</p>
              <p className="text-sm font-semibold text-foreground truncate">{product.seller}</p>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="StarIcon" size={12} className="text-accent" variant="solid" />
              <span className="text-xs font-semibold text-foreground">4.9</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-10">
        {/* Tab Bar */}
        <div className="flex border-b border-border mb-6 overflow-x-auto scrollbar-hide">
          {([
            { id: 'description', label: 'Description' },
            { id: 'specifications', label: 'Specifications' },
            { id: 'reviews', label: `Reviews (${product.reviewCount.toLocaleString()})` },
          ] as { id: TabId; label: string }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'tab-active text-foreground' : 'tab-inactive hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'description' && (
          <div className="glass-card border border-border rounded-2xl p-6">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {product.description}
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                { icon: 'CheckCircleIcon', text: `Free ${product.deliveryDays}-day delivery` },
                { icon: 'CheckCircleIcon', text: '30-day easy returns' },
                { icon: 'CheckCircleIcon', text: '100% authentic product' },
                { icon: 'CheckCircleIcon', text: 'Verified seller' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <Icon name="CheckCircleIcon" size={16} className="text-green-400 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <SpecificationsTab specifications={product.specifications} />
        )}

        {activeTab === 'reviews' && (
          <ReviewsTab
            reviews={reviews}
            rating={product.rating}
            reviewCount={product.reviewCount}
            ratingBreakdown={ratingBreakdown}
          />
        )}
      </div>

      {/* Related Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Related Products</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollRelated('left')}
              className="w-8 h-8 glass-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
              aria-label="Scroll left"
            >
              <Icon name="ChevronLeftIcon" size={14} />
            </button>
            <button
              onClick={() => scrollRelated('right')}
              className="w-8 h-8 glass-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
              aria-label="Scroll right"
            >
              <Icon name="ChevronRightIcon" size={14} />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {relatedProducts.map((p) => (
            <div key={p.id} className="shrink-0 w-44 sm:w-52">
              <ProductCard product={p} layout="grid" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
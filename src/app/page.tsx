'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { products } from '@/lib/mockData';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  quantity: number;
  color: string;
  size: string;
  seller: string;
  stock: number;
}

const initialCartItems: CartItem[] = [
  {
    id: 'ci-1',
    productId: products[0].id,
    name: products[0].name,
    brand: products[0].brand,
    image: products[0].images[0],
    price: products[0].price,
    originalPrice: products[0].originalPrice,
    discount: products[0].discount,
    quantity: 1,
    color: products[0].colors[0],
    size: '',
    seller: products[0].seller,
    stock: products[0].stock,
  },
  {
    id: 'ci-2',
    productId: products[2].id,
    name: products[2].name,
    brand: products[2].brand,
    image: products[2].images[0],
    price: products[2].price,
    originalPrice: products[2].originalPrice,
    discount: products[2].discount,
    quantity: 2,
    color: products[2].colors[0],
    size: products[2].sizes[2] ?? '',
    seller: products[2].seller,
    stock: products[2].stock,
  },
  {
    id: 'ci-3',
    productId: products[6].id,
    name: products[6].name,
    brand: products[6].brand,
    image: products[6].images[0],
    price: products[6].price,
    originalPrice: products[6].originalPrice,
    discount: products[6].discount,
    quantity: 1,
    color: products[6].colors[0],
    size: '',
    seller: products[6].seller,
    stock: products[6].stock,
  },
];

const COUPONS: Record<string, number> = {
  SAVE10: 10,
  HIVE20: 20,
  VENDOR15: 15,
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [removingId, setRemovingId] = useState<string | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.stock, item.quantity + delta)) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon({ code, discount: COUPONS[code] });
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try SAVE10, HIVE20, or VENDOR15.');
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const productDiscount = originalTotal - subtotal;
  const couponDiscount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discount) / 100) : 0;
  const shipping = subtotal > 500 ? 0 : 9.99;
  const tax = Math.round((subtotal - couponDiscount) * 0.08 * 100) / 100;
  const total = subtotal - couponDiscount + shipping + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Icon name="ShoppingCartIcon" size={40} className="text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven&apos;t added anything yet. Explore our products and find something you love.
          </p>
          <Link
            href="/product-listing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            <Icon name="ShoppingBagIcon" size={18} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      {/* Ambient blobs */}
      <div className="fixed top-20 left-0 w-96 h-96 blob-violet opacity-20 pointer-events-none" />
      <div className="fixed bottom-20 right-0 w-80 h-80 blob-amber opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={14} />
            <span className="text-foreground font-medium">Shopping Cart</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              Shopping Cart{' '}
              <span className="text-muted-foreground text-xl font-normal">({totalItems} items)</span>
            </h1>
            <Link
              href="/product-listing"
              className="hidden sm:flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Icon name="ArrowLeftIcon" size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`glass-card rounded-2xl p-4 sm:p-5 transition-all duration-300 ${
                  removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link href={`/product-details?id=${item.productId}`} className="shrink-0">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted border border-border">
                      <AppImage
                        src={item.image}
                        alt={`${item.name} — ${item.brand} product image in cart`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="112px"
                      />
                      {item.discount > 0 && (
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-md">
                          -{item.discount}%
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">{item.brand}</p>
                        <Link href={`/product-details?id=${item.productId}`}>
                          <h3 className="text-sm sm:text-base font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">Sold by: {item.seller}</p>
                        {(item.color || item.size) && (
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            {item.color && (
                              <span className="px-2 py-0.5 bg-muted border border-border rounded-md text-xs text-muted-foreground">
                                {item.color}
                              </span>
                            )}
                            {item.size && (
                              <span className="px-2 py-0.5 bg-muted border border-border rounded-md text-xs text-muted-foreground">
                                Size: {item.size}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all shrink-0"
                        aria-label="Remove item"
                      >
                        <Icon name="TrashIcon" size={16} />
                      </button>
                    </div>

                    {/* Price + Quantity Row */}
                    <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                      {/* Price */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-foreground">${item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground price-strike">${item.originalPrice}</span>
                        )}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-1 bg-muted border border-border rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Icon name="MinusIcon" size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          aria-label="Increase quantity"
                        >
                          <Icon name="PlusIcon" size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {item.stock <= 10 && (
                          <span className="text-amber-400">Only {item.stock} left in stock</span>
                        )}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Section */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Icon name="TagIcon" size={16} className="text-primary" />
                Apply Coupon Code
              </h3>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircleIcon" size={18} className="text-primary" />
                    <span className="text-sm font-semibold text-primary">{appliedCoupon.code}</span>
                    <span className="text-sm text-muted-foreground">— {appliedCoupon.discount}% off applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                    placeholder="Enter coupon code"
                    className="flex-1 bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={14} />
                  {couponError}
                </p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-5 sticky top-24">
              <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <Icon name="ReceiptPercentIcon" size={20} className="text-primary" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Product Discount</span>
                  <span className="text-green-400 font-medium">-${productDiscount.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Coupon ({appliedCoupon.code})</span>
                    <span className="text-green-400 font-medium">-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-400 font-medium">FREE</span>
                  ) : (
                    <span className="text-foreground font-medium">${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
                </div>

                {shipping > 0 && (
                  <div className="p-3 bg-amber-400/10 border border-amber-400/20 rounded-xl">
                    <p className="text-xs text-amber-400 flex items-center gap-1.5">
                      <Icon name="TruckIcon" size={14} />
                      Add ${(500 - subtotal).toFixed(2)} more for free shipping
                    </p>
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground">${total.toFixed(2)}</div>
                    {(productDiscount + couponDiscount) > 0 && (
                      <div className="text-xs text-green-400">
                        You save ${(productDiscount + couponDiscount).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                <Icon name="LockClosedIcon" size={18} />
                Proceed to Checkout
              </Link>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="ShieldCheckIcon" size={12} className="text-primary" />
                  Secure Checkout
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="ArrowPathIcon" size={12} className="text-primary" />
                  Easy Returns
                </span>
              </div>

              {/* Accepted Payments */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center mb-2">Accepted Payment Methods</p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                    <span
                      key={method}
                      className="px-2.5 py-1 bg-muted border border-border rounded-lg text-xs text-muted-foreground"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

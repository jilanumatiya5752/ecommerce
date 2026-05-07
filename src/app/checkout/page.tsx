'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { products } from '@/lib/mockData';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

type PaymentMethod = 'card' | 'paypal' | 'cod';

interface CardForm {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

// ─── Mock order items ─────────────────────────────────────────────────────────

const orderItems = [
  { id: 'ci-1', name: products[0].name, brand: products[0].brand, image: products[0].images[0], price: products[0].price, quantity: 1, color: products[0].colors[0], size: '' },
  { id: 'ci-2', name: products[2].name, brand: products[2].brand, image: products[2].images[0], price: products[2].price, quantity: 2, color: products[2].colors[0], size: products[2].sizes[2] ?? '' },
  { id: 'ci-3', name: products[6].name, brand: products[6].brand, image: products[6].images[0], price: products[6].price, quantity: 1, color: products[6].colors[0], size: '' },
];

const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
const shipping = subtotal > 500 ? 0 : 9.99;
const tax = Math.round(subtotal * 0.08 * 100) / 100;
const total = subtotal + shipping + tax;

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Shipping', icon: 'TruckIcon' },
  { id: 2, label: 'Payment', icon: 'CreditCardIcon' },
  { id: 3, label: 'Review', icon: 'ClipboardDocumentListIcon' },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, idx) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                current > step.id
                  ? 'bg-primary border-primary text-primary-foreground'
                  : current === step.id
                  ? 'bg-primary/20 border-primary text-primary' :'bg-muted border-border text-muted-foreground'
              }`}
            >
              {current > step.id ? (
                <Icon name="CheckIcon" size={18} />
              ) : (
                <Icon name={step.icon as 'TruckIcon'} size={18} />
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                current >= step.id ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-16 sm:w-24 mx-1 mb-5 transition-all duration-500 ${
                current > step.id ? 'bg-primary' : 'bg-border'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Order Summary Sidebar ────────────────────────────────────────────────────

function OrderSummary({ compact = false }: { compact?: boolean }) {
  const [expanded, setExpanded] = useState(!compact);

  return (
    <div className="glass-card rounded-2xl p-5">
      <button
        className="flex items-center justify-between w-full"
        onClick={() => compact && setExpanded((v) => !v)}
      >
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Icon name="ShoppingBagIcon" size={18} className="text-primary" />
          Order Summary
        </h3>
        {compact && (
          <Icon
            name={expanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            size={16}
            className="text-muted-foreground"
          />
        )}
      </button>

      {expanded && (
        <>
          <div className="mt-4 space-y-3">
            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted border border-border shrink-0">
                  <AppImage
                    src={item.image}
                    alt={`${item.name} — ${item.brand} checkout order item`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                  <p className="text-sm font-medium text-foreground line-clamp-2">{item.name}</p>
                  {(item.color || item.size) && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {[item.color, item.size && `Size: ${item.size}`].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
                <span className="text-sm font-semibold text-foreground shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              {shipping === 0 ? (
                <span className="text-green-400">FREE</span>
              ) : (
                <span className="text-foreground">${shipping.toFixed(2)}</span>
              )}
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span className="text-foreground">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-xl text-foreground">${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Step 1: Shipping ─────────────────────────────────────────────────────────

function ShippingStep({
  form,
  onChange,
  onNext,
}: {
  form: ShippingForm;
  onChange: (f: ShippingForm) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});

  const validate = () => {
    const e: Partial<ShippingForm> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (!form.zip.trim()) e.zip = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const field = (
    key: keyof ShippingForm,
    label: string,
    placeholder: string,
    type = 'text',
    colSpan = 'col-span-1'
  ) => (
    <div className={colSpan}>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => onChange({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className={`w-full bg-muted border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors ${
          errors[key] ? 'border-red-500/60 focus:border-red-500' : 'border-border focus:border-primary/50'
        }`}
      />
      {errors[key] && <p className="text-xs text-red-400 mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Icon name="MapPinIcon" size={22} className="text-primary" />
        Shipping Address
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {field('firstName', 'First Name', 'John')}
        {field('lastName', 'Last Name', 'Doe')}
        {field('email', 'Email Address', 'john@example.com', 'email', 'col-span-2')}
        {field('phone', 'Phone Number', '+1 (555) 000-0000', 'tel', 'col-span-2')}
        {field('address', 'Street Address', '123 Main Street, Apt 4B', 'text', 'col-span-2')}
        {field('city', 'City', 'New York')}
        {field('state', 'State / Province', 'NY')}
        {field('zip', 'ZIP / Postal Code', '10001')}
        {field('country', 'Country', 'United States', 'text')}
      </div>

      {/* Delivery Options */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="TruckIcon" size={16} className="text-primary" />
          Delivery Options
        </h3>
        <div className="space-y-2">
          {[
            { id: 'standard', label: 'Standard Delivery', sub: '5–7 business days', price: 'FREE', highlight: false },
            { id: 'express', label: 'Express Delivery', sub: '2–3 business days', price: '$9.99', highlight: false },
            { id: 'overnight', label: 'Overnight Delivery', sub: 'Next business day', price: '$19.99', highlight: true },
          ].map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                opt.id === 'standard' ?'border-primary/40 bg-primary/5' :'border-border hover:border-primary/30 bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input type="radio" name="delivery" defaultChecked={opt.id === 'standard'} className="accent-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.sub}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${opt.id === 'standard' ? 'text-green-400' : 'text-foreground'}`}>
                {opt.price}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
      >
        Continue to Payment
        <Icon name="ArrowRightIcon" size={18} />
      </button>
    </div>
  );
}

// ─── Step 2: Payment ──────────────────────────────────────────────────────────

function PaymentStep({
  method,
  setMethod,
  cardForm,
  setCardForm,
  onNext,
  onBack,
}: {
  method: PaymentMethod;
  setMethod: (m: PaymentMethod) => void;
  cardForm: CardForm;
  setCardForm: (f: CardForm) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Icon name="CreditCardIcon" size={22} className="text-primary" />
        Payment Method
      </h2>

      {/* Method Selector */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {([
          { id: 'card', label: 'Credit Card', icon: 'CreditCardIcon' },
          { id: 'paypal', label: 'PayPal', icon: 'GlobeAltIcon' },
          { id: 'cod', label: 'Cash on Delivery', icon: 'BanknotesIcon' },
        ] as { id: PaymentMethod; label: string; icon: string }[]).map((opt) => (
          <button
            key={opt.id}
            onClick={() => setMethod(opt.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
              method === opt.id
                ? 'border-primary/50 bg-primary/10 text-primary' :'border-border bg-muted/50 text-muted-foreground hover:border-primary/30'
            }`}
          >
            <Icon name={opt.icon as 'CreditCardIcon'} size={22} />
            <span className="text-xs font-medium text-center leading-tight">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Card Form */}
      {method === 'card' && (
        <div className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Card Number</label>
            <div className="relative">
              <input
                type="text"
                value={cardForm.number}
                onChange={(e) => setCardForm({ ...cardForm, number: formatCard(e.target.value) })}
                placeholder="1234 5678 9012 3456"
                className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors pr-12"
              />
              <Icon name="CreditCardIcon" size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Cardholder Name</label>
            <input
              type="text"
              value={cardForm.name}
              onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
              placeholder="John Doe"
              className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Expiry Date</label>
              <input
                type="text"
                value={cardForm.expiry}
                onChange={(e) => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                placeholder="MM/YY"
                className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">CVV</label>
              <input
                type="password"
                value={cardForm.cvv}
                onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                placeholder="•••"
                className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-xl">
            <Icon name="LockClosedIcon" size={14} className="text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">Your payment info is encrypted with 256-bit SSL security.</p>
          </div>
        </div>
      )}

      {method === 'paypal' && (
        <div className="p-6 bg-muted/50 border border-border rounded-xl text-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="GlobeAltIcon" size={28} className="text-blue-400" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Pay with PayPal</p>
          <p className="text-xs text-muted-foreground">You will be redirected to PayPal to complete your payment securely.</p>
        </div>
      )}

      {method === 'cod' && (
        <div className="p-6 bg-muted/50 border border-border rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <Icon name="BanknotesIcon" size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Cash on Delivery</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pay with cash when your order is delivered. An additional handling fee of $2.00 may apply.
                Please have the exact amount ready.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-muted border border-border rounded-xl font-semibold text-foreground hover:bg-muted/80 transition-all"
        >
          <Icon name="ArrowLeftIcon" size={18} />
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
        >
          Review Order
          <Icon name="ArrowRightIcon" size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Review ───────────────────────────────────────────────────────────

function ReviewStep({
  shipping,
  method,
  onBack,
  onPlace,
}: {
  shipping: ShippingForm;
  method: PaymentMethod;
  onBack: () => void;
  onPlace: () => void;
}) {
  const methodLabels: Record<PaymentMethod, string> = {
    card: 'Credit / Debit Card',
    paypal: 'PayPal',
    cod: 'Cash on Delivery',
  };

  return (
    <div className="animate-fade-up space-y-5">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <Icon name="ClipboardDocumentListIcon" size={22} className="text-primary" />
        Review Your Order
      </h2>

      {/* Shipping Summary */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="MapPinIcon" size={16} className="text-primary" />
            Shipping Address
          </h3>
          <button className="text-xs text-primary hover:text-primary/80 transition-colors">Edit</button>
        </div>
        <p className="text-sm text-foreground font-medium">{shipping.firstName} {shipping.lastName}</p>
        <p className="text-sm text-muted-foreground">{shipping.address}</p>
        <p className="text-sm text-muted-foreground">{shipping.city}, {shipping.state} {shipping.zip}</p>
        <p className="text-sm text-muted-foreground">{shipping.country}</p>
        <p className="text-sm text-muted-foreground mt-1">{shipping.email} · {shipping.phone}</p>
      </div>

      {/* Payment Summary */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="CreditCardIcon" size={16} className="text-primary" />
            Payment Method
          </h3>
          <button className="text-xs text-primary hover:text-primary/80 transition-colors">Edit</button>
        </div>
        <p className="text-sm text-foreground">{methodLabels[method]}</p>
      </div>

      {/* Items */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="ShoppingBagIcon" size={16} className="text-primary" />
          Items ({orderItems.length})
        </h3>
        <div className="space-y-3">
          {orderItems.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted border border-border shrink-0">
                <AppImage
                  src={item.image}
                  alt={`${item.name} — ${item.brand} order review item`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold text-foreground shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="glass-card rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          {shipping.zip ? (
            <span className={shipping === 0 ? 'text-green-400' : 'text-foreground'}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          ) : (
            <span className="text-foreground">${(9.99).toFixed(2)}</span>
          )}
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span className="text-foreground">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t border-border">
          <span className="text-foreground">Total</span>
          <span className="text-xl text-foreground">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-muted border border-border rounded-xl font-semibold text-foreground hover:bg-muted/80 transition-all"
        >
          <Icon name="ArrowLeftIcon" size={18} />
          Back
        </button>
        <button
          onClick={onPlace}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
        >
          <Icon name="LockClosedIcon" size={18} />
          Place Order
        </button>
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-96 h-96 blob-violet opacity-30 pointer-events-none" />
      <div className="text-center max-w-md mx-auto px-4 relative z-10">
        {/* Animated checkmark */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-40" />
          <div className="relative w-28 h-28 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Icon name="CheckIcon" size={36} className="text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed!</h1>
        <p className="text-muted-foreground mb-2">
          Your order has been confirmed and is being processed.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl mb-8">
          <Icon name="HashtagIcon" size={14} className="text-primary" />
          <span className="text-sm font-semibold text-primary">Order #VH-{Math.floor(100000 + Math.random() * 900000)}</span>
        </div>

        {/* Tracking Steps */}
        <div className="glass-card rounded-2xl p-5 mb-8 text-left">
          <h3 className="text-sm font-semibold text-foreground mb-4">What happens next?</h3>
          <div className="space-y-3">
            {[
              { label: 'Order Confirmed', sub: 'We\'ve received your order', done: true },
              { label: 'Processing', sub: 'Seller is preparing your items', done: false },
              { label: 'Shipped', sub: 'Your order is on its way', done: false },
              { label: 'Delivered', sub: 'Estimated in 2–5 business days', done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${step.done ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border text-muted-foreground'}`}>
                  {step.done ? <Icon name="CheckIcon" size={12} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                </div>
                <div>
                  <p className={`text-sm font-medium ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-muted border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted/80 transition-all"
          >
            <Icon name="HomeIcon" size={16} />
            Back to Home
          </Link>
          <Link
            href="/product-listing"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            <Icon name="ShoppingBagIcon" size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Checkout Page ───────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardForm, setCardForm] = useState<CardForm>({ number: '', name: '', expiry: '', cvv: '' });

  if (orderPlaced) return <OrderSuccess />;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="fixed top-20 left-0 w-96 h-96 blob-violet opacity-20 pointer-events-none" />
      <div className="fixed bottom-20 right-0 w-80 h-80 blob-amber opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href="/cart" className="hover:text-foreground transition-colors">Cart</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground font-medium">Checkout</span>
        </nav>

        <StepIndicator current={step} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 sm:p-8">
            {step === 1 && (
              <ShippingStep
                form={shippingForm}
                onChange={setShippingForm}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <PaymentStep
                method={paymentMethod}
                setMethod={setPaymentMethod}
                cardForm={cardForm}
                setCardForm={setCardForm}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <ReviewStep
                shipping={shippingForm}
                method={paymentMethod}
                onBack={() => setStep(2)}
                onPlace={() => setOrderPlaced(true)}
              />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Filters } from './ProductListingClient';

interface ActiveFiltersProps {
  filters: Filters;
  onRemove: (type: string, value?: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  const chips: { label: string; type: string; value?: string }[] = [
    ...filters.categories.map((c) => ({ label: c, type: 'category', value: c })),
    ...filters.brands.map((b) => ({ label: b, type: 'brand', value: b })),
    ...(filters.priceMin > 0 || filters.priceMax < 2000
      ? [{ label: `$${filters.priceMin} – $${filters.priceMax}`, type: 'price' }]
      : []),
    ...(filters.rating > 0 ? [{ label: `${filters.rating}★ & up`, type: 'rating' }] : []),
    ...(filters.inStock ? [{ label: 'In Stock', type: 'inStock' }] : []),
  ];

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <span className="text-xs text-muted-foreground font-medium shrink-0">Active:</span>
      {chips.map((chip) => (
        <button
          key={`${chip.type}-${chip.value ?? ''}`}
          onClick={() => onRemove(chip.type, chip.value)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary hover:bg-primary/20 transition-all group"
        >
          {chip.label}
          <Icon name="XMarkIcon" size={11} className="group-hover:scale-110 transition-transform" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground border border-border hover:border-border rounded-full transition-all"
      >
        Clear all
      </button>
    </div>
  );
}
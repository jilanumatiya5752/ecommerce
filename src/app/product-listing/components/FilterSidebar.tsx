'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Filters } from './ProductListingClient';

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  categories: string[];
  brands: string[];
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3"
      >
        {title}
        <Icon name={open ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={14} className="text-muted-foreground" />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, categories, brands }: FilterSidebarProps) {
  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  const clearAll = () => {
    onChange({ categories: [], brands: [], priceMin: 0, priceMax: 2000, rating: 0, inStock: false });
  };

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.priceMin > 0 || filters.priceMax < 2000 ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  return (
    <div className="glass-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="AdjustmentsHorizontalIcon" size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">Filters</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="px-4">
        {/* Categories */}
        <FilterSection title="Category">
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => toggleCategory(cat)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${
                    filters.categories.includes(cat)
                      ? 'bg-primary border-primary' :'border-border group-hover:border-primary/50'
                  }`}
                >
                  {filters.categories.includes(cat) && (
                    <Icon name="CheckIcon" size={10} className="text-primary-foreground" />
                  )}
                </div>
                <span
                  onClick={() => toggleCategory(cat)}
                  className={`text-sm transition-colors cursor-pointer ${
                    filters.categories.includes(cat) ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>${filters.priceMin}</span>
              <span>${filters.priceMax}</span>
            </div>
            <div className="space-y-3">
              <input
                type="range"
                min={0}
                max={2000}
                step={10}
                value={filters.priceMin}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val < filters.priceMax) onChange({ ...filters, priceMin: val });
                }}
                className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer price-range-thumb accent-primary"
              />
              <input
                type="range"
                min={0}
                max={2000}
                step={10}
                value={filters.priceMax}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > filters.priceMin) onChange({ ...filters, priceMax: val });
                }}
                className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer price-range-thumb accent-primary"
              />
            </div>
            {/* Quick price buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Under $50', min: 0, max: 50 },
                { label: '$50–$200', min: 50, max: 200 },
                { label: '$200–$500', min: 200, max: 500 },
                { label: '$500+', min: 500, max: 2000 },
              ].map((range) => (
                <button
                  key={range.label}
                  onClick={() => onChange({ ...filters, priceMin: range.min, priceMax: range.max })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                    filters.priceMin === range.min && filters.priceMax === range.max
                      ? 'bg-primary/20 border-primary/40 text-primary' :'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Min Rating">
          <div className="space-y-2">
            {[4, 3, 2, 1].map((r) => (
              <button
                key={r}
                onClick={() => onChange({ ...filters, rating: filters.rating === r ? 0 : r })}
                className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg transition-all text-sm ${
                  filters.rating === r
                    ? 'bg-primary/10 border border-primary/30 text-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="11" height="11" viewBox="0 0 24 24" fill={star <= r ? '#F59E0B' : 'none'} stroke={star <= r ? '#F59E0B' : '#374151'} strokeWidth={2}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs">& Up</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brand" defaultOpen={false}>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => toggleBrand(brand)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${
                    filters.brands.includes(brand)
                      ? 'bg-primary border-primary' :'border-border group-hover:border-primary/50'
                  }`}
                >
                  {filters.brands.includes(brand) && (
                    <Icon name="CheckIcon" size={10} className="text-primary-foreground" />
                  )}
                </div>
                <span
                  onClick={() => toggleBrand(brand)}
                  className={`text-sm transition-colors cursor-pointer ${
                    filters.brands.includes(brand) ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={() => onChange({ ...filters, inStock: !filters.inStock })}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${
                filters.inStock ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50'
              }`}
            >
              {filters.inStock && <Icon name="CheckIcon" size={10} className="text-primary-foreground" />}
            </div>
            <span
              onClick={() => onChange({ ...filters, inStock: !filters.inStock })}
              className={`text-sm cursor-pointer transition-colors ${filters.inStock ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}
            >
              In Stock Only
            </span>
          </label>
        </FilterSection>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from './FilterSidebar';
import ActiveFilters from './ActiveFilters';
import { products, brands, categories } from '@/lib/mockData';

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popularity';
type ViewMode = 'grid' | 'list';

export interface Filters {
  categories: string[];
  brands: string[];
  priceMin: number;
  priceMax: number;
  rating: number;
  inStock: boolean;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ProductListingClient() {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    brands: [],
    priceMin: 0,
    priceMax: 2000,
    rating: 0,
    inStock: false,
  });
  const [sort, setSort] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading] = useState(false);
  const ITEMS_PER_PAGE = 8;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    result = result.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );

    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    if (filters.inStock) {
      result = result.filter((p) => p.stock > 0);
    }

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popularity': result.sort((a, b) => b.soldCount - a.soldCount); break;
      case 'newest': result.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1)); break;
    }

    return result;
  }, [filters, sort, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const clearFilters = useCallback(() => {
    setFilters({ categories: [], brands: [], priceMin: 0, priceMax: 2000, rating: 0, inStock: false });
    setSearchQuery('');
    setPage(1);
  }, []);

  const removeFilter = useCallback((type: string, value?: string) => {
    setFilters((prev) => {
      switch (type) {
        case 'category': return { ...prev, categories: prev.categories.filter((c) => c !== value) };
        case 'brand': return { ...prev, brands: prev.brands.filter((b) => b !== value) };
        case 'price': return { ...prev, priceMin: 0, priceMax: 2000 };
        case 'rating': return { ...prev, rating: 0 };
        case 'inStock': return { ...prev, inStock: false };
        default: return prev;
      }
    });
    setPage(1);
  }, []);

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    (filters.priceMin > 0 || filters.priceMax < 2000 ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground py-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <span className="text-foreground font-medium">All Products</span>
      </nav>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">All Products</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {filteredProducts.length} products found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Search + Sort + View Toggle Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
        {/* Search */}
        <div className="flex items-center flex-1 bg-muted border border-border rounded-xl px-3 py-2.5 gap-2 focus-within:border-primary/50">
          <Icon name="MagnifyingGlassIcon" size={16} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); setPage(1); }} className="text-muted-foreground hover:text-foreground shrink-0">
              <Icon name="XMarkIcon" size={14} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value as SortOption); setPage(1); }}
            className="appearance-none bg-muted border border-border rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-foreground outline-none cursor-pointer hover:border-primary/40 transition-colors min-w-[180px]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Icon name="ChevronDownIcon" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>

        {/* Filter Toggle (mobile) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 glass-card border border-border hover:border-primary/40 rounded-xl text-sm font-medium text-foreground transition-all md:hidden"
        >
          <Icon name="AdjustmentsHorizontalIcon" size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* View Toggle */}
        <div className="flex items-center bg-muted border border-border rounded-xl p-1 gap-1 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            aria-label="Grid view"
          >
            <Icon name="Squares2X2Icon" size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            aria-label="List view"
          >
            <Icon name="ListBulletIcon" size={16} />
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <ActiveFilters
          filters={filters}
          onRemove={removeFilter}
          onClearAll={clearFilters}
        />
      )}

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Sidebar — Desktop */}
        <aside className="hidden md:block w-64 shrink-0">
          <FilterSidebar
            filters={filters}
            onChange={(f) => { setFilters(f); setPage(1); }}
            categories={categories.map((c) => c.name)}
            brands={brands}
          />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="absolute top-0 left-0 bottom-0 w-80 bg-card border-r border-border overflow-y-auto animate-slide-left">
              <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card z-10">
                <span className="font-semibold text-foreground">Filters</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all">
                  <Icon name="XMarkIcon" size={18} />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar
                  filters={filters}
                  onChange={(f) => { setFilters(f); setPage(1); }}
                  categories={categories.map((c) => c.name)}
                  brands={brands}
                />
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className={`grid gap-3 md:gap-4 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <div className="skeleton-pulse aspect-square rounded-xl mb-2" />
                  <div className="skeleton-pulse h-3 rounded mb-1.5 w-3/4" />
                  <div className="skeleton-pulse h-3 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-2xl bg-muted border border-border flex items-center justify-center mb-5">
                <Icon name="MagnifyingGlassIcon" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div
                className={`grid gap-3 md:gap-4 ${
                  viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                }`}
              >
                {paginatedProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <ProductCard product={product} layout={viewMode} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-9 h-9 glass-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous page"
                  >
                    <Icon name="ChevronLeftIcon" size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                        page === p
                          ? 'bg-primary text-primary-foreground'
                          : 'glass-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-9 h-9 glass-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Next page"
                  >
                    <Icon name="ChevronRightIcon" size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
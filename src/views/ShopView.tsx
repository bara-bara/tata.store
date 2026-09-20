import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

type SortOption = 'newest' | 'bestseller' | 'price_asc' | 'price_desc' | 'sale';

export const ShopView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategorySlug,
    setSelectedCategorySlug,
    searchQuery,
    setSearchQuery,
    wishlist,
  } = useStore();

  const [sortBy, setSortBy] = useState<SortOption>('bestseller');
  const [onlySale, setOnlySale] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isWishlistView, setIsWishlistView] = useState(false);

  // Sync category slug from context if provided
  const activeCategory = useMemo(() => {
    if (!selectedCategorySlug) return null;
    return categories.find(c => c.slug === selectedCategorySlug) || null;
  }, [selectedCategorySlug, categories]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (isWishlistView) {
          return wishlist.includes(p.id);
        }
        if (activeCategory && p.categoryId !== activeCategory.id) {
          return false;
        }
        if (onlySale && (!p.compareAtPrice || p.compareAtPrice <= p.price)) {
          return false;
        }
        if (onlyInStock && p.stock <= 0) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q));
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'price_asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price_desc') {
          return b.price - a.price;
        }
        if (sortBy === 'sale') {
          const discA = a.compareAtPrice ? a.compareAtPrice - a.price : 0;
          const discB = b.compareAtPrice ? b.compareAtPrice - b.price : 0;
          return discB - discA;
        }
        // default bestseller
        const rankA = a.isBestSeller || a.badge === 'bestseller' ? 1 : 0;
        const rankB = b.isBestSeller || b.badge === 'bestseller' ? 1 : 0;
        return rankB - rankA;
      });
  }, [products, activeCategory, onlySale, onlyInStock, isWishlistView, wishlist, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategorySlug(null);
    setSearchQuery('');
    setOnlySale(false);
    setOnlyInStock(false);
    setIsWishlistView(false);
    setSortBy('bestseller');
  };

  const getPageTitle = () => {
    if (isWishlistView) return 'المنتجات المفضلة';
    if (activeCategory) return activeCategory.name;
    if (searchQuery) return `نتائج البحث عن: "${searchQuery}"`;
    return 'المتجر';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-right">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-border">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {getPageTitle()}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'منتوج' : 'منتوجات'} متوفرة
          </p>
        </div>

        {/* Sort & Filters Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* In Stock toggle */}
          <button
            onClick={() => setOnlyInStock(!onlyInStock)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer border ${
              onlyInStock
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-foreground/80 border-border hover:border-primary'
            }`}
          >
            متوفر فقط
          </button>

          {/* On Sale toggle */}
          <button
            onClick={() => setOnlySale(!onlySale)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer border ${
              onlySale
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-card text-foreground/80 border-border hover:border-red-500'
            }`}
          >
            عروض خاصة
          </button>

          {/* Sort Select */}
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium text-foreground outline-none cursor-pointer hover:border-primary"
            >
              <option value="bestseller">الأكثر مبيعاً</option>
              <option value="newest">الأحدث</option>
              <option value="price_asc">السعر: من الأقل للأعلى</option>
              <option value="price_desc">السعر: من الأعلى للأقل</option>
              <option value="sale">أعلى تخفيض</option>
            </select>
          </div>

          {(activeCategory || searchQuery || onlySale || onlyInStock || isWishlistView) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 cursor-pointer"
            >
              <X size={14} />
              <span>مسح التصفية</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <button
          onClick={() => {
            setSelectedCategorySlug(null);
            setIsWishlistView(false);
          }}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
            !activeCategory && !isWishlistView
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'bg-muted text-foreground/80 hover:bg-muted/80'
          }`}
        >
          الكل ({products.length})
        </button>

        {categories.map(cat => {
          const count = products.filter(p => p.categoryId === cat.id).length;
          const isSelected = activeCategory?.id === cat.id && !isWishlistView;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategorySlug(cat.slug);
                setIsWishlistView(false);
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted text-foreground/80 hover:bg-muted/80'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-xs opacity-75`}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-card rounded-2xl border border-border p-8">
          <p className="text-lg font-bold text-foreground">لا توجد منتجات تطابق بحثك</p>
          <p className="text-sm text-muted-foreground">
            جرب اختيار فئة أخرى أو إلغاء فلاتر التصفية للعثور على ما تبحث عنه.
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-2.5 rounded-full text-sm hover:bg-accent transition cursor-pointer"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      )}
    </div>
  );
};

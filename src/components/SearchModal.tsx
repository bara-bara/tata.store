import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeft, Star, Tag, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    products,
    categories,
    navigateToProduct,
    navigateToCategory,
    navigateToShop,
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  // Filter products by name, description, category, ingredients, or tags
  const filteredProducts: Product[] = query.trim()
    ? products.filter(p => {
        const q = query.toLowerCase().trim();
        const cat = categories.find(c => c.id === p.categoryId);
        return (
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          (p.ingredients && p.ingredients.toLowerCase().includes(q)) ||
          p.tags.some(tag => tag.toLowerCase().includes(q)) ||
          (cat && cat.name.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectProduct = (productId: string) => {
    navigateToProduct(productId);
    setSearchModalOpen(false);
  };

  const handleSelectCategory = (slug: string) => {
    navigateToCategory(slug);
    setSearchModalOpen(false);
  };

  const handleSearchAll = () => {
    navigateToShop();
    setSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 sm:pt-16 animate-in fade-in duration-150 text-right">
      <div className="relative bg-[#FAF7F2] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#E8DDCF]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E8DDCF] bg-white flex items-center gap-3">
          <Search className="w-6 h-6 text-[#2D5A27] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="ابحث عن تمور بوفقوس، كسكس خماسي، زعتر، عسل دغموس..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-[#2D241E] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#8C7A6B] hover:bg-[#F0EAE1]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="p-2 rounded-xl text-xs font-bold bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#633C1A] transition-colors"
          >
            إغلاق
          </button>
        </div>

        {/* Search Body Content */}
        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-5">
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#8C7A6B] mb-3">
                <span>نتائج البحث ({filteredProducts.length})</span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={handleSearchAll}
                    className="text-[#2D5A27] hover:underline flex items-center gap-1"
                  >
                    <span>عرض الكل في المتجر</span>
                    <ArrowLeft className="w-3 h-3 rtl:rotate-0 ltr:rotate-180" />
                  </button>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  {filteredProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.id)}
                      className="p-3 bg-white hover:bg-[#F4EFE6] rounded-2xl border border-[#E8DDCF] transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover border border-[#E8DDCF] shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-[#2D241E] group-hover:text-[#2D5A27] transition-colors">
                            {p.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-[#8C7A6B]">
                            <span>{p.weight}</span>
                            <span>•</span>
                            <span className="text-[#C59B27] flex items-center gap-0.5 font-semibold">
                              <Star className="w-3 h-3 fill-current" />
                              {p.rating.toFixed(1)}
                            </span>
                            <span>•</span>
                            <span className="text-[#2D5A27] font-semibold">{p.origin}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left shrink-0">
                        <span className="text-sm sm:text-base font-extrabold text-[#2D5A27]">
                          {p.price} درهم
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-[#8C7A6B] space-y-2">
                  <p className="text-sm">لم يتم العثور على أي منتوج يطابق "{query}"</p>
                  <p className="text-xs text-[#A89887]">
                    جرب البحث بكلمات عامة مثل: تمور، كسكس، عسل، زعتر، أقا، إغشان.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Popular Searches */}
              <div>
                <h4 className="text-xs font-bold text-[#8C7A6B] mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>عمليات البحث الشائعة في طاطا ستور:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['تمر بوفقوس', 'كسكس خماسي', 'عسل الدغموس', 'زعتر طاطا', 'حناء فم زكيد', 'زيت زيتون بكر', 'تاصلاعت'].map(
                    term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-full bg-white hover:bg-[#F2ECE1] border border-[#E8DDCF] text-xs font-semibold text-[#4A3B32] transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Category Shortcuts */}
              <div>
                <h4 className="text-xs font-bold text-[#8C7A6B] mb-2.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#2D5A27]" />
                  <span>تصفح حسب فئات الواحة:</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.slug)}
                      className="p-2.5 rounded-xl bg-white hover:bg-[#F4EFE6] border border-[#E8DDCF] text-xs font-bold text-[#2D241E] text-right flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-7 h-7 rounded-lg object-cover"
                      />
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

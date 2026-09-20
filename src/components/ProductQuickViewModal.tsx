import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Star, Check, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductVariant } from '../types';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    navigateToProduct,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  if (!quickViewProduct) return null;

  const currentVariant = selectedVariant || quickViewProduct.variants?.[0];
  const activePrice = currentVariant ? currentVariant.price : quickViewProduct.price;
  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, currentVariant);
    setQuickViewProduct(null);
  };

  const handleGoToFullPage = () => {
    navigateToProduct(quickViewProduct.id);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-[#E8DDCF] flex flex-col md:flex-row text-right">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#4A2C11] shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Column */}
        <div className="w-full md:w-1/2 bg-[#FAF7F2] p-5 flex flex-col justify-between">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xs">
            <img
              src={quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Strip */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIdx === idx ? 'border-[#2D5A27] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="صورة مصغرة" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8C7A6B] mb-2">
              <span className="bg-[#EFE6DA] text-[#633C1A] px-2 py-0.5 rounded font-semibold">
                {quickViewProduct.origin}
              </span>
              <div className="flex items-center gap-1 text-[#C59B27]">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{quickViewProduct.rating.toFixed(1)}</span>
                <span className="text-[#A89887]">({quickViewProduct.reviewCount})</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2D241E] leading-snug">
              {quickViewProduct.name}
            </h2>

            <p className="text-xs sm:text-sm text-[#6E5A4A] mt-2 leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            {/* Price section */}
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-2xl font-black text-[#2D5A27]">{activePrice}</span>
              <span className="text-sm font-bold text-[#633C1A]">درهم مغربي</span>
              {quickViewProduct.compareAtPrice && (
                <span className="text-sm text-[#A89887] line-through mr-2">
                  {quickViewProduct.compareAtPrice} درهم
                </span>
              )}
            </div>

            {/* Variants Selector */}
            {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
              <div className="mt-4">
                <label className="block text-xs font-bold text-[#4A3B32] mb-1.5">
                  اختر الحجم / الوزن:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        currentVariant?.id === v.id
                          ? 'border-[#2D5A27] bg-[#2D5A27] text-white shadow-xs'
                          : 'border-[#E8DDCF] bg-[#FAF7F2] text-[#3E3228] hover:border-[#2D5A27]'
                      }`}
                    >
                      {v.name} ({v.price} درهم)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="mt-4 flex items-center gap-3">
              <label className="text-xs font-bold text-[#4A3B32]">الكمية:</label>
              <div className="flex items-center border border-[#E8DDCF] rounded-xl bg-[#FAF7F2] overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold text-[#4A2C11] hover:bg-[#EFE6DA] transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 text-sm font-bold text-[#2D241E] min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-bold text-[#4A2C11] hover:bg-[#EFE6DA] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-4 border-t border-[#F0EAE1]">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#2D5A27] hover:bg-[#23481E] text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>أضف إلى السلة</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isFavorited
                    ? 'border-[#B33939] text-[#B33939] bg-[#B33939]/10'
                    : 'border-[#E8DDCF] text-[#633C1A] hover:bg-[#FAF7F2]'
                }`}
                title="المفضلة"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleGoToFullPage}
              className="w-full text-center text-xs font-bold text-[#633C1A] hover:text-[#2D5A27] py-2 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>عرض تفاصيل المنتج والمكونات بالكامل</span>
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

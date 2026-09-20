import React, { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

const badgeConfig: Record<string, { label: string; cls: string }> = {
  new: { label: 'جديد', cls: 'bg-green-600 text-white' },
  bestseller: { label: 'الأكثر مبيعاً', cls: 'bg-gold text-accent' },
  sale: { label: 'عرض', cls: 'bg-red-600 text-white' },
  original: { label: 'منتج أصلي', cls: 'bg-primary text-primary-foreground' },
  authentic: { label: 'منتج أصلي', cls: 'bg-primary text-primary-foreground' },
  limited: { label: 'محدود', cls: 'bg-purple-700 text-white' },
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateToProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [added, setAdded] = useState(false);
  const isFav = isInWishlist(product.id);

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const isOutOfStock = product.stock <= 0;

  const effectiveBadge = product.badge || (product.isBestSeller ? 'bestseller' : undefined);

  return (
    <div
      onClick={() => navigateToProduct(product.id)}
      className="group block cursor-pointer text-right"
    >
      <div className="relative overflow-hidden rounded-2xl bg-muted aspect-square">
        <img
          src={product.images[0] || 'https://media.base44.com/images/public/6ab03de99bf52d08424ee607/76eef1f48_generated_2a3b0dfa.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {effectiveBadge && badgeConfig[effectiveBadge] && (
            <span
              className={`${badgeConfig[effectiveBadge].cls} text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs`}
            >
              {badgeConfig[effectiveBadge].label}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
              -{discount}%
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-background/85 backdrop-blur flex items-center justify-center hover:bg-background transition cursor-pointer shadow-xs"
          aria-label="المفضلة"
        >
          <Heart
            size={16}
            className={isFav ? 'fill-red-500 text-red-500' : 'text-foreground/70'}
          />
        </button>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-accent text-primary-foreground text-sm font-medium px-4 py-2 rounded-full">
              نفذ المخزون
            </span>
          </div>
        )}
      </div>

      <div className="pt-3.5">
        {product.origin && (
          <p className="text-[11px] text-muted-foreground mb-1 flex items-center gap-1 justify-start">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span>{product.origin}</span>
          </p>
        )}

        <h3 className="font-semibold text-[15px] leading-snug line-clamp-2 group-hover:text-primary transition-colors text-foreground">
          {product.name}
        </h3>

        {product.shortDescription && (
          <p className="text-[13px] text-muted-foreground mt-1 line-clamp-1">
            {product.shortDescription}
          </p>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-primary text-base">{product.price} د.م</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {product.compareAtPrice} د.م
            </span>
          )}
        </div>

        <button
          onClick={e => {
            e.stopPropagation();
            if (!isOutOfStock) {
              addToCart(product, 1);
              setAdded(true);
              setTimeout(() => setAdded(false), 1400);
            }
          }}
          disabled={isOutOfStock}
          className={`w-full mt-3 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition cursor-pointer ${
            isOutOfStock
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : added
              ? 'bg-green-700 text-white'
              : 'bg-primary text-primary-foreground hover:bg-accent'
          }`}
        >
          <ShoppingBag size={16} />
          <span>{isOutOfStock ? 'نفذ المخزون' : added ? 'أُضيف للسلة' : 'أضف إلى السلة'}</span>
        </button>
      </div>
    </div>
  );
};

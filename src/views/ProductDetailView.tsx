import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  Check,
  Share2,
  Package,
  Sparkles,
  ArrowRight,
  Minus,
  Plus,
  Star,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

const badgeConfig: Record<string, { label: string; cls: string }> = {
  new: { label: 'جديد', cls: 'bg-green-600 text-white' },
  bestseller: { label: 'الأكثر مبيعاً', cls: 'bg-gold text-accent' },
  sale: { label: 'عرض', cls: 'bg-red-600 text-white' },
  original: { label: 'منتج أصلي', cls: 'bg-primary text-primary-foreground' },
  authentic: { label: 'منتج أصلي', cls: 'bg-primary text-primary-foreground' },
  limited: { label: 'محدود', cls: 'bg-purple-700 text-white' },
};

export const ProductDetailView: React.FC = () => {
  const {
    activeProductId,
    products,
    categories,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToCategory,
    navigateToShop,
    setCurrentPage,
    reviews,
    addReview,
  } = useStore();

  const product = products.find(p => p.id === activeProductId) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reviews form state
  const [revName, setRevName] = useState('');
  const [revCity, setRevCity] = useState('طاطا');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [revSuccess, setRevSuccess] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-foreground">
        <h2 className="text-xl font-bold">المنتوج غير موجود</h2>
        <button
          onClick={() => navigateToShop()}
          className="mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm cursor-pointer"
        >
          العودة للمتجر
        </button>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const isFav = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    const shareData = {
      title: `${product.name} | TATA.STORE`,
      text: product.shortDescription || `${product.name} من واحة طاطا الأصيلة`,
      url: window.location.href,
    };

    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: unknown) {
        // If user cancelled, do nothing; if error, fallback to clipboard
        if ((err as Error)?.name === 'AbortError') return;
      }
    }

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (_) {}
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;
    addReview({
      productId: product.id,
      customerName: revName.trim(),
      customerCity: revCity.trim(),
      rating: revRating,
      comment: revComment.trim(),
    });
    setRevName('');
    setRevComment('');
    setRevSuccess(true);
    setTimeout(() => setRevSuccess(false), 4000);
  };

  const effectiveBadge = product.badge || (product.isBestSeller ? 'bestseller' : undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-right">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="hover:text-primary transition cursor-pointer"
        >
          الرئيسية
        </button>
        <span>/</span>
        <button
          onClick={() => navigateToShop()}
          className="hover:text-primary transition cursor-pointer"
        >
          المتجر
        </button>
        {category && (
          <>
            <span>/</span>
            <button
              onClick={() => navigateToCategory(category.slug)}
              className="hover:text-primary transition cursor-pointer"
            >
              {category.name}
            </button>
          </>
        )}
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Gallery Column */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-muted aspect-square border border-border">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
              {effectiveBadge && badgeConfig[effectiveBadge] && (
                <span
                  className={`${badgeConfig[effectiveBadge].cls} text-xs font-semibold px-3 py-1 rounded-full shadow-xs`}
                >
                  {badgeConfig[effectiveBadge].label}
                </span>
              )}
              {discount > 0 && (
                <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Favorite & Share buttons */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-10 h-10 rounded-full bg-background/85 backdrop-blur flex items-center justify-center hover:bg-background transition shadow-xs cursor-pointer"
                aria-label="المفضلة"
              >
                <Heart
                  size={18}
                  className={isFav ? 'fill-red-500 text-red-500' : 'text-foreground/70'}
                />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-background/85 backdrop-blur flex items-center justify-center hover:bg-background transition shadow-xs cursor-pointer"
                aria-label="مشاركة"
                title="نسخ الرابط"
              >
                <Share2 size={18} className="text-foreground/70" />
              </button>
            </div>

            {copiedLink && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-4 py-1.5 rounded-full shadow">
                تم نسخ رابط المنتج!
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                    activeImageIdx === idx ? 'border-primary' : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="space-y-6">
          {/* Origin Pill */}
          {product.origin && (
            <div className="inline-flex items-center gap-1.5 bg-gold/15 text-accent text-xs font-semibold px-3.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              <span>{product.origin}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground leading-tight">
            {product.name}
          </h1>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-muted-foreground text-base leading-relaxed">
              {product.shortDescription}
            </p>
          )}

          {/* Price Box */}
          <div className="flex items-baseline gap-3 py-2">
            <span className="text-3xl md:text-4xl font-extrabold text-primary font-display">
              {product.price} د.م
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                {product.compareAtPrice} د.م
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                وفرت {product.compareAtPrice! - product.price} د.م
              </span>
            )}
          </div>

          {/* Stock state */}
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                product.stock > 10
                  ? 'bg-green-500'
                  : product.stock > 0
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
            />
            <span className="text-muted-foreground">
              {product.stock > 10
                ? 'متوفر في المخزون'
                : product.stock > 0
                ? `متبقي ${product.stock} فقط في المخزون`
                : 'نفذ المخزون حالياً'}
            </span>
          </div>

          {/* Quantity & Actions */}
          {!isOutOfStock && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">الكمية:</span>
                <div className="flex items-center border border-border rounded-full bg-card px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-foreground/70 hover:text-primary transition cursor-pointer"
                    aria-label="إنقاص"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-1 text-foreground/70 hover:text-primary transition cursor-pointer"
                    aria-label="زيادة"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3.5 rounded-full hover:bg-accent transition shadow-sm cursor-pointer"
                >
                  <ShoppingBag size={18} />
                  <span>{addedNotice ? 'أُضيف للسلة بنجاح ✓' : 'أضف إلى السلة'}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gold text-accent font-semibold px-6 py-3.5 rounded-full hover:brightness-105 transition shadow-sm cursor-pointer"
                >
                  <span>اشترِ الآن (الدفع عند الاستلام)</span>
                </button>
              </div>
            </div>
          )}

          {/* 4 Trust Chips */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border text-xs text-foreground/80">
            <div className="flex items-center gap-2 bg-card p-2.5 rounded-xl border border-border">
              <ShieldCheck size={18} className="text-primary shrink-0" />
              <span>الدفع عند الاستلام</span>
            </div>
            <div className="flex items-center gap-2 bg-card p-2.5 rounded-xl border border-border">
              <Truck size={18} className="text-primary shrink-0" />
              <span>توصيل لجميع المدن</span>
            </div>
            <div className="flex items-center gap-2 bg-card p-2.5 rounded-xl border border-border">
              <Sparkles size={18} className="text-gold shrink-0" />
              <span>منتوج أصلي 100%</span>
            </div>
            <div className="flex items-center gap-2 bg-card p-2.5 rounded-xl border border-border">
              <Package size={18} className="text-primary shrink-0" />
              <span>تغليف محكم وصحي</span>
            </div>
          </div>

          {/* Product Specifications Table */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="font-bold text-sm text-foreground">تفاصيل المنتوج</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.weight && (
                <div className="flex justify-between p-2 rounded-lg bg-muted/60">
                  <span className="text-muted-foreground">الوزن / الحجم:</span>
                  <span className="font-semibold text-foreground">{product.weight}</span>
                </div>
              )}
              {product.sku && (
                <div className="flex justify-between p-2 rounded-lg bg-muted/60">
                  <span className="text-muted-foreground">رمز المنتج:</span>
                  <span className="font-semibold text-foreground">{product.sku}</span>
                </div>
              )}
              {product.ingredients && (
                <div className="flex justify-between p-2 rounded-lg bg-muted/60 sm:col-span-2">
                  <span className="text-muted-foreground">المكونات:</span>
                  <span className="font-semibold text-foreground">{product.ingredients}</span>
                </div>
              )}
              {product.preservation && (
                <div className="flex justify-between p-2 rounded-lg bg-muted/60 sm:col-span-2">
                  <span className="text-muted-foreground">طريقة الحفظ:</span>
                  <span className="font-semibold text-foreground">{product.preservation}</span>
                </div>
              )}
              {product.usage && (
                <div className="flex justify-between p-2 rounded-lg bg-muted/60 sm:col-span-2">
                  <span className="text-muted-foreground">الاستخدام:</span>
                  <span className="font-semibold text-foreground">{product.usage}</span>
                </div>
              )}
            </div>

            {/* Description Text */}
            {product.description && (
              <div className="pt-2 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-16 pt-10 border-t border-border">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            آراء وتجارب الزبائن ({productReviews.length})
          </h2>

          <div className="space-y-4 mb-8">
            {productReviews.length > 0 ? (
              productReviews.map(r => (
                <div
                  key={r.id}
                  className="bg-card p-4 rounded-2xl border border-border space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm text-foreground">
                        {r.customerName}
                      </span>
                      {r.customerCity && (
                        <span className="text-xs text-muted-foreground mr-2">
                          ({r.customerCity})
                        </span>
                      )}
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < r.rating ? 'fill-current' : 'text-muted'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{r.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                لا توجد تقييمات بعد لهذا المنتوج. كن أول من يشارك تجربته!
              </p>
            )}
          </div>

          {/* Add Review Form */}
          <form
            onSubmit={handleAddReview}
            className="bg-card p-6 rounded-2xl border border-border space-y-4"
          >
            <h3 className="font-bold text-sm text-foreground">أضف تقييمك وتجربتك</h3>

            {revSuccess && (
              <div className="p-3 rounded-xl bg-green-100 text-green-800 text-xs font-medium">
                شكراً لمشاركتك! تم إضافة تقييمك بنجاح.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">اسمك الكريم</label>
                <input
                  type="text"
                  required
                  value={revName}
                  onChange={e => setRevName(e.target.value)}
                  placeholder="مثال: يوسف المنصوري"
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">المدينة</label>
                <input
                  type="text"
                  required
                  value={revCity}
                  onChange={e => setRevCity(e.target.value)}
                  placeholder="مثال: الدار البيضاء، طاطا..."
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">التقييم</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRevRating(star)}
                    className="cursor-pointer"
                  >
                    <Star
                      size={20}
                      className={
                        star <= revRating
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-muted-foreground'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">ملاحظتك أو تجربتك</label>
              <textarea
                required
                rows={3}
                value={revComment}
                onChange={e => setRevComment(e.target.value)}
                placeholder="اكتب انطباعك الصادق عن المنتوج والتوصيل..."
                className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-full text-xs hover:bg-accent transition cursor-pointer"
            >
              إرسال التقييم
            </button>
          </form>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              منتوجات قد تعجبك أيضاً
            </h2>
            <button
              onClick={() => navigateToShop()}
              className="text-xs font-medium text-primary hover:text-accent transition cursor-pointer"
            >
              مشاهدة المزيد
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

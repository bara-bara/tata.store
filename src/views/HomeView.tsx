import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';

export const HomeView: React.FC = () => {
  const { products, categories, navigateToShop, navigateToCategory } = useStore();

  const featured = products.filter(p => p.isFeatured);
  const bestsellers = products.filter(p => p.isBestSeller || p.badge === 'bestseller');
  const newlyArrived = products.filter(p => p.badge === 'new' || p.badge === 'original');

  return (
    <div className="space-y-16">
      {/* 1. Hero and Benefits */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* 2. Categories Section */}
        {categories.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-gold mb-1">أقسام المتجر</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  تسوّق حسب الفئة
                </h2>
              </div>
              <button
                onClick={() => navigateToShop()}
                className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1 transition cursor-pointer"
              >
                <span>عرض الكل</span>
                <ArrowLeft size={16} className="rtl:rotate-0 ltr:rotate-180" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => navigateToCategory(cat.slug)}
                  className="group relative overflow-hidden rounded-2xl aspect-4/3 text-right cursor-pointer"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3 text-white">
                    <h3 className="font-bold text-base md:text-lg">{cat.name}</h3>
                    {cat.description && (
                      <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                        {cat.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 3. Featured Products */}
        {featured.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-gold mb-1">مختارات طاطا</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  منتجات مميزة
                </h2>
              </div>
              <button
                onClick={() => navigateToShop()}
                className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1 transition cursor-pointer"
              >
                <span>عرض الكل</span>
                <ArrowLeft size={16} className="rtl:rotate-0 ltr:rotate-180" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 4. Oasis Banner */}
        <section className="bg-accent text-primary-foreground rounded-3xl overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 md:p-14">
              <span className="text-gold text-sm font-semibold mb-2 block">من قلب الواحة</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-snug">
                مذاق أصيل من أرض طاطا
              </h2>
              <p className="text-primary-foreground/80 text-base mb-6 leading-relaxed">
                نختار بعناية أجود التمور، زيت الأركان، العسل الطبيعي، والكسكس الحرفي مباشرة من مزارع وتعاونيات إقليم طاطا.
              </p>
              <button
                onClick={() => navigateToShop()}
                className="inline-flex items-center gap-2 bg-gold text-accent font-semibold px-6 py-3 rounded-full hover:brightness-105 transition cursor-pointer"
              >
                <span>تصفّح المتجر</span>
                <ArrowLeft size={16} className="rtl:rotate-0 ltr:rotate-180" />
              </button>
            </div>
            <div className="h-64 md:h-full min-h-[300px] relative">
              <img
                src="https://media.base44.com/images/public/6ab03de99bf52d08424ee607/577b09cfa_generated_eaf7efa3.jpg"
                alt="واحة طاطا"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* 5. Best Sellers */}
        {bestsellers.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-gold mb-1">الأعلى طلباً</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  الأكثر مبيعاً
                </h2>
              </div>
              <button
                onClick={() => navigateToShop('bestseller')}
                className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1 transition cursor-pointer"
              >
                <span>عرض الكل</span>
                <ArrowLeft size={16} className="rtl:rotate-0 ltr:rotate-180" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {bestsellers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 6. Newly Arrived */}
        {newlyArrived.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-gold mb-1">جديد الواحة</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  وصل حديثاً
                </h2>
              </div>
              <button
                onClick={() => navigateToShop('new')}
                className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1 transition cursor-pointer"
              >
                <span>عرض الكل</span>
                <ArrowLeft size={16} className="rtl:rotate-0 ltr:rotate-180" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {newlyArrived.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

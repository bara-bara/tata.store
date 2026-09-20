import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Package, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { navigateToShop } = useStore();

  const benefits = [
    {
      icon: Sparkles,
      title: 'منتجات مختارة من طاطا',
      desc: 'نختار كل منتوج بعناية من مصدره الأصلي',
    },
    {
      icon: ShieldCheck,
      title: 'الدفع عند الاستلام',
      desc: 'ادفع نقداً عند وصول طلبك إلى باب دارك',
    },
    {
      icon: Package,
      title: 'تغليف بعناية',
      desc: 'نغلّف منتجاتك بعناية لتصلك سليمة',
    },
    {
      icon: Truck,
      title: 'توصيل للمنازل',
      desc: 'نوصّل إلى طاطا وجميع المدن المغربية',
    },
  ];

  return (
    <div>
      {/* Hero Banner with Oasis Image & Gradient Overlay */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/6ab03de99bf52d08424ee607/577b09cfa_generated_eaf7efa3.jpg"
            alt="واحة طاطا"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/85 via-primary/55 to-primary/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 min-h-[520px] md:min-h-[600px] flex items-center">
          <div className="max-w-2xl text-primary-foreground">
            <span className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur px-4 py-1.5 rounded-full text-sm mb-6 border border-primary-foreground/20">
              <Sparkles size={14} className="text-gold" /> منتوجات طاطا الأصيلة
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.15] mb-5">
              من طاطا... <br /> إلى باب دارك
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-xl leading-relaxed">
              اكتشف مذاق الواحة ومنتوجاتها الأصيلة، واختر منتجات طاطا بعناية لتصلك أينما كنت.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigateToShop()}
                className="inline-flex items-center gap-2 bg-gold text-accent font-semibold px-7 py-3.5 rounded-full hover:brightness-105 transition shadow-lg cursor-pointer"
              >
                اكتشف المنتجات <ArrowLeft size={18} className="rtl:rotate-0 ltr:rotate-180" />
              </button>
              <button
                onClick={() => navigateToShop('bestseller')}
                className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur border border-primary-foreground/30 text-primary-foreground font-semibold px-7 py-3.5 rounded-full hover:bg-primary-foreground/15 transition cursor-pointer"
              >
                تسوق الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Benefits Bar */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map(item => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { Sparkles, Heart, Award, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutView: React.FC = () => {
  const { navigateToShop } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 text-right space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-gold bg-gold/10 px-3.5 py-1 rounded-full inline-block">
          حكاية واحة طاطا وأصالتها
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-foreground leading-tight font-display">
          من قلب الواحة المغربية العريقة إلى مائدة كل بيت
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          TATA.STORE هي نافذة تبرز غنى واحات إقليم طاطا بالجنوب الشرقي للمملكة
          المغربية، حاملةً أسرار الأجداد وبركة الأرض إلى بيتك.
        </p>
      </div>

      {/* Visual & Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-card p-6 sm:p-10 rounded-3xl border border-border shadow-xs">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground font-display">
            طاطا... واحة الصمود وسحر الطبيعة البكر
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            يقع إقليم طاطا في الجنوب المغربي، محاطاً بسلسلة جبال الأطلس الصغير وجبال باني الصحراوية.
            تتميز هذه الأرض المباركة بواحاتها النضرة التي ترويها منظومة الخطارات والسواقي التقليدية
            التي ابتكرها الأجداد منذ قرون لتدبير قطرات الماء العذب بحكمة وعدل.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            بفضل شمسها الساطعة، ومناخها الجاف النقي، وتربتها الغنية، تنتج واحات طاطا (إغشان، أقا،
            تيسينت، فم الحصن، وفم زكيد) أجود أنواع التمور المغربية مثل "بوفقوس"، "النجدة"،
            و"أكوت"، إلى جانب الأعشاب الطبية النادرة وزيت الأركان وعسل السدر والدغموس.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-4/3 border border-border">
          <img
            src="https://media.base44.com/images/public/6ab03de99bf52d08424ee607/577b09cfa_generated_eaf7efa3.jpg"
            alt="واحات إقليم طاطا"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mission & Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-foreground">دعم الاقتصاد المحلي</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            نتعامل بشكل مباشر وعادل مع مزارعي الواحة والتعاونيات النسوية، لنضمن لهم دخلاً كريماً
            وللمشتري سعراً حقيقياً بدون وسطاء.
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gold/20 text-accent flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-foreground">أصالة ونقاء 100%</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            منتوجاتنا طبيعية بدون مبيدات، محصودة بطرق تقليدية ومحفوظة وفق معايير سلامة غذائية
            عالية تصون الطعم والفوائد الصحية.
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-foreground">ثقة وأمانة في التوصيل</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            نوفر خدمة الدفع عند الاستلام مع إمكانية فحص الطرد، مع تغليف صحي يحمي التمور والمأكولات
            أثناء الشحن لمختلف أقاليم المملكة.
          </p>
        </div>
      </div>

      {/* Invitation to Shop */}
      <div className="text-center bg-accent text-primary-foreground p-8 sm:p-14 rounded-3xl space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-display">تذوق أصالة واحة طاطا اليوم</h2>
        <p className="text-sm text-primary-foreground/80 max-w-xl mx-auto">
          اختر تشكيلتك المفضلة من التمور والكسكس والأعشاب، ودعنا نوصلها لباب دارك بأمان تام.
        </p>
        <button
          onClick={() => navigateToShop()}
          className="bg-gold text-accent font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg hover:brightness-105 transition inline-flex items-center gap-2 cursor-pointer"
        >
          <span>تصفح كافة المنتجات</span>
          <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
        </button>
      </div>
    </div>
  );
};

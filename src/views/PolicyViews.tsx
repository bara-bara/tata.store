import React from 'react';
import { Truck, RotateCcw, ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface PolicyWrapperProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const PolicyWrapper: React.FC<PolicyWrapperProps> = ({ title, icon, children }) => {
  const { setCurrentPage } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-right space-y-6">
      <button
        onClick={() => setCurrentPage('home')}
        className="text-xs font-semibold text-primary flex items-center gap-1.5 hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
        <span>العودة للرئيسية</span>
      </button>

      <div className="bg-card rounded-3xl border border-border shadow-xs p-6 md:p-10 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="p-3 bg-muted text-primary rounded-2xl">
            {icon}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground font-display">{title}</h1>
            <p className="text-xs text-muted-foreground">TATA.STORE - سياسات واضحة لضمان حقوق زبنائنا</p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ShippingPolicyView: React.FC = () => {
  return (
    <PolicyWrapper title="سياسة الشحن والتوصيل" icon={<Truck className="w-6 h-6" />}>
      <h3 className="font-bold text-sm text-foreground">1. مناطق التوصيل والمدد الزمنية</h3>
      <p>
        نحن في <strong>TATA.STORE</strong> نحرص على إيصال خيرات واحة طاطا إلى باب دارك أينما كنت في
        المغرب:
      </p>
      <ul className="list-disc list-inside space-y-1.5 pr-2">
        <li>
          <strong>داخل مدينة وإقليم طاطا:</strong> التوصيل خلال أقل من
          24 ساعة بتكلفة 15 درهم، ومجاني للطلبات فوق 200 درهم.
        </li>
        <li>
          <strong>مدن الجنوب:</strong> التوصيل في غضون 24-48 ساعة بتكلفة 35 درهم، ومجاني فوق 400 درهم.
        </li>
        <li>
          <strong>المدن الكبرى وباقي المملكة:</strong> التوصيل خلال 24-48 ساعة بتكلفة 40 إلى 45 درهم، ومجاني للطلبات فوق 500 درهم.
        </li>
      </ul>

      <h3 className="font-bold text-sm text-foreground pt-4">2. التغليف الآمن والصحي</h3>
      <p>
        تُحزم منتجاتنا في صناديق كرتونية محكمة مع مراعاة الحفاظ على التمور والمواد الغذائية من الحرارة
        أو التلف خلال فترة النقل.
      </p>

      <h3 className="font-bold text-sm text-foreground pt-4">3. معاينة الطرد</h3>
      <p>
        يحق للزبون معاينة الطرد والتأكد من سلامته الخارجية عند استلامه من رجل التوصيل قبل دفع المبلغ.
      </p>
    </PolicyWrapper>
  );
};

export const ReturnPolicyView: React.FC = () => {
  return (
    <PolicyWrapper title="سياسة الاستبدال والاسترجاع" icon={<RotateCcw className="w-6 h-6" />}>
      <h3 className="font-bold text-sm text-foreground">1. حق الاسترجاع والاستبدال</h3>
      <p>
        رضاكم هو أولويتنا. إذا وصلكم أي منتج غير مطابق للمواصفات أو تعرض لضرر أثناء النقل، يحق لكم
        طلب الاستبدال أو استرجاع المبلغ خلال مدة 48 ساعة من تاريخ استلام الطرد.
      </p>

      <h3 className="font-bold text-sm text-foreground pt-4">2. شروط قبول الإرجاع</h3>
      <ul className="list-disc list-inside space-y-1.5 pr-2">
        <li>أن يكون المنتج في عبوته وتغليفه الأصلي قدر الإمكان.</li>
        <li>ألا يكون قد تم استهلاك الجزء الأكبر من محتواه.</li>
        <li>إشعار خدمة العملاء عبر واتساب مع إرسال صورة للمنتج المعني.</li>
      </ul>

      <h3 className="font-bold text-sm text-foreground pt-4">3. تكاليف الاسترجاع</h3>
      <p>
        في حال كان الخطأ من طرفنا (منتج خاطئ أو تالف)، نتحمل نحن كافة مصاريف الشحن للإرجاع أو
        إرسال بديل فوري مجاناً.
      </p>
    </PolicyWrapper>
  );
};

export const ReturnsPolicyView = ReturnPolicyView;

export const PrivacyPolicyView: React.FC = () => {
  return (
    <PolicyWrapper title="سياسة الخصوصية" icon={<ShieldCheck className="w-6 h-6" />}>
      <h3 className="font-bold text-sm text-foreground">1. جمع البيانات الشخصية</h3>
      <p>
        نحن نجمع فقط المعلومات الضرورية لمعالجة وتوصيل طلبكم (الاسم، رقم الهاتف، والمدينة
        والعنوان).
      </p>

      <h3 className="font-bold text-sm text-foreground pt-4">2. سرية وأمان المعلومات</h3>
      <p>
        نلتزم التزاماً تاماً بعدم بيع أو مشاركة أو تأجير أي معلومة من معلوماتكم الشخصية لأي طرف
        ثالث خارج نطاق شركة التوصيل المكلفة بإيصال الطرد إليكم.
      </p>

      <h3 className="font-bold text-sm text-foreground pt-4">3. الاتصال والمتابعة</h3>
      <p>
        يُستخدم رقم الهاتف فقط لتأكيد الطلب وتتبع وصول الشحنة، ولن نرسل رسائل تسويقية مزعجة.
      </p>
    </PolicyWrapper>
  );
};

export const TermsView: React.FC = () => {
  return (
    <PolicyWrapper title="الشروط والأحكام" icon={<FileText className="w-6 h-6" />}>
      <h3 className="font-bold text-sm text-foreground">1. بنود الاستخدام</h3>
      <p>
        استخدامكم لموقع <strong>TATA.STORE</strong> وطلب المنتجات يعني موافقتكم التلقائية على شروط
        البيع المبينة هنا.
      </p>

      <h3 className="font-bold text-sm text-foreground pt-4">2. الأسعار والدفع</h3>
      <p>
        جميع الأسعار المعروضة هي بالدرهم المغربي (MAD). الدفع يتم نقداً عند الاستلام مباشرة لشركة
        التوصيل.
      </p>

      <h3 className="font-bold text-sm text-foreground pt-4">3. حقوق الملكية</h3>
      <p>
        كافة الصور والمحتويات والنصوص المعروضة على المتجر هي ملكية حصرية لـ <strong>TATA.STORE</strong>،
        وتعبر عن واحة طاطا وثقافتها الأصيلة.
      </p>
    </PolicyWrapper>
  );
};

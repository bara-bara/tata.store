import React from 'react';
import { CheckCircle2, MessageCircle, ArrowLeft, Printer } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderSuccessView: React.FC = () => {
  const { currentOrder, setCurrentPage, navigateToShop, settings } = useStore();

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4 text-right">
        <h2 className="text-xl font-bold text-foreground">لا يوجد طلب حديث للعرض</h2>
        <button
          onClick={() => navigateToShop()}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-xs cursor-pointer hover:bg-accent transition"
        >
          الذهاب للمتجر
        </button>
      </div>
    );
  }

  const cleanWhatsappNumber = settings.whatsapp ? settings.whatsapp.replace(/\D/g, '') : '212600000000';
  const whatsappMsg = encodeURIComponent(
    `السلام عليكم طاطا ستور، قمت بتسجيل الطلب رقم #${currentOrder.orderNumber} بمبلغ ${currentOrder.total} درهم. أود تأكيد الطلب وموعد الشحن.`
  );
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${whatsappMsg}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 text-right">
      <div className="bg-card rounded-3xl border border-border p-6 md:p-10 space-y-8 shadow-xs">
        {/* Top Celebration Icon & Title */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-muted text-primary">
            رقم الطلب: #{currentOrder.orderNumber}
          </span>

          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            تم تسجيل طلبك بنجاح!
          </h1>

          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            شكراً لثقتك في <strong>TATA.STORE</strong>. لقد استلمنا تفاصيل طلبك وسنتصل بك قريباً لتأكيد موعد التوصيل.
          </p>
        </div>

        {/* WhatsApp & Print Actions */}
        <div className="flex flex-col sm:flex-row gap-3 no-print">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3.5 px-4 rounded-full text-sm flex items-center justify-center gap-2 shadow-sm transition text-center cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>تأكيد الطلب مباشرة عبر واتساب</span>
          </a>

          <button
            onClick={() => window.print()}
            className="bg-muted hover:bg-border text-foreground font-semibold py-3.5 px-6 rounded-full text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الفاتورة</span>
          </button>
        </div>

        {/* Order Details & Summary */}
        <div className="border-t border-border pt-6 space-y-6 text-sm">
          <h2 className="font-bold text-base text-foreground">تفاصيل التوصيل والفاتورة</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-muted/50 p-4 rounded-2xl">
            <div>
              <span className="text-muted-foreground block mb-1">الاسم:</span>
              <span className="font-semibold text-foreground">{currentOrder.customerName}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">الهاتف:</span>
              <span className="font-semibold text-foreground" dir="ltr">{currentOrder.customerPhone}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">المدينة:</span>
              <span className="font-semibold text-foreground">{currentOrder.customerCity}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">طريقة الدفع:</span>
              <span className="font-semibold text-primary">الدفع نقداً عند الاستلام (COD)</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-muted-foreground block mb-1">العنوان:</span>
              <span className="font-semibold text-foreground">{currentOrder.customerAddress}</span>
            </div>
          </div>

          {/* Items breakdown */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs text-foreground">المنتجات المطلوبة:</h3>
            <div className="space-y-2">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{item.productName}</span>
                    <span className="text-muted-foreground">× {item.quantity}</span>
                  </div>
                  <span className="font-bold text-foreground">{item.price * item.quantity} د.م</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 pt-3 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>المجموع الفرعي:</span>
                <span>{currentOrder.subtotal} د.م</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>الخصم:</span>
                  <span>-{currentOrder.discount} د.م</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>مصاريف التوصيل:</span>
                <span>{currentOrder.shippingFee === 0 ? 'مجاني' : `${currentOrder.shippingFee} د.م`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                <span>المجموع الإجمالي:</span>
                <span className="text-primary font-display text-xl">{currentOrder.total} د.م</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center pt-4 no-print">
          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent font-medium cursor-pointer"
          >
            <span>العودة إلى الصفحة الرئيسية</span>
            <ArrowLeft size={16} className="rtl:rotate-0 ltr:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

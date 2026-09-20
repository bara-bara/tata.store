import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Tag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const MOROCCAN_CITIES = [
  'طاطا',
  'أكادير',
  'مراكش',
  'الدار البيضاء',
  'الرباط',
  'فاس',
  'مكناس',
  'طنجة',
  'وجدة',
  'القنيطرة',
  'تطوان',
  'سلا',
  'المحمدية',
  'الجديدة',
  'بني ملال',
  'الناظور',
  'العيون',
  'خريبكة',
  'برشيد',
  'تازة',
  'سطات',
  'بركان',
  'خنيفرة',
  'ورزازات',
  'الصويرة',
  'تارودانت',
  'تيزنيت',
  'كلميم',
  'السمارة',
  'الداخلة',
  'الحسيمة',
  'تادلة',
  'أزيلال',
  'الرشيدية',
  'زاكورة',
  'تنغير',
  'أسا',
  'فم الحصن',
];

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    createOrder,
    setCurrentPage,
    navigateToShop,
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('طاطا');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4 text-right">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center text-muted-foreground">
          <ShoppingBag className="w-8 h-8 opacity-50" />
        </div>
        <h2 className="text-xl font-bold text-foreground">سلة مشترياتك فارغة</h2>
        <p className="text-xs text-muted-foreground">
          يرجى إضافة منتوجات إلى السلة قبل التوجه إلى صفحة الدفع.
        </p>
        <button
          onClick={() => navigateToShop()}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-accent transition cursor-pointer"
        >
          العودة للمتجر
        </button>
      </div>
    );
  }

  // Calculate shipping rate according to base44 zones
  const calculateShipping = (cityName: string, subtotal: number) => {
    if (cityName === 'طاطا' || cityName === 'فم الحصن') {
      return subtotal >= 200 ? 0 : 15;
    }
    const southCities = ['أكادير', 'تارودانت', 'تيزنيت', 'كلميم', 'ورزازات', 'زاكورة', 'تنغير', 'العيون', 'الداخلة', 'السمارة', 'أسا'];
    if (southCities.includes(cityName)) {
      return subtotal >= 400 ? 0 : 35;
    }
    const majorCities = ['الدار البيضاء', 'الرباط', 'مراكش', 'فاس', 'طنجة', 'سلا'];
    if (majorCities.includes(cityName)) {
      return subtotal >= 500 ? 0 : 40;
    }
    return subtotal >= 500 ? 0 : 45;
  };

  const shippingFee = calculateShipping(city, cartSubtotal);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError('');
    const result = applyCoupon(couponInput.trim());
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponInput('');
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Moroccan phone validation
    const cleanedPhone = phone.replace(/[\s-]/g, '');
    const isMoroccan = /^(\+212|0)([5-7])\d{8}$/.test(cleanedPhone);

    if (!isMoroccan) {
      setFormError('يرجى إدخال رقم هاتف مغربي صحيح (مثال: 0612345678 أو 0712345678)');
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setFormError('يرجى كتابة عنوان التوصيل بالتفصيل (الحي، الشارع أو رقم الدار)');
      return;
    }

    setIsSubmitting(true);

    try {
      await createOrder({
        customerName: fullName.trim(),
        customerPhone: cleanedPhone,
        customerCity: city,
        customerAddress: address.trim(),
        notes: notes.trim(),
      });

      setCurrentPage('order-success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setFormError(err.message || 'حدث خطأ أثناء تسجيل الطلب، يرجى المحاولة ثانية.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-right">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">إتمام الطلب</h1>
        <p className="text-sm text-muted-foreground">
          أدخل معلومات التوصيل ليصلك طلبك مباشرة إلى باب دارك مع الدفع عند الاستلام.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Customer & Address Card */}
            <div className="bg-card p-6 rounded-3xl border border-border space-y-4">
              <h2 className="font-bold text-base text-foreground mb-4">معلومات التوصيل</h2>

              {formError && (
                <div className="p-3.5 rounded-xl bg-red-100 text-red-800 text-xs font-medium flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="مثال: يوسف المنصوري"
                  className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  رقم الهاتف (للاتصال والتأكيد) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0612345678"
                  className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary text-right"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  سنتصل بك أو نراسلك عبر واتساب لتأكيد الشحنة قبل إرسالها.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  المدينة <span className="text-red-500">*</span>
                </label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary cursor-pointer"
                >
                  {MOROCCAN_CITIES.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>مصاريف التوصيل لـ {city}:</span>
                  <span className="font-bold text-primary">
                    {shippingFee === 0 ? 'توصيل مجاني 🎁' : `${shippingFee} د.م`}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  عنوان التوصيل بالتفصيل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="الحي، رقم الشارع، رقم المنزل أو إشارة مميزة..."
                  className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  ملاحظات أو توجيهات إضافية (اختياري)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="وقت التوصيل المفضل أو أي ملاحظة للمندوب..."
                  className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-card p-6 rounded-3xl border border-border space-y-4">
              <h2 className="font-bold text-base text-foreground">طريقة الدفع</h2>
              
              <div className="p-4 rounded-2xl bg-primary/8 border-2 border-primary flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">الدفع عند الاستلام (COD)</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ادفع نقداً عند وصول طلبك ومعاينة المنتجات بكل أمان.
                    </p>
                  </div>
                </div>
                <span className="bg-gold text-accent text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0">
                  مضمون وموصى به
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-full text-base hover:bg-accent transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>جاري تسجيل الطلب...</span>
              ) : (
                <span>تأكيد الطلب — {finalTotal} د.م</span>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card p-6 rounded-3xl border border-border space-y-5 sticky top-24">
            <h2 className="font-bold text-base text-foreground pb-3 border-b border-border">
              ملخص الطلب ({cart.length} {cart.length === 1 ? 'منتج' : 'منتجات'})
            </h2>

            {/* Products List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs text-foreground truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      الكمية: {item.quantity} × {item.product.price} د.م
                    </p>
                  </div>
                  <div className="font-bold text-xs text-primary shrink-0">
                    {item.product.price * item.quantity} د.م
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon input */}
            <div className="pt-3 border-t border-border">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-green-50 border border-green-200 text-xs">
                  <div className="flex items-center gap-1.5 text-green-800 font-bold">
                    <Tag size={14} />
                    <span>الكوبون المطبق: {appliedCoupon.code}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="كود الخصم (مثال: TATA10)"
                    className="flex-1 bg-muted/60 border border-border rounded-xl px-3 py-2 text-xs text-foreground outline-none focus:border-primary uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-muted hover:bg-border text-foreground font-semibold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                  >
                    تطبيق
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
              )}
            </div>

            {/* Totals breakdown */}
            <div className="space-y-2 pt-3 border-t border-border text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>المجموع الفرعي:</span>
                <span>{cartSubtotal} د.م</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>الخصم المطبق:</span>
                  <span>-{discountAmount} د.م</span>
                </div>
              )}

              <div className="flex justify-between text-muted-foreground">
                <span>مصاريف التوصيل:</span>
                <span>{shippingFee === 0 ? 'مجاني' : `${shippingFee} د.م`}</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-foreground pt-3 border-t border-border">
                <span>المجموع الإجمالي:</span>
                <span className="text-primary font-display text-xl">{finalTotal} د.م</span>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="pt-2 text-[11px] text-muted-foreground flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-primary" />
              <span>طلبك محمي ومضمون 100% مع الدفع عند المعاينة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

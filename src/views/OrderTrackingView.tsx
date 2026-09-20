import React, { useState } from 'react';
import {
  Search,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { orders, navigateToShop } = useStore();

  const [orderQuery, setOrderQuery] = useState('');
  const [phoneQuery, setPhoneQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const cleanNum = orderQuery.replace('#', '').trim().toLowerCase();
    const cleanPh = phoneQuery.replace(/\s+/g, '').trim();

    const found = orders.find(o => {
      const matchNum = o.orderNumber.toLowerCase().includes(cleanNum);
      const matchPhone = cleanPh ? o.customerPhone.includes(cleanPh) : true;
      return matchNum && matchPhone;
    });

    setSearchedOrder(found || null);
  };

  const steps = [
    { key: 'new', label: 'تم الاستلام', desc: 'تم تسجيل طلبك بنجاح' },
    { key: 'confirmed', label: 'مؤكد', desc: 'تم تأكيد الطلب هاتفياً' },
    { key: 'preparing', label: 'قيد التجهيز', desc: 'يتم تحضير وتغليف المنتجات' },
    { key: 'shipped', label: 'تم الشحن', desc: 'الشحنة في الطريق إليك' },
    { key: 'delivered', label: 'تم التسليم', desc: 'تم استلام الطلب والدفع' },
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'new':
      case 'pending_confirmation':
        return 0;
      case 'confirmed':
        return 1;
      case 'preparing':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
      case 'completed':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 text-right space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-display text-3xl font-bold text-foreground">
          تتبع الطلب
        </h1>
        <p className="text-sm text-muted-foreground">
          أدخل رقم طلبك لمعرفة حالته ومرحلة التوصيل الحالية.
        </p>
      </div>

      {/* Tracking Form */}
      <div className="bg-card p-6 md:p-8 rounded-3xl border border-border space-y-4 shadow-xs">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                رقم الطلب (مثال: TATA-2026-1049):
              </label>
              <input
                type="text"
                required
                value={orderQuery}
                onChange={e => setOrderQuery(e.target.value)}
                placeholder="أدخل رقم طلبك..."
                className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                رقم الهاتف (اختياري للتحقق):
              </label>
              <input
                type="tel"
                value={phoneQuery}
                onChange={e => setPhoneQuery(e.target.value)}
                placeholder="0612345678"
                className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-full text-sm hover:bg-accent transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Search size={16} />
            <span>تتبع حالة الشحنة</span>
          </button>
        </form>
      </div>

      {/* Result Area */}
      {hasSearched && (
        <div>
          {searchedOrder ? (
            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
                <div>
                  <span className="text-xs font-semibold text-gold">طلب مسجل</span>
                  <h2 className="font-bold text-lg text-foreground">
                    #{searchedOrder.orderNumber}
                  </h2>
                </div>
                <div className="text-xs text-muted-foreground">
                  تاريخ الطلب: {new Date(searchedOrder.createdAt).toLocaleDateString('ar-MA')}
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="py-4">
                <div className="grid grid-cols-5 gap-2 text-center">
                  {steps.map((step, idx) => {
                    const currentIdx = getStepIndex(searchedOrder.status);
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={step.key} className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-primary text-primary-foreground ring-2 ring-primary/20'
                              : 'bg-muted text-muted-foreground'
                          } ${isCurrent ? 'scale-110' : ''}`}
                        >
                          {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                        </div>
                        <span
                          className={`text-[11px] font-semibold ${
                            isCompleted ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer & Shipping summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-muted/50 p-4 rounded-2xl">
                <div>
                  <span className="text-muted-foreground block mb-1">الزبون:</span>
                  <span className="font-semibold text-foreground">{searchedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">المدينة:</span>
                  <span className="font-semibold text-foreground">{searchedOrder.customerCity}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">طريقة الدفع:</span>
                  <span className="font-semibold text-foreground">الدفع عند الاستلام (COD)</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">المبلغ الإجمالي:</span>
                  <span className="font-bold text-primary">{searchedOrder.total} د.م</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-card rounded-3xl border border-border space-y-3">
              <AlertCircle size={32} className="text-amber-500 mx-auto" />
              <h3 className="font-bold text-foreground">لم يتم العثور على أي طلب بهذا الرقم</h3>
              <p className="text-xs text-muted-foreground">
                يرجى التأكد من كتابة رقم الطلب بصورة صحيحة أو التواصل معنا مباشرة عبر واتساب للمساعدة.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotalItems,
    setCurrentPage,
    navigateToShop,
  } = useStore();

  if (!cartDrawerOpen) return null;

  const handleProceedToCheckout = () => {
    setCartDrawerOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={() => setCartDrawerOpen(false)}
    >
      <div
        className="w-full max-w-md bg-card text-foreground h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-border animate-in slide-in-from-left rtl:slide-in-from-right duration-200 text-right"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-border bg-card flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-foreground">سلة التسوق</h2>
              <p className="text-xs text-muted-foreground">
                {cartTotalItems} {cartTotalItems === 1 ? 'منتج' : 'منتجات'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free delivery banner */}
        <div className="bg-primary/8 px-4 py-2.5 border-b border-border text-xs flex items-center gap-2 text-primary font-medium">
          <Truck size={16} />
          <span>الدفع عند الاستلام متاح لجميع المدن المغربية</span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <p className="font-bold text-base text-foreground">سلتك فارغة حالياً</p>
              <p className="text-xs text-muted-foreground max-w-[220px]">
                تصفح منتجاتنا المختارة بعناية من واحة طاطا وأضف ما يعجبك!
              </p>
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigateToShop();
                }}
                className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-full text-xs hover:bg-accent transition cursor-pointer"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-muted/40 rounded-2xl border border-border"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-muted shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs text-foreground truncate">
                    {item.product.name}
                  </h3>
                  <div className="font-bold text-sm text-primary mt-1">
                    {item.product.price} د.م
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-border rounded-lg bg-card px-1 py-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                        aria-label="إنقاص"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                        aria-label="زيادة"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-red-500 p-1 transition cursor-pointer"
                      title="حذف"
                      aria-label="حذف"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="font-bold text-xs text-foreground self-end pb-1">
                  {item.product.price * item.quantity} د.م
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-border bg-card space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">المجموع الفرعي:</span>
              <span className="font-display font-bold text-xl text-primary">
                {cartSubtotal} د.م
              </span>
            </div>

            <p className="text-[11px] text-muted-foreground">
              مصاريف الشحن والخصومات يتم احتسابها عند صفحة إتمام الطلب.
            </p>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-full text-sm hover:bg-accent transition shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>متابعة الطلب (الدفع عند الاستلام)</span>
              <ArrowLeft size={16} className="rtl:rotate-0 ltr:rotate-180" />
            </button>

            <button
              onClick={() => {
                setCartDrawerOpen(false);
                navigateToShop();
              }}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground py-1 font-medium cursor-pointer"
            >
              متابعة التسوق
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

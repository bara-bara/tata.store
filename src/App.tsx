import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SearchModal } from './components/SearchModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { MetaTagManager } from './components/MetaTagManager';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import {
  ShippingPolicyView,
  ReturnsPolicyView,
  TermsView,
  PrivacyPolicyView,
} from './views/PolicyViews';
import { AdminLoginView } from './views/AdminLoginView';
import { AdminDashboardView } from './views/AdminDashboardView';

const StoreContent: React.FC = () => {
  const { currentPage, locale, activeProductId, products } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic Title for SEO & Browser Tab
    const currentProduct = products.find(p => p.id === activeProductId);
    switch (currentPage) {
      case 'home':
        document.title = 'TATA.STORE – منتوجات طاطا… من الواحة إلى باب دارك';
        break;
      case 'shop':
        document.title = 'المتجر – كافة منتوجات واحة طاطا | TATA.STORE';
        break;
      case 'product-detail':
        document.title = currentProduct
          ? `${currentProduct.name} | TATA.STORE`
          : 'تفاصيل المنتوج | TATA.STORE';
        break;
      case 'checkout':
        document.title = 'إتمام الطلب السريع والدفع عند الاستلام | TATA.STORE';
        break;
      case 'order-success':
        document.title = 'تم تسجيل طلبك بنجاح | TATA.STORE';
        break;
      case 'order-tracking':
        document.title = 'تتبع شحنتك | TATA.STORE';
        break;
      case 'about':
        document.title = 'عن واحة طاطا وقصتنا | TATA.STORE';
        break;
      case 'contact':
        document.title = 'اتصل بنا وخدمة الزبائن | TATA.STORE';
        break;
      case 'shipping-policy':
        document.title = 'سياسة الشحن والتوصيل | TATA.STORE';
        break;
      case 'returns':
        document.title = 'سياسة الإرجاع والاستبدال | TATA.STORE';
        break;
      case 'terms':
        document.title = 'الشروط والأحكام | TATA.STORE';
        break;
      case 'privacy':
        document.title = 'سياسة الخصوصية | TATA.STORE';
        break;
      case 'admin-login':
      case 'admin':
        document.title = 'لوحة التحكم الإدارية | TATA.STORE';
        break;
      default:
        document.title = 'TATA.STORE – منتوجات طاطا… من الواحة إلى باب دارك';
    }
  }, [currentPage, activeProductId, products]);

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'order-tracking':
        return <OrderTrackingView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'shipping-policy':
        return <ShippingPolicyView />;
      case 'returns':
        return <ReturnsPolicyView />;
      case 'terms':
        return <TermsView />;
      case 'privacy':
        return <PrivacyPolicyView />;
      case 'admin-login':
        return <AdminLoginView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return <HomeView />;
    }
  };

  const isAdminPage = currentPage === 'admin' || currentPage === 'admin-login';

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-background text-foreground font-body antialiased sand-grain selection:bg-primary selection:text-primary-foreground"
    >
      {/* Dynamic SEO & Social Share Meta Tag Manager */}
      <MetaTagManager />

      {/* Global Header (hidden on admin dashboard for clean workspace) */}
      {!isAdminPage && <Header />}

      {/* Main Routed Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Footer (hidden on admin dashboard) */}
      {!isAdminPage && <Footer />}

      {/* Global Modals & Overlays */}
      <CartDrawer />
      <ProductQuickViewModal />
      <SearchModal />
      {!isAdminPage && <WhatsAppFloat />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}

import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Tag,
  Star,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  MessageCircle,
  Search,
  ExternalLink,
  Download,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, Product, Category, Coupon, ProductReview } from '../types';

type AdminTab =
  | 'overview'
  | 'orders'
  | 'products'
  | 'categories'
  | 'coupons'
  | 'reviews'
  | 'settings';

export const AdminDashboardView: React.FC = () => {
  const {
    currentAdmin,
    adminLogout,
    setCurrentPage,
    orders,
    products,
    categories,
    coupons,
    reviews,
    settings,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    addCoupon,
    toggleCoupon,
    updateReviewStatus,
    updateSettings,
    adminChangePassword,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Search & Filter in Orders
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrderForView, setSelectedOrderForView] = useState<Order | null>(null);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    nameFr: '',
    categoryId: categories[0]?.id || 'cat-dates',
    price: 80,
    compareAtPrice: 100,
    weight: '1 كغ',
    stock: 25,
    origin: 'واحة إغشان، طاطا',
    shortDescription: '',
    description: '',
    ingredients: '',
    usage: '',
    badge: 'authentic',
    isFeatured: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80',
    ],
  });

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    nameFr: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80',
  });

  // Coupon Modal State
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountPercent: 10,
    minOrderAmount: 200,
  });

  // Settings State
  const [settingsPhone, setSettingsPhone] = useState(settings.phone);
  const [settingsWhatsapp, setSettingsWhatsapp] = useState(settings.whatsapp);
  const [settingsAnnouncement, setSettingsAnnouncement] = useState(settings.announcementText);
  const [settingsThreshold, setSettingsThreshold] = useState(settings.freeShippingThreshold);
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState(false);

  // Change Password in Settings State
  const [changePassCurrent, setChangePassCurrent] = useState('');
  const [changePassNew, setChangePassNew] = useState('');
  const [changePassSuccess, setChangePassSuccess] = useState(false);
  const [changePassError, setChangePassError] = useState('');

  if (!currentAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#2D241E]">غير مصرح بالدخول</h2>
        <p className="text-xs text-[#8C7A6B]">يرجى تسجيل الدخول أولاً للوصول إلى لوحة التحكم.</p>
        <button
          onClick={() => setCurrentPage('admin-login')}
          className="bg-[#2D5A27] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
        >
          تسجيل الدخول
        </button>
      </div>
    );
  }

  // Analytics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const pendingOrdersCount = orders.filter(
    o => o.status === 'new' || o.status === 'pending_confirmation'
  ).length;
  const lowStockProducts = products.filter(p => p.stock <= 5);

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase().trim();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        o.customerCity.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Handle open edit product
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({ ...prod });
    setIsProductModalOpen(true);
  };

  // Save product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
    } else {
      addProduct({
        sku: `TT-${Date.now().toString().slice(-4)}`,
        name: productForm.name || '',
        nameFr: productForm.nameFr || '',
        slug: (productForm.name || '').toLowerCase().replace(/\s+/g, '-'),
        categoryId: productForm.categoryId || categories[0]?.id || 'cat-dates',
        price: Number(productForm.price) || 50,
        compareAtPrice: productForm.compareAtPrice ? Number(productForm.compareAtPrice) : undefined,
        weight: productForm.weight || '1 كغ',
        stock: Number(productForm.stock) || 10,
        origin: productForm.origin || 'واحة طاطا',
        shortDescription: productForm.shortDescription || '',
        description: productForm.description || '',
        ingredients: productForm.ingredients || '',
        usage: productForm.usage || '',
        badge: productForm.badge,
        isFeatured: Boolean(productForm.isFeatured),
        isBestSeller: Boolean(productForm.isBestSeller),
        isActive: true,
        rating: 5.0,
        reviewCount: 0,
        tags: ['طاطا', 'طبيعي'],
        images: productForm.images || [
          'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80',
        ],
      });
    }

    setIsProductModalOpen(false);
    setEditingProductId(null);
  };

  // Save category
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) return;
    addCategory({
      name: categoryForm.name,
      nameFr: categoryForm.nameFr || categoryForm.name,
      slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-'),
      description: categoryForm.description,
      image: categoryForm.image,
      order: categories.length + 1,
      isActive: true,
    });
    setIsCategoryModalOpen(false);
    setCategoryForm({
      name: '',
      nameFr: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80',
    });
  };

  // Save coupon
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code) return;
    addCoupon({
      code: couponForm.code.toUpperCase().trim(),
      type: 'percentage',
      value: Number(couponForm.discountPercent),
      minOrderAmount: Number(couponForm.minOrderAmount),
      isActive: true,
      expiresAt: '2026-12-31',
    });
    setIsCouponModalOpen(false);
    setCouponForm({ code: '', discountPercent: 10, minOrderAmount: 200 });
  };

  // Save general settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      phone: settingsPhone,
      whatsapp: settingsWhatsapp,
      announcementText: settingsAnnouncement,
      freeShippingThreshold: Number(settingsThreshold),
    });
    setSaveSettingsSuccess(true);
    setTimeout(() => setSaveSettingsSuccess(false), 3000);
  };

  // Export JSON/SQL Backup
  const handleExportBackup = () => {
    const backupData = {
      store: 'TATA.STORE',
      exportedAt: new Date().toISOString(),
      products,
      categories,
      orders,
      coupons,
      reviews,
      settings,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tata_store_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16 text-right">
      
      {/* Top Admin Header Bar */}
      <div className="bg-white border-b border-[#E8DDCF] sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center font-serif font-black">
              ط
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-[#2D241E]">لوحة تحكم TATA.STORE</span>
                <span className="bg-[#2D5A27]/10 text-[#2D5A27] text-[10px] font-bold px-2 py-0.5 rounded">
                  المدير: {currentAdmin.username}
                </span>
              </div>
              <p className="text-[11px] text-[#8C7A6B]">إدارة المنتجات، الطلبات، والإعدادات</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage('home')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#4A2C11] hover:text-[#2D5A27] bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#E8DDCF] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>مشاهدة المتجر كعميل</span>
            </button>

            <button
              onClick={adminLogout}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold text-[#B33939] hover:bg-[#FDF2F2] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-6 border-b border-[#E8DDCF]">
          {[
            { id: 'overview', label: 'المؤشرات العامة', icon: <LayoutDashboard className="w-4 h-4" /> },
            {
              id: 'orders',
              label: `الطلبيات (${orders.length})`,
              icon: <ShoppingBag className="w-4 h-4" />,
              badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
            },
            { id: 'products', label: `المنتجات (${products.length})`, icon: <Package className="w-4 h-4" /> },
            { id: 'categories', label: `الأقسام (${categories.length})`, icon: <Layers className="w-4 h-4" /> },
            { id: 'coupons', label: `الكوبونات (${coupons.length})`, icon: <Tag className="w-4 h-4" /> },
            { id: 'reviews', label: `التقييمات (${reviews.length})`, icon: <Star className="w-4 h-4" /> },
            { id: 'settings', label: 'الإعدادات والنسخ', icon: <Settings className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#2D5A27] text-white shadow-xs'
                  : 'bg-white hover:bg-[#FAF7F2] text-[#4A3B32] border border-[#E8DDCF]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="bg-[#B33939] text-white text-[10px] px-1.5 py-0.2 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E8DDCF] shadow-2xs space-y-1">
                <span className="text-xs text-[#8C7A6B]">إجمالي المبيعات (COD):</span>
                <div className="text-2xl font-black text-[#2D5A27]">{totalRevenue} درهم</div>
                <span className="text-[10px] text-[#2D5A27] flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>محصلة الطلبات المؤكدة والمسلمة</span>
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8DDCF] shadow-2xs space-y-1">
                <span className="text-xs text-[#8C7A6B]">إجمالي الطلبيات:</span>
                <div className="text-2xl font-black text-[#2D241E]">{orders.length} طلب</div>
                <span className="text-[10px] text-[#C59B27] font-semibold">
                  {pendingOrdersCount} طلبات في انتظار التأكيد
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8DDCF] shadow-2xs space-y-1">
                <span className="text-xs text-[#8C7A6B]">عدد المنتجات المعروضة:</span>
                <div className="text-2xl font-black text-[#2D241E]">{products.length} منتوج</div>
                <span className="text-[10px] text-[#2D5A27] font-semibold">
                  موزعة على {categories.length} أصناف
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8DDCF] shadow-2xs space-y-1">
                <span className="text-xs text-[#8C7A6B]">تنبيهات المخزون المنخفض:</span>
                <div className="text-2xl font-black text-[#B33939]">
                  {lowStockProducts.length} منتجات
                </div>
                <span className="text-[10px] text-[#8C7A6B]">أقل من 5 وحدات متوفرة</span>
              </div>
            </div>

            {/* Quick Actions & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Orders List (8 cols) */}
              <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-[#E8DDCF] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-[#2D241E]">أحدث الطلبيات الواردة</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#2D5A27] hover:underline"
                  >
                    عرض جميع الطلبات ({orders.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#FAF7F2] border-b border-[#E8DDCF] text-[#6E5A4A]">
                      <tr>
                        <th className="p-2.5 font-bold">الرقم</th>
                        <th className="p-2.5 font-bold">الزبون والمدينة</th>
                        <th className="p-2.5 font-bold">المبلغ</th>
                        <th className="p-2.5 font-bold">الحالة</th>
                        <th className="p-2.5 font-bold">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EAE1]">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-[#FAF7F2]">
                          <td className="p-2.5 font-bold text-[#2D5A27]">#{o.orderNumber}</td>
                          <td className="p-2.5">
                            <div className="font-bold text-[#2D241E]">{o.customerName}</div>
                            <div className="text-[10px] text-[#8C7A6B]">{o.customerCity}</div>
                          </td>
                          <td className="p-2.5 font-bold text-[#2D241E]">{o.total} درهم</td>
                          <td className="p-2.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                o.status === 'delivered'
                                  ? 'bg-[#E8F8EE] text-[#1B5E20]'
                                  : o.status === 'shipped'
                                  ? 'bg-[#E0F2FE] text-[#0369A1]'
                                  : o.status === 'confirmed'
                                  ? 'bg-[#FEF3C7] text-[#92400E]'
                                  : 'bg-[#FAF7F2] text-[#633C1A]'
                              }`}
                            >
                              {o.status === 'new' || o.status === 'pending_confirmation'
                                ? 'جديد'
                                : o.status === 'confirmed'
                                ? 'مؤكد'
                                : o.status === 'preparing'
                                ? 'قيد التجهيز'
                                : o.status === 'shipped'
                                ? 'تم الشحن'
                                : o.status === 'delivered'
                                ? 'مسلّم'
                                : o.status}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <button
                              onClick={() => setSelectedOrderForView(o)}
                              className="text-xs text-[#2D5A27] font-bold hover:underline"
                            >
                              عرض
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Low Stock Warning Box (4 cols) */}
              <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-[#E8DDCF] shadow-2xs space-y-4">
                <h3 className="font-extrabold text-sm text-[#2D241E] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#C59B27]" />
                  <span>تنبيهات المخزون</span>
                </h3>

                {lowStockProducts.length === 0 ? (
                  <p className="text-xs text-[#8C7A6B]">جميع المنتجات متوفرة بمخزون كافٍ.</p>
                ) : (
                  <div className="space-y-2">
                    {lowStockProducts.map(p => (
                      <div
                        key={p.id}
                        className="p-2.5 rounded-xl bg-[#FDF2F2] border border-[#F5C2C2] text-xs flex items-center justify-between"
                      >
                        <span className="font-bold text-[#2D241E] truncate max-w-[140px]">
                          {p.name}
                        </span>
                        <span className="text-[#B33939] font-bold">بقي: {p.stock} فقط</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-[#F0EAE1]">
                  <button
                    onClick={handleExportBackup}
                    className="w-full py-2 bg-[#FAF7F2] hover:bg-[#EFE6DA] text-[#4A2C11] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تنزيل نسخة احتياطية (JSON)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8DDCF] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-sm">
                <Search className="w-4 h-4 text-[#8C7A6B]" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  placeholder="ابحث برقم الطلب، اسم الزبون، الهاتف..."
                  className="w-full text-xs bg-transparent focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8C7A6B]">الحالة:</span>
                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  className="text-xs bg-[#FAF7F2] border border-[#E8DDCF] rounded-xl px-2.5 py-1.5 focus:outline-hidden"
                >
                  <option value="all">كافة الحالات</option>
                  <option value="pending">في انتظار التأكيد</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="processing">قيد التجهيز</option>
                  <option value="shipped">تم الشحن</option>
                  <option value="delivered">تم التسليم</option>
                  <option value="cancelled">ملغى</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-[#E8DDCF] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#E8DDCF] text-[#4A3B32]">
                    <tr>
                      <th className="p-3 font-bold">رقم الطلب</th>
                      <th className="p-3 font-bold">الزبون</th>
                      <th className="p-3 font-bold">الهاتف</th>
                      <th className="p-3 font-bold">المدينة</th>
                      <th className="p-3 font-bold">المجموع</th>
                      <th className="p-3 font-bold">الحالة</th>
                      <th className="p-3 font-bold">تغيير الحالة</th>
                      <th className="p-3 font-bold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EAE1]">
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-[#FAF7F2]">
                        <td className="p-3 font-bold text-[#2D5A27]">#{order.orderNumber}</td>
                        <td className="p-3 font-bold text-[#2D241E]">{order.customerName}</td>
                        <td className="p-3" dir="ltr">{order.customerPhone}</td>
                        <td className="p-3">{order.customerCity}</td>
                        <td className="p-3 font-black text-[#2D5A27]">{order.total} درهم</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              order.status === 'delivered'
                                ? 'bg-[#E8F8EE] text-[#1B5E20]'
                                : order.status === 'shipped'
                                ? 'bg-[#E0F2FE] text-[#0369A1]'
                                : order.status === 'confirmed'
                                ? 'bg-[#FEF3C7] text-[#92400E]'
                                : order.status === 'cancelled'
                                ? 'bg-[#FDF2F2] text-[#B33939]'
                                : 'bg-[#FAF7F2] text-[#633C1A]'
                            }`}
                          >
                            {order.status === 'new' || order.status === 'pending_confirmation'
                              ? 'في الانتظار'
                              : order.status === 'confirmed'
                              ? 'مؤكد'
                              : order.status === 'preparing'
                              ? 'قيد التجهيز'
                              : order.status === 'shipped'
                              ? 'تم الشحن'
                              : order.status === 'delivered'
                              ? 'تم التسليم'
                              : 'ملغى'}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={order.status}
                            onChange={e =>
                              updateOrderStatus(order.id, e.target.value as Order['status'])
                            }
                            className="bg-[#FAF7F2] border border-[#E8DDCF] rounded-lg p-1 text-[11px] focus:outline-hidden"
                          >
                            <option value="new">طلب جديد</option>
                            <option value="pending_confirmation">في انتظار التأكيد</option>
                            <option value="confirmed">تأكيد الطلب</option>
                            <option value="preparing">قيد التجهيز</option>
                            <option value="shipped">تم الشحن</option>
                            <option value="delivered">تم التسليم</option>
                            <option value="cancelled">إلغاء الطلب</option>
                          </select>
                        </td>
                        <td className="p-3 flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrderForView(order)}
                            className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE6DA] text-[#2D5A27] font-bold"
                            title="تفاصيل الطلب"
                          >
                            عرض
                          </button>

                          <a
                            href={`https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `السلام عليكم سيدي/سيدتي ${order.customerName}، معكم متجر TATA.STORE بخصوص طلبيتكم رقم #${order.orderNumber}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#E8F8EE] text-[#25D366] hover:bg-[#D4F2DE]"
                            title="تواصل واتساب"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#2D241E]">
                قائمة المنتوجات ({products.length})
              </h3>
              <button
                onClick={() => {
                  setEditingProductId(null);
                  setProductForm({
                    name: '',
                    nameFr: '',
                    categoryId: categories[0]?.id || 'cat-dates',
                    price: 80,
                    compareAtPrice: 100,
                    weight: '1 كغ',
                    stock: 25,
                    origin: 'واحة إغشان، طاطا',
                    shortDescription: '',
                    description: '',
                    ingredients: '',
                    usage: '',
                    badge: 'authentic',
                    isFeatured: true,
                    isBestSeller: false,
                    images: [
                      'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80',
                    ],
                  });
                  setIsProductModalOpen(true);
                }}
                className="bg-[#2D5A27] hover:bg-[#23481E] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة منتوج جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(p => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#E8DDCF] overflow-hidden p-3.5 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-[#FAF7F2]">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                        المخزون: {p.stock}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-[#2D241E] line-clamp-1">
                      {p.name}
                    </h4>

                    <div className="flex items-baseline gap-1 text-xs font-black text-[#2D5A27]">
                      <span>{p.price} درهم</span>
                      {p.compareAtPrice && (
                        <span className="text-[10px] text-[#8C7A6B] line-through">
                          {p.compareAtPrice} درهم
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F0EAE1] flex gap-2">
                    <button
                      onClick={() => handleOpenEditProduct(p)}
                      className="flex-1 bg-[#FAF7F2] hover:bg-[#EFE6DA] text-[#4A2C11] py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`هل أنت متأكد من حذف المنتج "${p.name}"؟`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-1.5 bg-[#FDF2F2] hover:bg-[#FCE8E8] text-[#B33939] rounded-lg"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#2D241E]">
                أقسام واحة طاطا ({categories.length})
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="bg-[#2D5A27] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة قسم جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map(cat => (
                <div
                  key={cat.id}
                  className="bg-white p-4 rounded-2xl border border-[#E8DDCF] flex items-center gap-3"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#2D241E]">{cat.name}</h4>
                    <p className="text-[11px] text-[#8C7A6B] line-clamp-1">{cat.description}</p>
                    <span className="text-[10px] text-[#2D5A27] font-semibold">
                      {products.filter(p => p.categoryId === cat.id).length} منتوجات
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. COUPONS TAB */}
        {activeTab === 'coupons' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#2D241E]">
                كوبونات الخصم ({coupons.length})
              </h3>
              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="bg-[#2D5A27] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إنشاء كوبون جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map(cp => (
                <div
                  key={cp.id}
                  className="bg-white p-4 rounded-2xl border border-[#E8DDCF] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[#2D5A27] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E8DDCF]">
                      {cp.code}
                    </span>
                    <button
                      onClick={() => toggleCoupon(cp.id)}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        cp.isActive ? 'bg-[#E8F8EE] text-[#1B5E20]' : 'bg-[#FDF2F2] text-[#B33939]'
                      }`}
                    >
                      {cp.isActive ? 'مفعل ✓' : 'معطل ✕'}
                    </button>
                  </div>
                  <p className="text-xs text-[#4A3B32]">
                    خصم <strong>{cp.value}%</strong> للطلبات فوق {cp.minOrderAmount} درهم
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-[#2D241E]">
              تقييمات الزبائن ({reviews.length})
            </h3>
            <div className="space-y-3">
              {reviews.map(rev => (
                <div
                  key={rev.id}
                  className="bg-white p-4 rounded-2xl border border-[#E8DDCF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#2D241E]">{rev.customerName}</span>
                      <span className="text-[#8C7A6B]">({rev.customerCity})</span>
                      <span className="text-[#C59B27] font-bold">★ {rev.rating}/5</span>
                    </div>
                    <p className="text-[#4A3B32]">"{rev.comment}"</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {rev.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => updateReviewStatus(rev.id, 'approved')}
                          className="bg-[#2D5A27] text-white px-3 py-1 rounded-lg font-bold"
                        >
                          موافقة ونشر
                        </button>
                        <button
                          onClick={() => updateReviewStatus(rev.id, 'rejected')}
                          className="bg-[#FDF2F2] text-[#B33939] px-3 py-1 rounded-lg font-bold"
                        >
                          رفض
                        </button>
                      </>
                    ) : (
                      <span
                        className={`font-bold ${
                          rev.status === 'approved' ? 'text-[#2D5A27]' : 'text-[#B33939]'
                        }`}
                      >
                        {rev.status === 'approved' ? 'منشور ✓' : 'مرفوض ✕'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General store settings */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DDCF] shadow-2xs space-y-4">
              <h3 className="font-extrabold text-sm text-[#2D241E]">بيانات المتجر والتوصيل</h3>

              {saveSettingsSuccess && (
                <div className="p-3 bg-[#E8F8EE] text-[#1B5E20] text-xs font-bold rounded-xl">
                  تم حفظ التغييرات بنجاح!
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">رقم الهاتف:</label>
                  <input
                    type="text"
                    value={settingsPhone}
                    onChange={e => setSettingsPhone(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DDCF] p-2.5 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">رقم واتساب:</label>
                  <input
                    type="text"
                    value={settingsWhatsapp}
                    onChange={e => setSettingsWhatsapp(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DDCF] p-2.5 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">شريط الإعلانات العلوي:</label>
                  <input
                    type="text"
                    value={settingsAnnouncement}
                    onChange={e => setSettingsAnnouncement(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DDCF] p-2.5 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">حد الشحن المجاني (درهم):</label>
                  <input
                    type="number"
                    value={settingsThreshold}
                    onChange={e => setSettingsThreshold(Number(e.target.value))}
                    className="w-full bg-[#FAF7F2] border border-[#E8DDCF] p-2.5 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#2D5A27] text-white font-bold py-2.5 px-4 rounded-xl cursor-pointer"
                >
                  حفظ الإعدادات
                </button>
              </form>
            </div>

            {/* Admin Password & cPanel Deployment Export */}
            <div className="space-y-6">
              {/* Change Password */}
              <div className="bg-white p-6 rounded-2xl border border-[#E8DDCF] shadow-2xs space-y-4">
                <h3 className="font-extrabold text-sm text-[#2D241E]">تغيير كلمة المرور الإدارية</h3>
                {changePassSuccess && (
                  <p className="text-xs text-[#2D5A27] font-bold">تم تغيير كلمة السر بنجاح!</p>
                )}
                {changePassError && (
                  <p className="text-xs text-[#B33939] font-bold">{changePassError}</p>
                )}
                <div className="space-y-2 text-xs">
                  <input
                    type="password"
                    placeholder="كلمة المرور الحالية..."
                    value={changePassCurrent}
                    onChange={e => setChangePassCurrent(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DDCF] p-2.5 rounded-xl"
                  />
                  <input
                    type="password"
                    placeholder="كلمة المرور الجديدة (8 أحرف على الأقل)..."
                    value={changePassNew}
                    onChange={e => setChangePassNew(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8DDCF] p-2.5 rounded-xl"
                  />
                  <button
                    onClick={async () => {
                      setChangePassError('');
                      if (!changePassCurrent) {
                        setChangePassError('يرجى إدخال كلمة المرور الحالية');
                        return;
                      }
                      if (changePassNew.length < 8) {
                        setChangePassError('يجب أن لا تقل كلمة المرور الجديدة عن 8 أحرف');
                        return;
                      }
                      const res = await adminChangePassword(changePassCurrent, changePassNew);
                      if (res.success) {
                        setChangePassSuccess(true);
                        setChangePassCurrent('');
                        setChangePassNew('');
                        setTimeout(() => setChangePassSuccess(false), 3000);
                      } else {
                        setChangePassError(res.message || 'تعذر تغيير كلمة المرور');
                      }
                    }}
                    className="bg-[#4A2C11] text-white font-bold py-2 px-4 rounded-xl cursor-pointer"
                  >
                    تحديث كلمة المرور
                  </button>
                </div>
              </div>

              {/* cPanel / Deployment Export Box */}
              <div className="bg-white p-6 rounded-2xl border border-[#E8DDCF] shadow-2xs space-y-3 text-xs">
                <h3 className="font-extrabold text-sm text-[#2D241E]">
                  تصدير البيانات ونشر cPanel
                </h3>
                <p className="text-[#6E5A4A] leading-relaxed">
                  يمكنك استخراج كافة بيانات المتجر (المنتجات، الطلبات، الكوبونات) بصيغة JSON، أو
                  استخدام مجلد البناء الجاهز للنشر المباشر على خوادم cPanel في المسار{' '}
                  <code className="bg-[#FAF7F2] p-1 rounded font-mono">public_html</code>.
                </p>
                <button
                  onClick={handleExportBackup}
                  className="bg-[#FAF7F2] hover:bg-[#EFE6DA] border border-[#E8DDCF] text-[#4A2C11] font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#2D5A27]" />
                  <span>تصدير ملف النسخة الكاملة للمتجر</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* View Order Modal */}
      {selectedOrderForView && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <h3 className="font-black text-base text-[#2D241E]">
                تفاصيل الطلب #{selectedOrderForView.orderNumber}
              </h3>
              <button
                onClick={() => setSelectedOrderForView(null)}
                className="text-xs font-bold px-2 py-1 bg-[#FAF7F2] rounded-lg"
              >
                إغلاق
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF7F2] p-3 rounded-xl">
              <div>
                <span className="text-[#8C7A6B]">الاسم: </span>
                <strong>{selectedOrderForView.customerName}</strong>
              </div>
              <div>
                <span className="text-[#8C7A6B]">الهاتف: </span>
                <strong dir="ltr">{selectedOrderForView.customerPhone}</strong>
              </div>
              <div>
                <span className="text-[#8C7A6B]">المدينة: </span>
                <strong>{selectedOrderForView.customerCity}</strong>
              </div>
              <div>
                <span className="text-[#8C7A6B]">العنوان: </span>
                <span>{selectedOrderForView.customerAddress}</span>
              </div>
              {selectedOrderForView.notes && (
                <div className="col-span-2">
                  <span className="text-[#8C7A6B]">ملاحظات: </span>
                  <span>{selectedOrderForView.notes}</span>
                </div>
              )}
            </div>

            <div className="border border-[#E8DDCF] rounded-xl overflow-hidden text-xs">
              <table className="w-full text-right">
                <thead className="bg-[#FAF7F2] p-2">
                  <tr>
                    <th className="p-2">المنتج</th>
                    <th className="p-2 text-center">الكمية</th>
                    <th className="p-2 text-left">السعر</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAE1]">
                  {selectedOrderForView.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-2 font-bold">{it.productName}</td>
                      <td className="p-2 text-center">{it.quantity}</td>
                      <td className="p-2 text-left">{it.total} درهم</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-xs flex justify-between font-black text-base text-[#2D5A27] pt-2 border-t">
              <span>المجموع الكلي:</span>
              <span>{selectedOrderForView.total} درهم</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-[#FAF7F2] border border-[#E8DDCF] py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة بون الطلب</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <h3 className="font-black text-base text-[#2D241E]">
                {editingProductId ? 'تعديل بيانات المنتج' : 'إضافة منتوج جديد إلى واحة طاطا'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-xs font-bold px-2 py-1 bg-[#FAF7F2] rounded-lg"
              >
                إغلاق
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">اسم المنتج (بالعربية):</label>
                  <input
                    type="text"
                    required
                    value={productForm.name || ''}
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">الاسم بالفرنسية (اختياري):</label>
                  <input
                    type="text"
                    value={productForm.nameFr || ''}
                    onChange={e => setProductForm({ ...productForm, nameFr: e.target.value })}
                    className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">السعر (درهم):</label>
                  <input
                    type="number"
                    required
                    value={productForm.price || ''}
                    onChange={e =>
                      setProductForm({ ...productForm, price: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">السعر القديم قبل الخصم:</label>
                  <input
                    type="number"
                    value={productForm.compareAtPrice || ''}
                    onChange={e =>
                      setProductForm({ ...productForm, compareAtPrice: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">المخزون المتوفر:</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock || ''}
                    onChange={e =>
                      setProductForm({ ...productForm, stock: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">الفئة / القسم:</label>
                  <select
                    value={productForm.categoryId}
                    onChange={e => setProductForm({ ...productForm, categoryId: e.target.value })}
                    className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">الوزن / الحجم:</label>
                  <input
                    type="text"
                    value={productForm.weight || ''}
                    onChange={e => setProductForm({ ...productForm, weight: e.target.value })}
                    placeholder="مثال: 1 كغ، 500 غرام"
                    className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">مصدر المنتج بالواحة:</label>
                <input
                  type="text"
                  value={productForm.origin || ''}
                  onChange={e => setProductForm({ ...productForm, origin: e.target.value })}
                  placeholder="مثال: واحة إغشان، طاطا"
                  className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رابط الصورة الرئيسية:</label>
                <input
                  type="text"
                  value={productForm.images?.[0] || ''}
                  onChange={e => setProductForm({ ...productForm, images: [e.target.value] })}
                  className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">وصف مختصر:</label>
                <input
                  type="text"
                  value={productForm.shortDescription || ''}
                  onChange={e =>
                    setProductForm({ ...productForm, shortDescription: e.target.value })
                  }
                  className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">الوصف الكامل:</label>
                <textarea
                  rows={3}
                  value={productForm.description || ''}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={e =>
                      setProductForm({ ...productForm, isFeatured: e.target.checked })
                    }
                  />
                  <span>منتج مميز بالرئيسية</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={e =>
                      setProductForm({ ...productForm, isBestSeller: e.target.checked })
                    }
                  />
                  <span>الأكثر مبيعاً 🔥</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D5A27] text-white py-3 rounded-xl font-bold cursor-pointer"
              >
                حفظ المنتج
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4">
            <h3 className="font-black text-base text-[#2D241E]">إضافة فئة جديدة</h3>
            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">اسم الفئة بالعربية:</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">الوصف:</label>
                <input
                  type="text"
                  value={categoryForm.description}
                  onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">رابط صورة القسم:</label>
                <input
                  type="text"
                  value={categoryForm.image}
                  onChange={e => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                />
              </div>
              <button type="submit" className="w-full bg-[#2D5A27] text-white py-2.5 rounded-xl font-bold">
                إضافة القسم
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4">
            <h3 className="font-black text-base text-[#2D241E]">إنشاء كود كوبون خصم</h3>
            <form onSubmit={handleSaveCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">كود الكوبون:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: RAMADAN15"
                  value={couponForm.code}
                  onChange={e => setCouponForm({ ...couponForm, code: e.target.value })}
                  className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl uppercase"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">نسبة الخصم (%):</label>
                <input
                  type="number"
                  required
                  value={couponForm.discountPercent}
                  onChange={e =>
                    setCouponForm({ ...couponForm, discountPercent: Number(e.target.value) })
                  }
                  className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">الحد الأدنى للطلب (درهم):</label>
                <input
                  type="number"
                  value={couponForm.minOrderAmount}
                  onChange={e =>
                    setCouponForm({ ...couponForm, minOrderAmount: Number(e.target.value) })
                  }
                  className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl"
                />
              </div>
              <button type="submit" className="w-full bg-[#2D5A27] text-white py-2.5 rounded-xl font-bold">
                تفعيل الكوبون
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

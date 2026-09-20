/**
 * TATA.STORE - Global Store Context & Persistent State Management
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  OrderStatus,
  MoroccanCity,
  ShippingZone,
  Coupon,
  ProductReview,
  SiteSettings,
  AdminUser,
  Customer,
  Locale,
  ActivePage,
  ProductVariant,
} from '../types';
import {
  INITIAL_CITIES,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_SHIPPING_ZONES,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_SETTINGS,
  INITIAL_CUSTOMERS,
  INITIAL_ADMIN_USER,
} from '../data/initialData';

// Helper for SHA-256 hashing in browser
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface StoreContextType {
  // Navigation & Routing
  currentPage: ActivePage;
  setCurrentPage: (page: ActivePage) => void;
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  navigateToProduct: (productId: string) => void;
  navigateToCategory: (slug: string) => void;
  navigateToShop: (filterCategory?: string) => void;

  // Language
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (key: string) => string;

  // Products & Categories
  products: Product[];
  categories: Category[];
  cities: MoroccanCity[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (cat: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, cat: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalItems: number;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Shipping & Cities
  selectedCity: MoroccanCity | null;
  setSelectedCity: (city: MoroccanCity | null) => void;
  shippingZones: ShippingZone[];
  shippingFee: number;
  freeShippingProgress: {
    current: number;
    threshold: number;
    remaining: number;
    percentage: number;
    isFree: boolean;
  };

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void;
  deleteCoupon: (id: string) => void;
  toggleCoupon: (id: string) => void;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerCity: string;
    customerAddress: string;
    notes?: string;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  findOrderByNumberAndPhone: (orderNumber: string, phone: string) => Order | undefined;

  // Reviews
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'status' | 'createdAt'>) => void;
  updateReviewStatus: (id: string, status: 'approved' | 'rejected') => void;
  deleteReview: (id: string) => void;

  // Customers & Settings
  customers: Customer[];
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;

  // Admin Auth
  currentAdmin: AdminUser | null;
  adminLogin: (username: string, passwordAttempt: string) => Promise<{ success: boolean; mustChangePassword?: boolean; message?: string }>;
  adminChangePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  adminLogout: () => void;

  // UI Modals
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;

  // Reset demo data
  resetAllData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PRODUCTS: 'tata_store_products_v1',
  CATEGORIES: 'tata_store_categories_v1',
  CART: 'tata_store_cart_v1',
  WISHLIST: 'tata_store_wishlist_v1',
  ORDERS: 'tata_store_orders_v1',
  REVIEWS: 'tata_store_reviews_v1',
  SETTINGS: 'tata_store_settings_v1',
  COUPONS: 'tata_store_coupons_v1',
  ADMIN_USER: 'tata_store_admin_user_v1',
  CUSTOMERS: 'tata_store_customers_v1',
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locale, setLocale] = useState<Locale>('ar');

  // UI States
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Entities stored in localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST);
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : [
      {
        id: 'ord-1',
        orderNumber: 'TATA-2026-1001',
        customerName: 'محمد الإدريسي',
        customerPhone: '0661234567',
        customerCity: 'الدار البيضاء',
        customerAddress: 'حي المعاريف، شارع الزرقطوني عمارة 45',
        notes: 'الرجاء الاتصال قبل التوصيل',
        items: [
          {
            productId: 'prod-boufeggous',
            productName: 'تمر بوفقوس طاطا الفاخر',
            productImage: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=300&q=80',
            variantName: 'علبة 1 كغ',
            price: 85,
            quantity: 2,
            total: 170,
          },
          {
            productId: 'prod-couscous-khoumassi',
            productName: 'كسكس طاطا الخماسي التقليدي المفتول باليد',
            productImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=300&q=80',
            variantName: 'كيس 1 كغ',
            price: 45,
            quantity: 1,
            total: 45,
          }
        ],
        subtotal: 215,
        discount: 0,
        shippingFee: 35,
        total: 250,
        paymentMethod: 'COD',
        status: 'shipped',
        createdAt: '2026-03-01T11:20:00Z',
        updatedAt: '2026-03-02T09:15:00Z',
      },
      {
        id: 'ord-2',
        orderNumber: 'TATA-2026-1002',
        customerName: 'فاطمة الزهراء برادة',
        customerPhone: '0672345678',
        customerCity: 'الرباط',
        customerAddress: 'حي أكدال، شارع الأطلس إقامة النخيل',
        items: [
          {
            productId: 'prod-honey-daghmous',
            productName: 'عسل الدغموس الصحراوي الحر',
            productImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&q=80',
            variantName: 'مرطبان زجاجي 500 غرام',
            price: 240,
            quantity: 1,
            total: 240,
          }
        ],
        subtotal: 240,
        discount: 24,
        couponCode: 'WAHA10',
        shippingFee: 35,
        total: 251,
        paymentMethod: 'COD',
        status: 'confirmed',
        createdAt: '2026-03-03T15:40:00Z',
        updatedAt: '2026-03-03T16:00:00Z',
      }
    ];
  });

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COUPONS);
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [adminUser, setAdminUser] = useState<AdminUser>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ADMIN_USER);
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_USER;
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CUSTOMERS);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  // Shipping & checkout state
  const [selectedCity, setSelectedCity] = useState<MoroccanCity | null>(() => INITIAL_CITIES[0]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ADMIN_USER, JSON.stringify(adminUser));
  }, [adminUser]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  // Adjust HTML dir and lang based on locale
  useEffect(() => {
    const htmlEl = document.documentElement;
    if (locale === 'ar') {
      htmlEl.setAttribute('dir', 'rtl');
      htmlEl.setAttribute('lang', 'ar');
    } else {
      htmlEl.setAttribute('dir', 'ltr');
      htmlEl.setAttribute('lang', 'fr');
    }
  }, [locale]);

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Shipping calculations
  const isFreeThresholdMet = cartSubtotal >= settings.freeShippingThreshold;
  const isTataCity = selectedCity?.isTata ?? false;

  let shippingFee = 0;
  if (cart.length > 0) {
    if (isFreeThresholdMet) {
      shippingFee = 0;
    } else if (isTataCity) {
      shippingFee = cartSubtotal >= 180 ? 0 : settings.tataLocalShippingRate;
    } else {
      shippingFee = settings.defaultShippingRate;
    }
  }

  const freeShippingProgress = {
    current: cartSubtotal,
    threshold: settings.freeShippingThreshold,
    remaining: Math.max(0, settings.freeShippingThreshold - cartSubtotal),
    percentage: Math.min(100, Math.round((cartSubtotal / settings.freeShippingThreshold) * 100)),
    isFree: isFreeThresholdMet,
  };

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.value);
    }
  }

  // Navigation helpers
  const navigateToProduct = (productId: string) => {
    setActiveProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = (filterCategory?: string) => {
    if (filterCategory) {
      setSelectedCategorySlug(filterCategory);
    }
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    const effectivePrice = variant ? variant.price : product.price;
    const cartItemId = variant ? `${product.id}-${variant.id}` : product.id;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === cartItemId);
      if (existing) {
        return prevCart.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedVariant: variant,
          quantity,
          price: effectivePrice,
        },
      ];
    });

    setCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupons
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code.toUpperCase() === trimmed && c.isActive);

    if (!coupon) {
      return { success: false, message: 'رمز الكوبون غير صحيح أو منتهي الصلاحية' };
    }

    if (cartSubtotal < coupon.minOrderAmount) {
      return {
        success: false,
        message: `الحد الأدنى لتفعيل هذا الكوبون هو ${coupon.minOrderAmount} درهم`,
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: 'تم تفعيل الكوبون بنجاح واستفدت من التخفيض!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      usedCount: 0,
    };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    if (appliedCoupon?.id === id) {
      setAppliedCoupon(null);
    }
  };

  const toggleCoupon = (id: string) => {
    setCoupons(prev =>
      prev.map(c => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Order creation (COD)
  const createOrder = async (orderData: {
    customerName: string;
    customerPhone: string;
    customerCity: string;
    customerAddress: string;
    notes?: string;
  }): Promise<Order> => {
    const orderNum = `TATA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const total = Math.max(0, cartSubtotal - discountAmount + shippingFee);

    const orderItems = cart.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      productImage: item.product.images[0] || '',
      variantName: item.selectedVariant?.name,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerCity: orderData.customerCity,
      customerAddress: orderData.customerAddress,
      notes: orderData.notes,
      items: orderItems,
      subtotal: cartSubtotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      shippingFee,
      total,
      paymentMethod: 'COD',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Update customer directory
    setCustomers(prev => {
      const existing = prev.find(c => c.phone === orderData.customerPhone);
      if (existing) {
        return prev.map(c =>
          c.phone === orderData.customerPhone
            ? {
                ...c,
                ordersCount: c.ordersCount + 1,
                totalSpent: c.totalSpent + total,
                lastOrderDate: new Date().toISOString().split('T')[0],
              }
            : c
        );
      }
      return [
        {
          id: `cust-${Date.now()}`,
          name: orderData.customerName,
          phone: orderData.customerPhone,
          city: orderData.customerCity,
          address: orderData.customerAddress,
          ordersCount: 1,
          totalSpent: total,
          lastOrderDate: new Date().toISOString().split('T')[0],
          status: 'active',
        },
        ...prev,
      ];
    });

    // Deduct stock
    setProducts(prev =>
      prev.map(prod => {
        const cartMatch = cart.find(c => c.productId === prod.id);
        if (cartMatch) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - cartMatch.quantity),
          };
        }
        return prod;
      })
    );

    // Save order
    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);

    // Clear cart
    clearCart();

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const findOrderByNumberAndPhone = (orderNumber: string, phone: string) => {
    const cleanNum = orderNumber.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    return orders.find(
      o =>
        o.orderNumber.toUpperCase() === cleanNum &&
        o.customerPhone.replace(/\s+/g, '').includes(cleanPhone)
    );
  };

  // Products CRUD
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, prodData: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...prodData } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Categories CRUD
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, catData: Partial<Category>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...catData } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Reviews CRUD
  const addReview = (reviewData: Omit<ProductReview, 'id' | 'status' | 'createdAt'>) => {
    const newReview: ProductReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const updateReviewStatus = (id: string, status: 'approved' | 'rejected') => {
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Admin Authentication
  const adminLogin = async (username: string, passwordAttempt: string) => {
    if (username.trim().toLowerCase() !== adminUser.username.toLowerCase()) {
      return { success: false, message: 'اسم المستخدم غير صحيح' };
    }

    const hashedAttempt = await sha256(passwordAttempt);
    if (hashedAttempt !== adminUser.passwordHash) {
      return { success: false, message: 'كلمة المرور غير صحيحة' };
    }

    setCurrentAdmin(adminUser);

    if (adminUser.mustChangePassword) {
      return {
        success: true,
        mustChangePassword: true,
        message: 'يجب تغيير كلمة المرور المؤقتة لأمان حسابك قبل المتابعة',
      };
    }

    return { success: true, mustChangePassword: false };
  };

  const adminChangePassword = async (oldPass: string, newPass: string) => {
    const hashedOld = await sha256(oldPass);
    if (hashedOld !== adminUser.passwordHash) {
      return { success: false, message: 'كلمة المرور الحالية غير صحيحة' };
    }

    if (newPass.length < 8) {
      return { success: false, message: 'كلمة المرور الجديدة يجب أن تحتوي على 8 خانات على الأقل' };
    }

    const hashedNew = await sha256(newPass);
    const updatedAdmin: AdminUser = {
      ...adminUser,
      passwordHash: hashedNew,
      mustChangePassword: false,
    };

    setAdminUser(updatedAdmin);
    setCurrentAdmin(updatedAdmin);

    return { success: true, message: 'تم تحديث كلمة المرور بنجاح وحمايتها بتشفير SHA-256' };
  };

  const adminLogout = () => {
    setCurrentAdmin(null);
    setCurrentPage('home');
  };

  const resetAllData = () => {
    localStorage.clear();
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    setReviews(INITIAL_REVIEWS);
    setSettings(INITIAL_SETTINGS);
    setCoupons(INITIAL_COUPONS);
    setAdminUser(INITIAL_ADMIN_USER);
    setCustomers(INITIAL_CUSTOMERS);
  };

  // Simple localization dict
  const t = (key: string): string => {
    const dictAr: Record<string, string> = {
      'nav.home': 'الرئيسية',
      'nav.shop': 'المتجر',
      'nav.categories': 'الأقسام',
      'nav.about': 'من نحن',
      'nav.contact': 'تواصل معنا',
      'nav.track': 'تتبع طلبيتك',
      'cart.title': 'سلة المشتريات',
      'cart.empty': 'سلتك فارغة حالياً',
      'cart.checkout': 'إتمام الطلب (الدفع عند الاستلام)',
      'cart.subtotal': 'المجموع الفرعي',
      'cart.shipping': 'الشحن والتوصيل',
      'cart.total': 'الإجمالي النهائي',
      'product.add_to_cart': 'أضف إلى السلة',
      'product.buy_now': 'اشتري الآن',
      'product.stock_in': 'متوفر في المخزون',
      'product.currency': 'درهم',
    };

    const dictFr: Record<string, string> = {
      'nav.home': 'Accueil',
      'nav.shop': 'Boutique',
      'nav.categories': 'Catégories',
      'nav.about': 'À propos',
      'nav.contact': 'Contact',
      'nav.track': 'Suivre ma commande',
      'cart.title': 'Votre Panier',
      'cart.empty': 'Votre panier est actuellement vide',
      'cart.checkout': 'Commander (Paiement à la livraison)',
      'cart.subtotal': 'Sous-total',
      'cart.shipping': 'Frais de livraison',
      'cart.total': 'Total',
      'product.add_to_cart': 'Ajouter au panier',
      'product.buy_now': 'Acheter maintenant',
      'product.stock_in': 'En stock',
      'product.currency': 'DH',
    };

    if (locale === 'fr') {
      return dictFr[key] || dictAr[key] || key;
    }
    return dictAr[key] || key;
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        activeProductId,
        setActiveProductId,
        selectedCategorySlug,
        setSelectedCategorySlug,
        searchQuery,
        setSearchQuery,
        navigateToProduct,
        navigateToCategory,
        navigateToShop,
        locale,
        setLocale,
        t,
        products,
        categories,
        cities: INITIAL_CITIES,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotalItems,
        cartDrawerOpen,
        setCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        selectedCity,
        setSelectedCity,
        shippingZones: INITIAL_SHIPPING_ZONES,
        shippingFee,
        freeShippingProgress,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        addCoupon,
        deleteCoupon,
        toggleCoupon,
        orders,
        currentOrder,
        setCurrentOrder,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        findOrderByNumberAndPhone,
        reviews,
        addReview,
        updateReviewStatus,
        deleteReview,
        customers,
        settings,
        updateSettings,
        currentAdmin,
        adminLogin,
        adminChangePassword,
        adminLogout,
        quickViewProduct,
        setQuickViewProduct,
        searchModalOpen,
        setSearchModalOpen,
        resetAllData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

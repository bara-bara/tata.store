/**
 * TATA.STORE - Global TypeScript Definitions & Schemas
 */

export type Locale = 'ar' | 'fr';

export type ProductBadge = 'new' | 'bestseller' | 'sale' | 'original' | 'authentic' | 'limited';

export interface ProductVariant {
  id: string;
  name: string; // e.g., "500 غرام", "1 كيلوغرام", "2 كيلوغرام"
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku: string;
  weight: string;
}

export interface Product {
  id: string;
  name: string;
  nameFr?: string;
  slug: string;
  shortDescription: string;
  shortDescriptionFr?: string;
  description: string;
  descriptionFr?: string;
  price: number;
  compareAtPrice?: number;
  categoryId: string;
  images: string[];
  stock: number;
  sku: string;
  weight: string;
  origin: string; // e.g. "واحة إغشان، إقليم طاطا"
  ingredients?: string;
  usage?: string;
  preservation?: string;
  badge?: ProductBadge;
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  variants?: ProductVariant[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameFr: string;
  slug: string;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + variant.id)
  productId: string;
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | 'new' // جديد
  | 'pending_confirmation' // في انتظار التأكيد
  | 'confirmed' // مؤكد
  | 'preparing' // قيد التحضير
  | 'shipped' // تم الشحن
  | 'delivered' // تم التوصيل
  | 'completed' // مكتمل
  | 'cancelled' // ملغى
  | 'returned'; // مرتجع

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantName?: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g., TATA-2026-1049
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: 'COD'; // Cash On Delivery
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MoroccanCity {
  id: string;
  nameAr: string;
  nameFr: string;
  region: string;
  isTata: boolean;
}

export interface ShippingZone {
  id: string;
  name: string;
  rate: number;
  freeAbove: number;
  estimatedDelivery: string;
  cities: string[];
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // percentage (e.g. 10) or fixed amount in MAD (e.g. 30)
  minOrderAmount: number;
  maxUsageLimit?: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  customerCity: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'blocked';
}

export interface HeroSlide {
  title: string;
  subtitle: string;
  badge: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

export interface SiteSettings {
  storeName: string;
  storeSlogan: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  announcementText: string;
  announcementActive: boolean;
  freeShippingThreshold: number;
  defaultShippingRate: number;
  tataLocalShippingRate: number;
  googleAnalyticsId: string;
  metaPixelId: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  hero: HeroSlide;
}

export type AdminRole = 'Super Admin' | 'Manager' | 'Orders Manager' | 'Content Manager';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: AdminRole;
  passwordHash: string;
  mustChangePassword: boolean;
  createdAt: string;
}

export type ActivePage =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'order-tracking'
  | 'about'
  | 'contact'
  | 'terms'
  | 'shipping-policy'
  | 'privacy'
  | 'returns'
  | 'faq'
  | 'admin-login'
  | 'admin'
  | 'error-404';

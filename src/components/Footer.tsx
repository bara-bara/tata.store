import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, navigateToShop } = useStore();

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold mb-3">
              TATA<span className="text-gold">.</span>STORE
            </h3>
            <p className="text-primary-foreground/75 text-sm leading-relaxed">
              منتوجات طاطا الأصيلة، نختارها بعناية لتصلك أينما كنت. من الواحة إلى باب دارك.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">روابط سريعة</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition cursor-pointer"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateToShop();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition cursor-pointer"
                >
                  المتجر
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition cursor-pointer"
                >
                  من نحن
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition cursor-pointer"
                >
                  تواصل معنا
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('order-tracking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition cursor-pointer"
                >
                  تتبع الطلب
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Help / Policies */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">المساعدة</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('shipping-policy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition cursor-pointer"
                >
                  سياسة الشحن
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('returns');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition cursor-pointer"
                >
                  سياسة الإرجاع
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition cursor-pointer"
                >
                  سياسة الخصوصية
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('terms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-gold transition cursor-pointer"
                >
                  الشروط والأحكام
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold shrink-0" />
                <span dir="ltr">+212 6 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-gold shrink-0" />
                <span>contact@tata.store</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-gold shrink-0" />
                <span>طاطا، المغرب</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-accent flex items-center justify-center transition cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/15 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} TATA.STORE — جميع الحقوق محفوظة.</p>
          <p>صُنع بكل حب لمنتوجات طاطا الأصيلة 🌴</p>
        </div>
      </div>
    </footer>
  );
};

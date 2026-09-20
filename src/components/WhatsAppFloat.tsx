import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppFloat: React.FC = () => {
  const { settings } = useStore();
  const phone = settings.whatsapp ? settings.whatsapp.replace(/\D/g, '') : '212600000000';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent('مرحبا، أحتاج مساعدة حول منتجات TATA.STORE')}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 bg-[#25D366] text-white rounded-full pl-3 pr-4 py-3 shadow-lg hover:shadow-xl transition group cursor-pointer"
      aria-label="WhatsApp"
    >
      <MessageCircle size={22} className="fill-white/20" />
      <span className="text-sm font-medium hidden sm:inline">تحتاج مساعدة؟ تحدث معنا</span>
    </a>
  );
};

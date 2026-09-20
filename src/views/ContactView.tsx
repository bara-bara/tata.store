import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactView: React.FC = () => {
  const { settings } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitted(true);
    setName('');
    setPhone('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    {
      q: 'كيف تتم عملية الشراء والدفع في متجر طاطا ستور؟',
      a: 'الدفع يتم نقداً عند الاستلام (COD). تختار منتوجاتك، تؤكد طلبك، وسيتصل بك الموزع عند الوصول لباب دارك لتدفع المبلغ بعد استلام الطرد.',
    },
    {
      q: 'كم يستغرق توصيل الطلبيات؟',
      a: 'داخل مدينة وإقليم طاطا يستغرق التوصيل عادةً أقل من 24 ساعة. بالنسبة لباقي المدن المغربية، يتم الشحن السريع ويصلك في غضون 24 إلى 48 ساعة.',
    },
    {
      q: 'هل منتجات التمور والأعشاب والعسل أصلية ومضمونة؟',
      a: 'نعم بكل تأكيد. نحن نتواجد في قلب إقليم طاطا ونتعامل مباشرة مع المزارعين والتعاونيات الفلاحية الموثوقة. جميع منتجاتنا طبيعية 100% ومضمونة.',
    },
    {
      q: 'هل توفرون خدمة التوصيل المجاني؟',
      a: 'نعم، نوفر التوصيل المجاني داخل طاطا ابتداءً من 200 درهم، ولمعظم المدن المغربية عند تجاوز الطلب 400 إلى 500 درهم.',
    },
    {
      q: 'كيف يمكنني تتبع حالة طلبيتي؟',
      a: 'يمكنك استخدام صفحة "تتبع الطلب" الموجودة في القائمة العلوية، وإدخال رقم طلبك للاطلاع على مسار الشحنة خطوة بخطوة.',
    },
  ];

  const cleanPhone = settings.whatsapp ? settings.whatsapp.replace(/\D/g, '') : '212600000000';

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 text-right space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-gold bg-gold/10 px-3.5 py-1 rounded-full inline-block">
          خدمة زبناء الواحة
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          يسعدنا تواصلكم واستفساراتكم
        </h1>
        <p className="text-sm text-muted-foreground">
          فريقنا في طاطا رهن إشارتكم لتقديم أي مساعدة حول المنتجات ومسار الطلبيات.
        </p>
      </div>

      {/* Contact Cards & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-card p-6 rounded-3xl border border-border space-y-6">
            <h2 className="font-bold text-base text-foreground pb-3 border-b border-border">
              بيانات التواصل المباشر
            </h2>

            <div className="space-y-3 text-sm">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-foreground hover:bg-[#25D366]/15 transition"
              >
                <div className="p-2.5 bg-[#25D366] text-white rounded-xl shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">تحدث معنا على واتساب</div>
                  <div className="font-bold text-sm text-[#1B5E20]" dir="ltr">
                    {settings.whatsapp || '+212 600-000000'}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/60 border border-border">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">الاتصال الهاتفي</div>
                  <div className="font-bold text-sm text-foreground" dir="ltr">
                    {settings.phone || '+212 528-000000'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/60 border border-border">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">البريد الإلكتروني</div>
                  <div className="font-bold text-sm text-foreground">
                    {settings.email || 'contact@tata.store'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/60 border border-border">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">المقر الرئيسي</div>
                  <div className="font-bold text-sm text-foreground">
                    {settings.address || 'شارع محمد الخامس، مركز مدينة طاطا، المملكة المغربية'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-card p-6 md:p-8 rounded-3xl border border-border space-y-4"
          >
            <h2 className="font-bold text-base text-foreground mb-4">أرسل لنا رسالة</h2>

            {submitted && (
              <div className="p-4 rounded-2xl bg-green-100 text-green-800 text-xs font-semibold">
                شكراً لتواصلك معنا! استلمنا رسالتك وسيتصل بك أحد أفراد فريقنا في أقرب وقت.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="مثال: سعيد البوعناني"
                  className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0612345678"
                  className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                الموضوع (اختياري)
              </label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="استفسار عن منتج، شحن، طلبات جملة..."
                className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                الرسالة <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="اكتب استفسارك بالتفصيل..."
                className="w-full bg-muted/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full text-sm hover:bg-accent transition shadow-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <Send size={16} />
              <span>إرسال الرسالة</span>
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-card p-6 md:p-10 rounded-3xl border border-border space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg text-foreground font-display">
            الأسئلة الشائعة حول الطلب والتوصيل
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-border rounded-2xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-right flex items-center justify-between font-semibold text-sm text-foreground bg-muted/30 hover:bg-muted/60 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 text-xs md:text-sm text-muted-foreground leading-relaxed bg-card border-t border-border">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Plus, Minus, Check, BellRing } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(2); // Default to #3 open as in screenshot
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const faqs = [
    {
      q: 'Chiptani qaytarish imkoniyati bormi?',
      a: 'Ha, tadbir boshlanishiga kamida 48 soat qolganda siz shaxsiy kabinetingiz orqali chiptani to\'liq summasida bekor qilishingiz va pulni 100% qaytarib olishingiz mumkin.',
    },
    {
      q: 'Video-murojaatni qanday ko\'rish mumkin?',
      a: 'Bosh sahifadagi yoki tadbir sahifasidagi tashkilotchi aylana belgisini bosing. Siz bevosita artist yoki tashkilotchining jonli samimiy murojaatini tomosha qila olasiz.',
    },
    {
      q: 'To\'lov usullari qanday?',
      a: 'Biz barcha ommabop to\'lov tizimlarini (Click, Payme, Uzum Bank) va xalqaro Visa/Mastercard kartalarini qabul qilamiz. Shuningdek, foizsiz muddatli to\'lov ham mavjud.',
    },
    {
      q: 'Do\'stlar bilan guruh xaridi (Split payment) qanday ishlaydi?',
      a: 'Tadbir sahifasida "Do\'stlarni taklif qilish" tugmasini bosing. Havolani ulashing, har bir do\'stingiz o\'z chiptasini o\'zi to\'laydi va siz yonma-yon o\'rindiqlarda o\'tirasiz.',
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setSubscribed(true);
    setTimeout(() => {
      setPhone('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <section id="faq" className="w-full py-16 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto border-t border-[#211910]">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5efe6]">
          Ko'p so'raladigan savollar
        </h2>
      </div>

      {/* Accordion List matching Screenshot 1 */}
      <div className="space-y-4 mb-20">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border-b border-[#2d2217] pb-4 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left py-2 text-sm sm:text-base font-medium text-[#f4efe8] hover:text-[#f5d68d] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-[#d4af37] text-xl font-light">
                  {isOpen ? '—' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="pt-2 pb-2 text-xs sm:text-sm text-[#a89783] leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Newsletter Subscription Box matching Screenshot 1 */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-[#14100c] border border-[#2d2217] text-center max-w-2xl mx-auto shadow-2xl">
        <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#f5efe6] mb-2">
          Yangi tadbirlarni o'tkazib yubormang
        </h3>
        <p className="text-xs text-[#9a8976] mb-6">
          Chiptalar sotuvga chiqqani haqida birinchi bo'lib xabar beramiz.
        </p>

        {subscribed ? (
          <div className="p-3.5 rounded-2xl bg-green-950/40 border border-green-500/50 text-green-300 text-xs flex items-center justify-center gap-2">
            <Check size={16} />
            <span>Rahmat! Siz muvaffaqiyatli obuna bo'ldingiz.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto"
          >
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 (--) --- -- --"
              className="w-full sm:w-64 px-4 py-3 rounded-full bg-[#1e1711] border border-[#3b2d1d] text-xs text-[#f4efe8] placeholder-[#71614f] focus:outline-none focus:border-[#d4af37] text-center sm:text-left"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-full gold-gradient-btn text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap"
            >
              Obuna bo'lish
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

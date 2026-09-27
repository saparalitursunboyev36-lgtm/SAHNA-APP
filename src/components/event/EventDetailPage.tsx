import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Globe,
  Users,
  ShieldCheck,
  Play,
  Heart,
  Share2,
  Bell,
  Check,
  ChevronRight,
  MessageCircle,
  Plus,
  Minus,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { EventItem, Seat } from '../../types';

interface EventDetailPageProps {
  event: EventItem;
  onOpenSeatModal: () => void;
  onOpenSplitModal: () => void;
  onOpenStoryModal: () => void;
  onBackToCatalog: () => void;
  onBack?: () => void;
  onGoToHome?: () => void;
  favorites: string[];
  onToggleFavorite: (eventId: string) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  event,
  onOpenSeatModal,
  onOpenSplitModal,
  onOpenStoryModal,
  onBackToCatalog,
  onBack,
  onGoToHome,
  favorites,
  onToggleFavorite,
}) => {
  const [selectedTier, setSelectedTier] = useState<'vip' | 'premium' | 'standart'>('vip');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'haqida' | 'dastur' | 'joy' | 'tashkilotchi' | 'sharhlar'>('haqida');

  // Live countdown state
  const [countdown, setCountdown] = useState({
    days: 12,
    hours: 6,
    mins: 44,
    secs: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isFav = favorites.includes(event.id);

  const tierPrice = event.seatingTiers[selectedTier].price;
  const subTotal = tierPrice * quantity;
  const serviceFee = Math.round(subTotal * 0.07);
  const totalAmount = subTotal + serviceFee;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('uz-UZ').format(val);
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0907] text-[#f4efe8] pb-24">
      {/* Breadcrumb & Back Button matching Screenshot 3 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-4">
        <div className="flex items-center justify-between gap-4 mb-2">
          <button
            type="button"
            onClick={onBack || onBackToCatalog}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b150f] border border-[#3e2e1c] hover:border-[#d4af37] text-xs font-semibold text-[#f5d68d] hover:bg-[#261d14] transition-all cursor-pointer group shadow-sm"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Orqaga qaytish</span>
          </button>

          <div className="text-[11px] font-mono uppercase tracking-wider text-[#82715e] hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={onGoToHome || onBackToCatalog}
              className="hover:text-white transition-colors cursor-pointer"
            >
              BOSH SAHIFA
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={onBackToCatalog}
              className="hover:text-white transition-colors cursor-pointer"
            >
              TADBIRLAR
            </button>
            <span>/</span>
            <span className="text-[#a4917d]">{event.category}</span>
            <span>/</span>
            <span className="text-[#f5d68d] truncate max-w-xs">{event.title}</span>
          </div>
        </div>
      </div>

      {/* Atmospheric Giant Hero Banner matching Screenshot 3 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-10">
        <div className="relative w-full rounded-3xl overflow-hidden border border-[#d4af37]/35 min-h-[380px] sm:min-h-[460px] p-6 sm:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover brightness-[0.4] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b08] via-[#0e0b08]/50 to-[#0e0b08]/60" />
          </div>

          {/* Top Row: Category Pill & Social Action Icons */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest font-bold bg-black/60 backdrop-blur-md border border-[#d4af37]/50 text-[#f5d68d]">
              {event.category}
            </span>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: event.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="w-9 h-9 rounded-full bg-black/50 border border-white/20 hover:border-[#d4af37]/60 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Ulashish"
              >
                <Share2 size={15} />
              </button>
              <button
                type="button"
                onClick={() => onToggleFavorite(event.id)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                  isFav
                    ? 'bg-[#d4af37] border-white text-black'
                    : 'bg-black/50 border-white/20 text-white hover:text-[#d4af37]'
                }`}
                title="Sevimlilarga qo'shish"
              >
                <Heart size={15} fill={isFav ? 'currentColor' : 'none'} />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-black/50 border border-white/20 hover:border-[#d4af37]/60 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Eslatma yoqish"
              >
                <Bell size={15} />
              </button>
            </div>
          </div>

          {/* Bottom Row: Big Title & Live Countdown Box matching Screenshot 3 */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pt-12">
            <div className="max-w-2xl space-y-2">
              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-[#f5efe6] leading-[1.1] tracking-tight">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#c5b5a2] pt-2">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#d4af37]" />
                  <span>{event.date}, {event.dayOfWeek} · {event.time}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#d4af37]" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="shrink-0 p-4 rounded-2xl bg-black/60 border border-[#d4af37]/35 backdrop-blur-md text-right">
              <span className="block text-[9px] uppercase font-mono tracking-widest text-[#a89886] mb-1">
                BOSHLANISHIGA QALDI
              </span>
              <div className="flex items-center gap-3">
                <div>
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#f5d68d]">
                    {countdown.days}
                  </span>
                  <span className="block text-[8px] font-mono text-[#786958]">KUN</span>
                </div>
                <span className="text-xl text-[#d4af37]/60">:</span>
                <div>
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#f5d68d]">
                    {countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours}
                  </span>
                  <span className="block text-[8px] font-mono text-[#786958]">SOAT</span>
                </div>
                <span className="text-xl text-[#d4af37]/60">:</span>
                <div>
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#f5d68d]">
                    {countdown.mins < 10 ? `0${countdown.mins}` : countdown.mins}
                  </span>
                  <span className="block text-[8px] font-mono text-[#786958]">DAQIQA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout matching Screenshot 3 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Details, Organizer, Gallery, Seating Map Preview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Organizer Card with Golden Story Video Circle matching Screenshot 3 */}
            <div className="p-6 rounded-3xl bg-[#14100c] border border-[#2d2217] flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl">
              {/* Golden Story Avatar with Play Trigger */}
              <div
                onClick={onOpenStoryModal}
                className="group relative cursor-pointer shrink-0"
              >
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#6d5119] via-[#d4af37] to-[#fae5b2] shadow-[0_0_25px_rgba(212,175,55,0.35)] group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#120f0c] relative">
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37] flex items-center justify-center text-[#f5d68d]">
                        <Play size={14} className="ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37]">
                  TASHKILOTCHINING XABARI
                </span>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#f5efe6]">
                    {event.organizer.name}
                  </h3>
                  <span className="text-[9px] px-2 py-0.2 rounded-full bg-[#d4af37]/15 text-[#f5d68d] border border-[#d4af37]/35 font-mono">
                    ✓ TASDIQLANGAN
                  </span>
                </div>
                <p className="text-xs text-[#baaa96] italic leading-relaxed">
                  {event.organizer.quote}
                </p>

                {/* Organizer Mini Stats */}
                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-mono text-[#8a7a67] pt-1">
                  <span><strong>{event.organizer.eventsCount}</strong> tadbir</span>
                  <span>·</span>
                  <span className="text-[#f5d68d]">★ {event.organizer.rating}</span>
                  <span>·</span>
                  <span><strong>{event.organizer.guestsCount.toLocaleString()}</strong> mehmon</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onOpenStoryModal}
                    className="px-4 py-1.5 rounded-full bg-[#201912] border border-[#3b2d1c] hover:border-[#d4af37]/50 text-xs text-[#f5d68d] font-semibold cursor-pointer"
                  >
                    Profilni ko'rish
                  </button>
                  <button
                    type="button"
                    onClick={onOpenStoryModal}
                    className="px-4 py-1.5 rounded-full bg-[#201912] border border-[#3b2d1c] hover:border-[#d4af37]/50 text-xs text-[#c5b5a2] hover:text-white cursor-pointer"
                  >
                    Savol berish
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Specs Grid (Vaqt, Davomiyligi, Til, Yosh) matching Screenshot 3 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#14100c] border border-[#2b2014] text-center">
              <div>
                <span className="block text-[9px] uppercase font-mono tracking-widest text-[#786857] mb-1">
                  VAQT
                </span>
                <span className="text-xs font-semibold text-[#f5efe6]">{event.time} — 21:30</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-mono tracking-widest text-[#786857] mb-1">
                  DAVOMIYLIGI
                </span>
                <span className="text-xs font-semibold text-[#f5efe6]">{event.duration}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-mono tracking-widest text-[#786857] mb-1">
                  TIL
                </span>
                <span className="text-xs font-semibold text-[#f5efe6]">{event.language}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-mono tracking-widest text-[#786857] mb-1">
                  YOSH CHEKLOVI
                </span>
                <span className="text-xs font-semibold text-[#f5efe6]">{event.ageLimit}</span>
              </div>
            </div>

            {/* Tabs Bar matching Screenshot 3 */}
            <div className="flex border-b border-[#231a11] text-xs font-semibold gap-6 overflow-x-auto no-scrollbar">
              {(
                [
                  { id: 'haqida', label: 'Tadbir haqida' },
                  { id: 'dastur', label: 'Dastur' },
                  { id: 'joy', label: 'Joy va manzil' },
                  { id: 'tashkilotchi', label: 'Tashkilotchi' },
                  { id: 'sharhlar', label: 'Sharhlar' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 relative tracking-wider transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-[#f5d68d]'
                      : 'text-[#8c7b67] hover:text-[#f4efe8]'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab: Tadbir haqida */}
            {activeTab === 'haqida' && (
              <div className="space-y-6">
                {/* Drop Cap Description */}
                <p className="text-sm leading-relaxed text-[#cbbba7]">
                  <span className="float-left text-5xl font-serif-luxury font-bold text-[#f5d68d] pr-3 leading-none">
                    U
                  </span>
                  shbu konsert dasturi barcha sevimli va dilda qolgan taronalarni o'z ichiga oladi. O'zbek estradasining eng yorqin namoyandalari tomonidan ijro etiladigan qo'shiqlar sizga unutilmas hissiyotlar bag'ishlaydi. Sahna ko'rinishlari, maxsus chiroq effektlari va jonli ijro uyg'unligi kechani haqiqiy bayramga aylantiradi.
                </p>

                {/* Photo Gallery Grid matching Screenshot 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <img
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80"
                    alt="Hall"
                    className="w-full h-44 rounded-2xl object-cover border border-[#3b2d1d] hover:scale-105 transition-transform duration-300"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80"
                    alt="Violin"
                    className="w-full h-44 rounded-2xl object-cover border border-[#3b2d1d] hover:scale-105 transition-transform duration-300"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80"
                    alt="Atmosphere"
                    className="w-full h-44 rounded-2xl object-cover border border-[#3b2d1d] hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            )}

            {activeTab === 'dastur' && (
              <div className="space-y-4">
                {event.program.map((prog, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#14100c] border border-[#2b2014] flex items-start gap-4"
                  >
                    <span className="font-mono text-xs text-[#d4af37] font-bold px-2 py-1 rounded bg-[#201811] border border-[#3d2e1c]">
                      {prog.time}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#f5efe6]">{prog.title}</h4>
                      <p className="text-xs text-[#9c8975] mt-0.5">{prog.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'joy' && (
              <div className="space-y-4 p-5 rounded-2xl bg-[#14100c] border border-[#2b2014]">
                <h4 className="font-serif-luxury text-xl font-bold text-[#f5efe6]">
                  {event.venue}
                </h4>
                <p className="text-xs text-[#a99783]">
                  Toshkent shahar, Navoiy ko'chasi. Avtoturargoh mavjud, metro stansiyasiga 5 daqiqalik masofa.
                </p>
                <div className="w-full h-48 rounded-xl bg-[#1b150f] border border-[#332617] flex items-center justify-center text-xs text-[#71614f]">
                  Xarita (Google Maps / Yandex) integratsiyasi faol
                </div>
              </div>
            )}

            {activeTab === 'sharhlar' && (
              <div className="space-y-4">
                {event.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-[#14100c] border border-[#2b2014] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-8 h-8 rounded-full object-cover border border-[#483723]"
                        />
                        <span className="text-xs font-semibold text-[#f5efe6]">
                          {rev.author}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#d4af37]">
                        {'★'.repeat(rev.rating)}
                      </span>
                    </div>
                    <p className="text-xs text-[#a99783] leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Visual Interactive Hall Mini-Preview matching Screenshot 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#14100c] border border-[#2d2217] space-y-4 shadow-xl">
              <div className="text-center">
                <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
                  Joyingizni tanlang
                </h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <div className="w-12 h-[1px] bg-[#d4af37]/40" />
                  <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#d4af37]">
                    SAHNA
                  </span>
                  <div className="w-12 h-[1px] bg-[#d4af37]/40" />
                </div>
              </div>

              {/* Clickable mini seat matrix */}
              <div
                onClick={onOpenSeatModal}
                className="py-6 flex flex-col items-center justify-center cursor-pointer group"
              >
                <div className="flex flex-col gap-1.5 items-center group-hover:scale-105 transition-transform duration-300">
                  {[...Array(6)].map((_, r) => (
                    <div key={r} className="flex gap-1.5 justify-center">
                      {[...Array(12)].map((_, c) => {
                        const isSelected = (r === 2 && (c === 4 || c === 5));
                        const isSold = (r === 1 && c === 3) || (r === 4 && c === 8);
                        return (
                          <div
                            key={c}
                            className={`w-3.5 h-3.5 rounded text-[8px] flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                                : isSold
                                ? 'bg-[#201a14] border border-[#302417]'
                                : 'bg-[#1b150f] border border-[#483824] hover:border-[#d4af37]'
                            }`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-4 text-[10px] text-[#93816c]">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#d4af37]" />
                    <span>VIP (Tanlangan)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#382b1b] border border-[#8a6e34]" />
                    <span>Premium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#1b150f] border border-[#483824]" />
                    <span>Standart</span>
                  </div>
                </div>

                <span className="mt-4 text-xs font-semibold text-[#f5d68d] group-hover:underline">
                  Interaktiv zaldan joy tanlash uchun bosing →
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Ticket Booking Card matching Screenshot 3 */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-3xl bg-[#16120e] border border-[#d4af37]/30 shadow-2xl space-y-5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#93826e] font-bold">
                CHIPTA TANLANG
              </span>

              {/* Tiers radio list */}
              <div className="space-y-3">
                {/* VIP Parter */}
                <div
                  onClick={() => setSelectedTier('vip')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedTier === 'vip'
                      ? 'bg-[#241c14] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'bg-[#1b150f] border-[#302417] hover:border-[#4d3c26]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#f5efe6]">VIP Parter</h4>
                      <p className="text-[10px] text-[#8e7d6a]">
                        {event.seatingTiers.vip.desc}
                      </p>
                    </div>
                    <span className="font-serif-luxury text-base font-bold text-[#f5d68d]">
                      {formatPrice(event.seatingTiers.vip.price)} so'm
                    </span>
                  </div>
                </div>

                {/* Premium */}
                <div
                  onClick={() => setSelectedTier('premium')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedTier === 'premium'
                      ? 'bg-[#241c14] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'bg-[#1b150f] border-[#302417] hover:border-[#4d3c26]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#f5efe6]">Premium</h4>
                      <p className="text-[10px] text-[#8e7d6a]">
                        {event.seatingTiers.premium.desc}
                      </p>
                    </div>
                    <span className="font-serif-luxury text-base font-bold text-[#f5d68d]">
                      {formatPrice(event.seatingTiers.premium.price)} so'm
                    </span>
                  </div>
                </div>

                {/* Standart */}
                <div
                  onClick={() => setSelectedTier('standart')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedTier === 'standart'
                      ? 'bg-[#241c14] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'bg-[#1b150f] border-[#302417] hover:border-[#4d3c26]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#f5efe6]">Standart</h4>
                      <p className="text-[10px] text-[#8e7d6a]">
                        {event.seatingTiers.standart.desc}
                      </p>
                    </div>
                    <span className="font-serif-luxury text-base font-bold text-[#f5d68d]">
                      {formatPrice(event.seatingTiers.standart.price)} so'm
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#a99783]">Chiptalar soni</span>
                <div className="flex items-center gap-3 bg-[#1e1711] border border-[#3b2d1d] rounded-xl px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                    className="p-1 text-[#b5a38f] hover:text-white"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="font-mono text-xs font-bold w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(q + 1, 8))}
                    className="p-1 text-[#b5a38f] hover:text-white"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-[#2d2217] text-xs text-[#95836e]">
                <div className="flex items-center justify-between">
                  <span>Chipta ({quantity}x {selectedTier.toUpperCase()}):</span>
                  <span>{formatPrice(subTotal)} so'm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Xizmat haqi (7%):</span>
                  <span>{formatPrice(serviceFee)} so'm</span>
                </div>
              </div>

              {/* Total Row matching Screenshot 3 */}
              <div className="pt-2 border-t border-[#2d2217] flex items-baseline justify-between">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#736352]">
                  JAMI TO'LOV
                </span>
                <span className="font-serif-luxury text-2xl font-bold text-[#f5d68d]">
                  {formatPrice(totalAmount)} so'm
                </span>
              </div>

              {/* Primary Buttons matching Screenshot 3 */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={onOpenSeatModal}
                  className="w-full py-3.5 rounded-xl gold-gradient-btn text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  CHIPTA OLISH
                </button>

                <button
                  type="button"
                  onClick={onOpenSplitModal}
                  className="w-full py-3 rounded-xl bg-[#201912] border border-[#3f2f1d] hover:border-[#d4af37]/60 text-xs font-bold uppercase tracking-wider text-[#f5efe6] transition-colors cursor-pointer"
                >
                  DO'STLARNI TAKLIF QILISH
                </button>
              </div>

              {/* Security & Guarantees matching Screenshot 3 */}
              <div className="space-y-2 pt-3 border-t border-[#2b2014] text-[11px] text-[#867563]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={13} className="text-[#d4af37]" />
                  <span>100% pulni qaytarish kafolati</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-[#d4af37]" />
                  <span>Elektron QR-chipta</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={13} className="text-[#d4af37]" />
                  <span>Xavfsiz to'lov tizimi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

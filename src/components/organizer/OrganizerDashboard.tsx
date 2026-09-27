import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  TrendingUp,
  QrCode,
  Users,
  CreditCard,
  Settings,
  PlusCircle,
  Video,
  ShieldCheck,
  Star,
  ChevronDown,
  ArrowUpRight,
  MoreVertical,
  CheckCircle,
  Clock,
  Sparkles,
  Award,
  ArrowLeft,
} from 'lucide-react';
import { Organizer, EventItem } from '../../types';

interface OrganizerDashboardProps {
  organizer: Organizer;
  events: EventItem[];
  onOpenCreateEvent: () => void;
  onOpenQrScanner: () => void;
  onOpenStoryModal: () => void;
  onBack?: () => void;
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({
  organizer,
  events,
  onOpenCreateEvent,
  onOpenQrScanner,
  onOpenStoryModal,
  onBack,
}) => {
  const [activeNav, setActiveNav] = useState('umumiy');
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [balance, setBalance] = useState(42800000);

  const handleWithdraw = () => {
    if (balance <= 0) return;
    setPayoutSuccess(true);
    setBalance(0);
    setTimeout(() => setPayoutSuccess(false), 4000);
  };

  const organizerEvents = [
    {
      id: 'yulduzli-kecha',
      title: 'Yulduzli kecha',
      date: '30-iyul, 19:30',
      venue: 'Alisher Navoiy nomidagi teatr',
      sold: 644,
      total: 750,
      revenue: '96.6 mln',
      status: 'Sotuvda',
      statusColor: 'bg-green-950/60 text-green-400 border-green-500/40',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'fortepiano-oqshomi',
      title: 'Fortepiano oqshomi',
      date: '15-iyul, 18:00',
      venue: 'Konservatoriya zali',
      sold: 400,
      total: 400,
      revenue: '60.0 mln',
      status: 'Yakunlangan',
      statusColor: 'bg-[#251d14] text-[#8e7b68] border-[#3f2f1d]',
      image: 'https://images.unsplash.com/photo-1520523839898-50712825e617?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'ozbek-raqsi-festivali',
      title: 'O\'zbek raqsi festivali',
      date: 'Belgilanmagan',
      venue: 'Humo Arena',
      sold: 0,
      total: 2500,
      revenue: '0',
      status: 'Qoralama',
      statusColor: 'bg-amber-950/60 text-amber-400 border-amber-500/40',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&auto=format&fit=crop&q=80',
    },
  ];

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('uz-UZ').format(val);
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0907] text-[#f4efe8] pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Back & Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#18120c] border border-[#3b2d1c] hover:border-[#d4af37] text-xs font-semibold text-[#f5d68d] hover:bg-[#251b13] transition-all cursor-pointer group shadow-sm"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Orqaga</span>
              </button>
            )}
            <div className="text-xs text-[#8c7a67] flex items-center gap-2">
              <button
                type="button"
                onClick={onBack}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Bosh sahifa
              </button>
              <span>/</span>
              <span className="text-[#f5d68d] font-semibold">Tashkilotchi paneli</span>
              <span>/</span>
              <span className="text-[#c7b49f]">Boshqaruv</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Organizer Navigation Sidebar matching Screenshot 5 */}
          <div className="lg:col-span-1 space-y-6">
            {/* Organizer Profile Card */}
            <div className="p-6 rounded-3xl bg-[#14100c] border border-[#2b2014] text-center space-y-3">
              <div className="relative mx-auto w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#694f1a] via-[#d4af37] to-[#fae5b2]">
                <img
                  src={organizer.avatar}
                  alt={organizer.name}
                  className="w-full h-full rounded-full object-cover border border-black"
                />
              </div>

              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#f5efe6]">
                  {organizer.name}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mt-1 rounded-full bg-[#201811] border border-[#443320] text-[10px] text-[#f5d68d] font-mono">
                  <ShieldCheck size={11} />
                  <span>TASDIQLANGAN</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenStoryModal}
                className="w-full py-2 px-3 rounded-xl bg-[#201811] border border-[#3c2d1d] hover:border-[#d4af37]/50 text-xs text-[#dcd1c2] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Video size={13} className="text-[#d4af37]" />
                <span>Video xabarni yangilash</span>
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="p-3 rounded-3xl bg-[#14100c] border border-[#2b2014] space-y-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveNav('umumiy')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl transition-colors ${
                  activeNav === 'umumiy'
                    ? 'bg-[#241c14] border border-[#d4af37]/40 text-[#f5d68d] font-bold'
                    : 'text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f]'
                }`}
              >
                <LayoutDashboard size={15} />
                <span>Umumiy</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('tadbirlarim')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-colors ${
                  activeNav === 'tadbirlarim'
                    ? 'bg-[#241c14] border border-[#d4af37]/40 text-[#f5d68d] font-bold'
                    : 'text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar size={15} />
                  <span>Tadbirlarim</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#2e2316] text-[#d4af37] text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('sotuvlar')}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f] transition-colors"
              >
                <DollarSign size={15} />
                <span>Sotuvlar</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('statistika')}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f] transition-colors"
              >
                <TrendingUp size={15} />
                <span>Statistika</span>
              </button>

              {/* QR Scanner Trigger */}
              <button
                type="button"
                onClick={onOpenQrScanner}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-[#20170f] border border-[#483620] text-[#f5d68d] hover:bg-[#2b1f14] transition-colors font-semibold cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <QrCode size={15} />
                  <span>QR skaner</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#f5d68d] font-mono">
                  NAZORAT
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('mehmonlar')}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f] transition-colors"
              >
                <Users size={15} />
                <span>Mehmonlar</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('hisobim')}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f] transition-colors"
              >
                <CreditCard size={15} />
                <span>Hisobim</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('sozlamalar')}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f] transition-colors"
              >
                <Settings size={15} />
                <span>Sozlamalar</span>
              </button>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={onOpenCreateEvent}
                  className="w-full py-3 rounded-xl gold-gradient-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <PlusCircle size={14} />
                  <span>+ Yangi tadbir</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Right Main Dashboard Area matching Screenshot 5 */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header Greeting */}
            <div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5efe6]">
                Xush kelibsiz, Dilshod
              </h1>
              <p className="text-xs text-[#9a8976] mt-1">
                Bugun 18-iyul, 2024-yil. Dashboard so'nggi 24 soat ichida yangilandi.
              </p>
            </div>

            {/* 4 Metric Cards matching Screenshot 5 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Sotilgan chiptalar */}
              <div className="p-5 rounded-2xl bg-[#14100c] border border-[#2b2014] space-y-2">
                <div className="flex items-center justify-between text-[#8e7d69]">
                  <CreditCard size={18} className="text-[#d4af37]" />
                  <span className="text-[10px] font-mono text-green-400 font-bold">
                    +18% ↗
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#7e6d5b] block">
                    SOTILGAN CHIPTALAR
                  </span>
                  <div className="font-serif-luxury text-3xl font-bold text-[#f5efe6]">
                    1 284
                  </div>
                  <span className="text-[10px] text-[#71614f]">
                    O'tgan haftaga nisbatan
                  </span>
                </div>
              </div>

              {/* Daromad */}
              <div className="p-5 rounded-2xl bg-[#14100c] border border-[#2b2014] space-y-2">
                <div className="flex items-center justify-between text-[#8e7d69]">
                  <DollarSign size={18} className="text-[#d4af37]" />
                  <span className="text-[10px] font-mono text-green-400 font-bold">
                    +12% ↗
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#7e6d5b] block">
                    DAROMAD
                  </span>
                  <div className="font-serif-luxury text-2xl font-bold text-[#f5efe6] truncate">
                    184 500 000
                  </div>
                  <span className="text-[10px] text-[#71614f]">
                    so'm · O'tgan haftaga nisbatan
                  </span>
                </div>
              </div>

              {/* Faol tadbirlar */}
              <div className="p-5 rounded-2xl bg-[#14100c] border border-[#2b2014] space-y-2">
                <div className="flex items-center justify-between text-[#8e7d69]">
                  <Calendar size={18} className="text-[#d4af37]" />
                  <span className="text-[10px] font-mono text-[#8a7a67] font-bold">
                    0% —
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#7e6d5b] block">
                    FAOL TADBIRLAR
                  </span>
                  <div className="font-serif-luxury text-3xl font-bold text-[#f5efe6]">
                    3
                  </div>
                  <span className="text-[10px] text-[#71614f]">
                    Faol sotuvdagi loyihalar
                  </span>
                </div>
              </div>

              {/* O'rtacha baho */}
              <div className="p-5 rounded-2xl bg-[#14100c] border border-[#2b2014] space-y-2">
                <div className="flex items-center justify-between text-[#8e7d69]">
                  <Star size={18} className="text-[#d4af37]" />
                  <span className="text-[10px] font-mono text-green-400 font-bold">
                    +0.2 ↗
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#7e6d5b] block">
                    O'RTACHA BAHO
                  </span>
                  <div className="font-serif-luxury text-3xl font-bold text-[#f5d68d] flex items-center gap-1.5">
                    <span>4.9</span>
                    <Star size={18} fill="currentColor" />
                  </div>
                  <span className="text-[10px] text-[#71614f]">
                    840 ta fikrlar asosida
                  </span>
                </div>
              </div>
            </div>

            {/* Live Sales Chart Card matching Screenshot 5 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#14100c] border border-[#2d2217] shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#231a11]">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#786857]">
                    HAYOTIY SOTUVLAR
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
                    Yulduzli kecha — jonli sotuv
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201811] border border-[#443320] text-xs font-mono text-[#f5d68d]">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>12 kun qoldi</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* SVG Curve Graph */}
                <div className="md:col-span-2 space-y-4">
                  <div className="relative h-48 w-full flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                      <defs>
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Area Fill */}
                      <path
                        d="M 20,130 Q 120,120 200,90 T 380,40 T 480,20 L 480,150 L 20,150 Z"
                        fill="url(#salesGrad)"
                      />
                      {/* Stroke Line */}
                      <path
                        d="M 20,130 Q 120,120 200,90 T 380,40 T 480,20"
                        fill="none"
                        stroke="#f5d68d"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      {/* Interactive Data points */}
                      <circle cx="20" cy="130" r="4" fill="#d4af37" />
                      <circle cx="120" cy="115" r="4" fill="#d4af37" />
                      <circle cx="200" cy="90" r="4" fill="#d4af37" />
                      <circle cx="300" cy="65" r="4" fill="#d4af37" />
                      <circle cx="380" cy="40" r="4" fill="#d4af37" />
                      <circle cx="480" cy="20" r="6" fill="#f5efe6" stroke="#d4af37" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-[#786857] px-2 border-t border-[#231a11] pt-2">
                    <span>4-IYUL</span>
                    <span>7-IYUL</span>
                    <span>10-IYUL</span>
                    <span>13-IYUL</span>
                    <span>16-IYUL</span>
                    <span className="text-[#f5d68d] font-bold">BUGUN</span>
                  </div>
                </div>

                {/* Progress Breakdown */}
                <div className="space-y-4 p-5 rounded-2xl bg-[#1b150f] border border-[#2b2014]">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-[#a4937f]">STANDART</span>
                      <span className="text-[#f5efe6] font-bold">420/500 (84%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#261f17] overflow-hidden">
                      <div className="h-full bg-[#9c8975] rounded-full" style={{ width: '84%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-[#a4937f]">PREMIUM</span>
                      <span className="text-[#f5efe6] font-bold">180/200 (90%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#261f17] overflow-hidden">
                      <div className="h-full bg-[#d4af37] rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-[#a4937f]">VIP</span>
                      <span className="text-[#f5efe6] font-bold">44/50 (88%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#261f17] overflow-hidden">
                      <div className="h-full bg-[#f5d68d] rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#2d2217] flex justify-between items-baseline">
                    <span className="text-xs text-[#a4937f]">Jami bandlik:</span>
                    <span className="font-serif-luxury text-2xl font-bold text-[#f5d68d]">
                      86.2%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tadbirlarim Table matching Screenshot 5 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#14100c] border border-[#2d2217] shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#231a11]">
                <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
                  Tadbirlarim
                </h3>
                <span className="text-xs font-mono text-[#8a7966] cursor-pointer hover:underline">
                  Saralash
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase font-mono tracking-wider text-[#786857] border-b border-[#231a11]">
                      <th className="pb-3 font-semibold">TADBIR</th>
                      <th className="pb-3 font-semibold">SANA</th>
                      <th className="pb-3 font-semibold">JOY</th>
                      <th className="pb-3 font-semibold">SOTILGAN / JAMI</th>
                      <th className="pb-3 font-semibold">DAROMAD</th>
                      <th className="pb-3 font-semibold">HOLATI</th>
                      <th className="pb-3 font-semibold text-right">AMALLAR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#201811]">
                    {organizerEvents.map((item) => (
                      <tr key={item.id} className="hover:bg-[#1a140f] transition-colors">
                        <td className="py-4 font-semibold text-[#f5efe6] flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span>{item.title}</span>
                        </td>
                        <td className="py-4 text-[#a69582]">{item.date}</td>
                        <td className="py-4 text-[#8c7b67] truncate max-w-[150px]">{item.venue}</td>
                        <td className="py-4 font-mono">
                          <strong className="text-[#f5efe6]">{item.sold}</strong> / {item.total}
                        </td>
                        <td className="py-4 font-mono font-bold text-[#f5d68d]">
                          {item.revenue}
                        </td>
                        <td className="py-4">
                          <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${item.statusColor}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            type="button"
                            onClick={onOpenCreateEvent}
                            className="px-3 py-1 rounded-lg bg-[#201811] border border-[#392b1b] text-xs text-[#cbbba7] hover:text-[#f5d68d]"
                          >
                            Boshqarish
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Two Lower Cards matching Screenshot 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video Xabaringiz Card */}
              <div className="p-6 rounded-3xl bg-[#14100c] border border-[#2d2217] space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37]">
                  ISHONCH
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
                  Video xabaringiz
                </h3>
                <p className="text-xs text-[#a99783] italic">
                  "Video xabari bor tadbirlar <strong>2.4 barobar ko'p</strong> chipta sotadi."
                </p>

                <div className="flex items-center gap-4 py-2">
                  <div className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#694f1a] to-[#d4af37]">
                    <img
                      src={organizer.avatar}
                      alt={organizer.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#d4af37] text-black flex items-center justify-center">
                      <Video size={11} />
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="text-[#786857] uppercase text-[9px] font-mono block">KO'RILGAN</span>
                      <span className="font-bold text-[#f5efe6]">{organizer.videoViews.toLocaleString()} marta</span>
                    </div>
                    <div>
                      <span className="text-[#786857] uppercase text-[9px] font-mono block">O'RTACHA KO'RISH</span>
                      <span className="font-bold text-[#f5d68d]">{organizer.videoDuration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onOpenStoryModal}
                    className="flex-1 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold"
                  >
                    Qayta yozish
                  </button>
                  <button
                    type="button"
                    onClick={onOpenStoryModal}
                    className="flex-1 py-2.5 rounded-xl bg-[#201811] border border-[#392b1b] text-xs text-[#b8a794] hover:text-white"
                  >
                    Maslahatlarni ko'rish
                  </button>
                </div>
              </div>

              {/* Mehmonlaringiz & Payout Card */}
              <div className="p-6 rounded-3xl bg-[#14100c] border border-[#2d2217] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
                    Mehmonlaringiz
                  </h3>
                  <span className="text-[10px] font-mono text-[#786857]">SO'NGGI 30 KUN</span>
                </div>

                {/* Demographics Bar */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#1b150f] border border-[#2b2014] text-center">
                    <span className="text-2xl font-serif-luxury font-bold text-[#f5d68d]">
                      34%
                    </span>
                    <span className="block text-[10px] text-[#8c7b67]">Qayta kelgan</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1b150f] border border-[#2b2014] space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>Toshkent</span>
                      <span className="font-bold text-[#f5d68d]">62%</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Samarqand</span>
                      <span className="font-bold">18%</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Buxoro</span>
                      <span className="font-bold">12%</span>
                    </div>
                  </div>
                </div>

                {/* Payout balance */}
                <div className="pt-2 border-t border-[#231a11]">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#786857] block mb-1">
                    YECHISH MUMKIN BO'LGAN MABLAG'
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="font-serif-luxury text-2xl font-bold text-[#f5d68d]">
                      {formatPrice(balance)} so'm
                    </div>
                    <button
                      type="button"
                      onClick={handleWithdraw}
                      disabled={balance <= 0}
                      className="px-4 py-2 rounded-xl gold-gradient-btn text-xs font-bold uppercase cursor-pointer disabled:opacity-50"
                    >
                      Pul yechish
                    </button>
                  </div>
                  {payoutSuccess && (
                    <div className="mt-2 p-2 rounded-lg bg-green-950/60 border border-green-500/50 text-green-300 text-[11px] flex items-center gap-1.5">
                      <CheckCircle size={13} />
                      <span>Mablag' bank hisob raqamingizga o'tkazildi!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tashkilotchilar uchun FAQ matching Screenshot 5 */}
            <div className="p-6 rounded-3xl bg-[#14100c] border border-[#2b2014] space-y-3">
              <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6] mb-2">
                Tashkilotchilar uchun
              </h3>
              <div className="space-y-2 text-xs">
                <details className="p-3 rounded-xl bg-[#1c150f] border border-[#322517] cursor-pointer">
                  <summary className="font-semibold text-[#f5efe6]">
                    Tadbirni qanday yarataman?
                  </summary>
                  <p className="mt-2 text-[#9a8976] leading-relaxed">
                    Chap menyudagi "+ Yangi tadbir" tugmasini bosing, barcha maydonlarni (nomi, sana, zal sxemasi, narxlar) to'ldiring va tasdiqlang.
                  </p>
                </details>
                <details className="p-3 rounded-xl bg-[#1c150f] border border-[#322517] cursor-pointer">
                  <summary className="font-semibold text-[#f5efe6]">
                    Komissiya qancha?
                  </summary>
                  <p className="mt-2 text-[#9a8976] leading-relaxed">
                    SAHNA platformasida tashkilotchi uchun yashirin komissiyalar yo'q. Halol narx kafolatlangan.
                  </p>
                </details>
                <details className="p-3 rounded-xl bg-[#1c150f] border border-[#322517] cursor-pointer">
                  <summary className="font-semibold text-[#f5efe6]">
                    Pulni qachon olaman?
                  </summary>
                  <p className="mt-2 text-[#9a8976] leading-relaxed">
                    Sotilgan chiptalar summasi har hafta avtomatik tarzda yoki "Pul yechish" tugmasini bosishingiz bilan 24 soatda hisobingizga tushadi.
                  </p>
                </details>
                <details className="p-3 rounded-xl bg-[#1c150f] border border-[#322517] cursor-pointer">
                  <summary className="font-semibold text-[#f5efe6]">
                    QR skaner qanday ishlaydi?
                  </summary>
                  <p className="mt-2 text-[#9a8976] leading-relaxed">
                    Menyudagi "QR skaner" bo'limini tanlang va mehmonlarning telefonidagi QR kodni skanerlang yoki #SHN kodini kiriting.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

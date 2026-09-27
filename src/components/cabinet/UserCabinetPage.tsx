import React, { useState } from 'react';
import {
  Ticket,
  Calendar,
  Clock,
  Heart,
  Users,
  Bell,
  Settings,
  LogOut,
  QrCode,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { UserTicket, EventItem, FriendGroupBooking } from '../../types';

interface UserCabinetPageProps {
  tickets: UserTicket[];
  events: EventItem[];
  friendBooking: FriendGroupBooking;
  onOpenTicketPass: (ticket: UserTicket) => void;
  onOpenEvent: (eventId: string) => void;
  onPayGroupShare: () => void;
  onLogout: () => void;
  onBack?: () => void;
}

export const UserCabinetPage: React.FC<UserCabinetPageProps> = ({
  tickets,
  events,
  friendBooking,
  onOpenTicketPass,
  onOpenEvent,
  onPayGroupShare,
  onLogout,
  onBack,
}) => {
  const [activeNav, setActiveNav] = useState<'chiptalarim' | 'kelayotgan' | 'otgan' | 'sevimlilar' | 'dostlar' | 'bildirishnoma' | 'sozlamalar'>('chiptalarim');
  const [ticketTab, setTicketTab] = useState<'kelayotgan' | 'otgan' | 'bekor'>('kelayotgan');

  const activeTicket = tickets.find((t) => t.status === 'active') || tickets[0];
  const upcomingTickets = tickets.filter((t) => t.status === 'active');
  const pastTickets = tickets.filter((t) => t.status === 'used');

  const favoriteEvents = events.slice(1, 4);

  return (
    <div className="w-full min-h-screen bg-[#0b0907] text-[#f4efe8] pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Back and Breadcrumbs Navigation */}
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
              <span className="text-[#f5d68d] font-semibold">Shaxsiy kabinet</span>
              <span>/</span>
              <span className="text-[#c7b49f]">Chiptalarim</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Profile Sidebar matching Screenshot 4 */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="p-6 rounded-3xl bg-[#14100c] border border-[#2c2014] text-center space-y-3">
              <div className="relative mx-auto w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#694f1a] via-[#d4af37] to-[#fae5b2]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                  alt="Islom Karimov"
                  className="w-full h-full rounded-full object-cover border border-black"
                />
              </div>

              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#f5efe6]">
                  Islom Karimov
                </h3>
                <p className="text-xs font-mono text-[#8c7b67] mt-0.5">
                  +998 90 123 45 67
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mt-2 rounded-full bg-[#201811] border border-[#443320] text-[10px] text-[#f5d68d] font-mono">
                  <ShieldCheck size={11} />
                  <span>FAOL MEHMON</span>
                </div>
              </div>
            </div>

            {/* Sidebar Navigation matching Screenshot 4 */}
            <nav className="p-3 rounded-3xl bg-[#14100c] border border-[#2c2014] space-y-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveNav('chiptalarim');
                  setTicketTab('kelayotgan');
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-colors ${
                  activeNav === 'chiptalarim'
                    ? 'bg-[#241c14] border border-[#d4af37]/40 text-[#f5d68d] font-bold'
                    : 'text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Ticket size={15} />
                  <span>Chiptalarim</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#2e2316] text-[#d4af37] text-[10px] font-bold flex items-center justify-center">
                  {tickets.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveNav('kelayotgan');
                  setTicketTab('kelayotgan');
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl transition-colors ${
                  activeNav === 'kelayotgan'
                    ? 'bg-[#241c14] border border-[#d4af37]/40 text-[#f5d68d] font-bold'
                    : 'text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f]'
                }`}
              >
                <Calendar size={15} />
                <span>Kelayotgan tadbirlar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveNav('otgan');
                  setTicketTab('otgan');
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl transition-colors ${
                  activeNav === 'otgan'
                    ? 'bg-[#241c14] border border-[#d4af37]/40 text-[#f5d68d] font-bold'
                    : 'text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f]'
                }`}
              >
                <Clock size={15} />
                <span>O'tgan tadbirlar</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('sevimlilar')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-colors ${
                  activeNav === 'sevimlilar'
                    ? 'bg-[#241c14] border border-[#d4af37]/40 text-[#f5d68d] font-bold'
                    : 'text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart size={15} />
                  <span>Sevimlilar</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#2e2316] text-[#d4af37] text-[10px] font-bold flex items-center justify-center">
                  8
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('dostlar')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-colors ${
                  activeNav === 'dostlar'
                    ? 'bg-[#241c14] border border-[#d4af37]/40 text-[#f5d68d] font-bold'
                    : 'text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users size={15} />
                  <span>Do'stlar taklifi</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#4a2e16] text-[#f5a76d] text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('bildirishnoma')}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f] transition-colors"
              >
                <Bell size={15} />
                <span>Bildirishnomalar</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('sozlamalar')}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[#9c8a77] hover:text-[#f4efe8] hover:bg-[#1a140f] transition-colors"
              >
                <Settings size={15} />
                <span>Sozlamalar</span>
              </button>

              <div className="pt-2 border-t border-[#231a11]">
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={15} />
                  <span>Chiqish</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Right Main Content matching Screenshot 4 */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header Greeting */}
            <div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5efe6]">
                Salom, Islom
              </h1>
              <p className="text-xs text-[#9a8976] mt-1">
                Sizda <strong>2 ta</strong> yaqinlashayotgan tadbir bor
              </p>
            </div>

            {/* Active Highlight Ticket Showcase Card matching Screenshot 4 */}
            {activeTicket && (
              <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#19130d] via-[#221a12] to-[#19130d] border border-[#d4af37]/35 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* QR Box with Scan Trigger */}
                  <div className="p-3 rounded-2xl bg-white text-black flex flex-col items-center justify-center shrink-0 shadow-lg">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                        activeTicket.qrCodeData
                      )}`}
                      alt="QR"
                      className="w-24 h-24"
                    />
                    <span className="text-[8px] font-mono tracking-widest mt-1 uppercase text-[#444]">
                      SAHNA QR PASS
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37]">
                        CHIPTA RAQAMI
                      </span>
                      <span className="font-mono text-xs text-[#f5efe6] font-bold">
                        {activeTicket.ticketNumber}
                      </span>
                    </div>

                    <div className="inline-block px-3 py-0.5 rounded-full bg-[#3b2d18] text-[#f5d68d] text-[10px] font-mono font-bold border border-[#5c4524]">
                      ⏳ {activeTicket.daysRemaining > 0 ? `${activeTicket.daysRemaining} KUN QOLDI` : 'BUGUN'}
                    </div>

                    <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
                      {activeTicket.eventTitle}
                    </h3>

                    <div className="text-xs text-[#a4937f] space-y-0.5">
                      <p>📅 {activeTicket.date}, {activeTicket.time}</p>
                      <p>📍 {activeTicket.venue}</p>
                      <p className="font-mono text-[#d4af37] text-[11px] pt-1">
                        {activeTicket.seats.map((s) => `SEKTOR ${s.section} · QATOR ${s.row} · O'RIN ${s.seatNumber}`).join(' | ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chiptani ko'rsatish button */}
                <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => onOpenTicketPass(activeTicket)}
                    className="px-6 py-3.5 rounded-xl gold-gradient-btn text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap shadow-lg"
                  >
                    Chiptani ko'rsatish
                  </button>
                </div>
              </div>
            )}

            {/* Tabs Bar: Kelayotgan (2) · O'tgan (14) · Bekor qilingan (1) */}
            <div className="flex border-b border-[#241b12] gap-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTicketTab('kelayotgan')}
                className={`py-3 relative tracking-wider transition-colors ${
                  ticketTab === 'kelayotgan' ? 'text-[#f5d68d]' : 'text-[#847361] hover:text-white'
                }`}
              >
                Kelayotgan ({upcomingTickets.length})
                {ticketTab === 'kelayotgan' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setTicketTab('otgan')}
                className={`py-3 relative tracking-wider transition-colors ${
                  ticketTab === 'otgan' ? 'text-[#f5d68d]' : 'text-[#847361] hover:text-white'
                }`}
              >
                O'tgan (14)
                {ticketTab === 'otgan' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setTicketTab('bekor')}
                className={`py-3 relative tracking-wider transition-colors ${
                  ticketTab === 'bekor' ? 'text-[#f5d68d]' : 'text-[#847361] hover:text-white'
                }`}
              >
                Bekor qilingan (1)
                {ticketTab === 'bekor' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37]" />
                )}
              </button>
            </div>

            {/* Ticket Cards List matching Screenshot 4 */}
            <div className="space-y-3">
              {ticketTab === 'kelayotgan' && (
                <>
                  {/* Ticket 2: Oqqush ko'li */}
                  <div
                    onClick={() => onOpenTicketPass(tickets[1] || tickets[0])}
                    className="p-4 rounded-2xl bg-[#14100c] border border-[#2b1f14] hover:border-[#d4af37]/40 flex items-center justify-between gap-4 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&auto=format&fit=crop&q=80"
                        alt="Oqqush ko'li"
                        className="w-16 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#d4af37]">
                          BUGUN · 19:30
                        </span>
                        <h4 className="text-sm font-bold text-[#f5efe6]">
                          Oqqush ko'li (Balet)
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-[9px] uppercase font-mono text-[#786857] block">
                          SEKTOR
                        </span>
                        <span className="text-xs font-semibold text-[#f5efe6]">
                          Parter
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase font-mono text-[#786857] block">
                          STATUS
                        </span>
                        <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                          ● FAOL
                        </span>
                      </div>
                      <ChevronRight size={16} className="text-[#8e7c69]" />
                    </div>
                  </div>
                </>
              )}

              {ticketTab === 'otgan' && (
                <div className="p-4 rounded-2xl bg-[#14100c] border border-[#2b1f14] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&auto=format&fit=crop&q=80"
                      alt="Jahongir Otajonov"
                      className="w-16 h-12 rounded-xl object-cover grayscale opacity-70"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#8a7b68]">
                        12 IYUL · 20:00
                      </span>
                      <h4 className="text-sm font-bold text-[#b8a795]">
                        Jahongir Otajonov
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-mono text-[#786857] block">
                        SEKTOR
                      </span>
                      <span className="text-xs font-semibold text-[#a89785]">A-2</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-mono text-[#786857] block">
                        STATUS
                      </span>
                      <span className="text-xs font-semibold text-[#6d5e4f] flex items-center gap-1">
                        ✓ KIRILDI
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-[#554637]" />
                  </div>
                </div>
              )}
            </div>

            {/* Sevimlilarim Section matching Screenshot 4 */}
            <div className="pt-6 border-t border-[#231a11]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
                  Sevimlilarim
                </h3>
                <div className="flex items-center gap-2">
                  <button type="button" className="w-7 h-7 rounded-full bg-[#18120c] border border-[#2b1f14] flex items-center justify-center text-[#8e7c69]">
                    <ChevronLeft size={14} />
                  </button>
                  <button type="button" className="w-7 h-7 rounded-full bg-[#18120c] border border-[#2b1f14] flex items-center justify-center text-[#8e7c69]">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {favoriteEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => onOpenEvent(ev.id)}
                    className="rounded-2xl bg-[#14100c] border border-[#2b1f14] hover:border-[#d4af37]/40 p-3 space-y-3 cursor-pointer group transition-all"
                  >
                    <div className="relative h-36 rounded-xl overflow-hidden">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 text-[#f5d68d] text-[10px] font-mono font-bold">
                        {ev.date}
                      </span>
                      <button
                        type="button"
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#d4af37] text-black flex items-center justify-center"
                      >
                        <Heart size={12} fill="currentColor" />
                      </button>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase font-mono text-[#d4af37]">
                        {ev.category}
                      </span>
                      <h4 className="font-serif-luxury text-base font-bold text-[#f5efe6] line-clamp-1">
                        {ev.title}
                      </h4>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-serif-luxury text-xs font-bold text-[#f5d68d]">
                          {new Intl.NumberFormat('uz-UZ').format(ev.minPrice)} UZS
                        </span>
                        <ChevronRight size={14} className="text-[#8e7c69] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Do'stlar taklifi (Group Split Payment) Card matching Screenshot 4 */}
            <div className="p-6 rounded-3xl bg-[#16120e] border border-[#392b1b] space-y-4">
              <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
                Do'stlar taklifi
              </h3>
              <p className="text-xs text-[#9a8976]">
                Do'stlaringiz bilan birga madaniy hordiq chiqaring. Sizda 1 ta yangi jamoaviy taklif bor.
              </p>

              <div className="p-4 rounded-2xl bg-[#1f1811] border border-[#392b1b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {friendBooking.members.slice(0, 3).map((m, i) => (
                      <img
                        key={i}
                        src={m.avatar}
                        alt={m.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#14100c]"
                      />
                    ))}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#f5efe6]">
                      {friendBooking.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#8e7c69]">
                      {friendBooking.paidMembers}/{friendBooking.totalMembers} to'lagan
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onPayGroupShare}
                    className="px-5 py-2 rounded-xl gold-gradient-btn text-xs font-bold cursor-pointer"
                  >
                    To'lash ({new Intl.NumberFormat('uz-UZ').format(friendBooking.myPrice)} so'm)
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-[#241b12] text-xs text-[#a99783] hover:text-white"
                  >
                    Rad etish
                  </button>
                </div>
              </div>
            </div>

            {/* Yordam kerakmi? Help Accordion matching Screenshot 4 */}
            <div className="p-6 rounded-3xl bg-[#14100c] border border-[#2b1f14] space-y-3">
              <h3 className="font-serif-luxury text-xl font-bold text-[#f5efe6] mb-2">
                Yordam kerakmi?
              </h3>
              <div className="space-y-2 text-xs">
                <details className="p-3 rounded-xl bg-[#1c150f] border border-[#322517] cursor-pointer">
                  <summary className="font-semibold text-[#f5efe6]">
                    Chiptani qanday qaytarish mumkin?
                  </summary>
                  <p className="mt-2 text-[#9a8976] leading-relaxed">
                    Tadbirga 48 soat qolgunga qadar chiptangiz yonidagi "Bekor qilish" tugmasini bosing. Pul kartangizga 15 daqiqada qaytadi.
                  </p>
                </details>
                <details className="p-3 rounded-xl bg-[#1c150f] border border-[#322517] cursor-pointer">
                  <summary className="font-semibold text-[#f5efe6]">
                    QR-kod ishlamasa nima qilish kerak?
                  </summary>
                  <p className="mt-2 text-[#9a8976] leading-relaxed">
                    Kirish nazoratchisiga chipta raqamini (#SHN-...) va shaxsingizni tasdiqlovchi hujjatni ko'rsatishingiz kifoya.
                  </p>
                </details>
                <details className="p-3 rounded-xl bg-[#1c150f] border border-[#322517] cursor-pointer">
                  <summary className="font-semibold text-[#f5efe6]">
                    Kassa bilan bog'lanish
                  </summary>
                  <p className="mt-2 text-[#9a8976] leading-relaxed">
                    Yordam markazi 24/7 rejimida ishlaydi: +998 71 200 48 48 yoki Telegram: @sahna_support.
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

import React, { useState, useEffect } from 'react';
import { Flame, ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Tag, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { EventItem } from '../../types';
import { filterEventsByDayNumber } from '../../utils/dateHelper';

interface CountdownSectionProps {
  events: EventItem[];
  onOpenTickets: (event: EventItem) => void;
  onOpenEvent: (eventId: string) => void;
  onViewInCatalog?: (dayNum: number) => void;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  events,
  onOpenTickets,
  onOpenEvent,
  onViewInCatalog,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [timers, setTimers] = useState<{ [key: string]: number }>({
    'yani-vs-orchestra': 8085, // 02:14:45
    'art-night-out': 18480, // 05:08:00
    'stand-up-comedy-fresh': 3720, // 01:02:00
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          if (next[key] > 0) next[key] -= 1;
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return {
      days: d < 10 ? `0${d}` : `${d}`,
      hours: h < 10 ? `0${h}` : `${h}`,
      mins: m < 10 ? `0${m}` : `${m}`,
      secs: s < 10 ? `0${s}` : `${s}`,
    };
  };

  const calendarDays = [
    { dayName: 'DU', date: 21, dayLabel: 'Dushanba' },
    { dayName: 'SE', date: 22, dayLabel: 'Seshanba' },
    { dayName: 'CH', date: 23, dayLabel: 'Chorshanba' },
    { dayName: 'PA', date: 24, dayLabel: 'Payshanba' },
    { dayName: 'JU', date: 25, dayLabel: 'Juma' },
    { dayName: 'SH', date: 26, dayLabel: 'Shanba' },
    { dayName: 'YA', date: 27, dayLabel: 'Yakshanba' },
    { dayName: 'DU', date: 28, dayLabel: 'Dushanba' },
    { dayName: 'SE', date: 29, dayLabel: 'Seshanba' },
    { dayName: 'CH', date: 30, dayLabel: 'Chorshanba' },
    { dayName: 'PA', date: 31, dayLabel: 'Payshanba' },
  ];

  const upcomingEvents = events.filter(
    (e) => e.isUpcomingSoon || e.id === 'yani-vs-orchestra' || e.id === 'art-night-out' || e.id === 'stand-up-comedy-fresh'
  );

  // Events happening on the clicked date
  const eventsOnSelectedDay = filterEventsByDayNumber(events, selectedDay);
  const currentDayInfo = calendarDays.find((d) => d.date === selectedDay) || { dayName: 'PA', date: selectedDay, dayLabel: 'Kun' };

  const handlePrevDay = () => {
    const idx = calendarDays.findIndex((d) => d.date === selectedDay);
    if (idx > 0) {
      setSelectedDay(calendarDays[idx - 1].date);
    }
  };

  const handleNextDay = () => {
    const idx = calendarDays.findIndex((d) => d.date === selectedDay);
    if (idx < calendarDays.length - 1) {
      setSelectedDay(calendarDays[idx + 1].date);
    }
  };

  const formatPrice = (val: number) => {
    if (val === 0) return 'Bepul';
    return `${new Intl.NumberFormat('uz-UZ').format(val)} so'm`;
  };

  return (
    <section id="countdown-calendar" className="w-full py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#211910]">
      {/* Top Countdown Headline */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5efe6]">
          Tez orada boshlanadi
        </h2>
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#e87050]">
          <Flame size={15} />
          <span className="uppercase tracking-wider font-mono">OXIRGI CHIPTALAR</span>
        </div>
      </div>

      {/* Countdown Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {upcomingEvents.map((ev, index) => {
          const timeLeft = timers[ev.id] || 7200;
          const timeObj = formatCountdown(timeLeft);
          const isUrgent = index === 0;

          return (
            <div
              key={ev.id}
              className={`p-6 rounded-2xl bg-[#14100c] border flex flex-col justify-between transition-all ${
                isUrgent
                  ? 'border-[#d4af37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)]'
                  : 'border-[#2d2217] hover:border-[#d4af37]/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3
                    onClick={() => onOpenEvent(ev.id)}
                    className="font-serif-luxury text-xl font-bold text-[#f5efe6] hover:text-[#f5d68d] cursor-pointer"
                  >
                    {ev.title}
                  </h3>
                  {ev.fewLeftCount && (
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-red-950/60 text-red-400 border border-red-500/40">
                      {ev.fewLeftCount} CHIPTA QOLDI
                    </span>
                  )}
                </div>

                {/* Clock Figures */}
                <div className="flex items-center gap-3 my-6">
                  <div>
                    <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5d68d]">
                      {timeObj.days}
                    </span>
                    <span className="block text-[9px] uppercase font-mono tracking-widest text-[#736352] mt-0.5">
                      KUN
                    </span>
                  </div>
                  <span className="text-2xl text-[#d4af37]/60 font-light">:</span>
                  <div>
                    <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5d68d]">
                      {timeObj.hours}
                    </span>
                    <span className="block text-[9px] uppercase font-mono tracking-widest text-[#736352] mt-0.5">
                      SOAT
                    </span>
                  </div>
                  <span className="text-2xl text-[#d4af37]/60 font-light">:</span>
                  <div>
                    <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5d68d]">
                      {timeObj.mins}
                    </span>
                    <span className="block text-[9px] uppercase font-mono tracking-widest text-[#736352] mt-0.5">
                      MIN
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {isUrgent ? (
                <button
                  type="button"
                  onClick={() => onOpenTickets(ev)}
                  className="w-full py-3 rounded-xl gold-gradient-btn text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg"
                >
                  Hozir band qilish
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenEvent(ev.id)}
                  className="w-full py-3 rounded-xl bg-[#1d1610] border border-[#3e2e1c] hover:border-[#d4af37]/40 text-xs text-[#cfbfab] hover:text-[#f5d68d] transition-colors cursor-pointer"
                >
                  Ko'rish
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Oktyabr 2024 Calendar Bar matching Screenshot 1 */}
      <div className="pt-8 border-t border-[#211910]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#f5efe6] flex items-center gap-3">
              <span>Oktyabr 2024</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-[#201811] text-[#d4af37] border border-[#3d2e1b]">
                Sanalarni bosing
              </span>
            </h3>
            <p className="text-xs text-[#8c7b67] mt-1">
              Sanani bosing — o'sha kungi konsert va teatrlar sahifadan chiqmasdan ko'rsatiladi
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevDay}
              title="Oldingi sana"
              className="w-9 h-9 rounded-full bg-[#1b150f] border border-[#322518] text-[#a1907d] hover:text-white hover:border-[#d4af37] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNextDay}
              title="Keyingi sana"
              className="w-9 h-9 rounded-full bg-[#1b150f] border border-[#322518] text-[#a1907d] hover:text-white hover:border-[#d4af37] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Days Row */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-3">
          {calendarDays.map((item) => {
            const isSelected = selectedDay === item.date;
            const hasEvents = filterEventsByDayNumber(events, item.date).length > 0;
            return (
              <button
                key={item.date}
                type="button"
                onClick={() => {
                  // Stays on this page and reveals events for this date!
                  setSelectedDay(item.date);
                }}
                className={`flex-1 min-w-[72px] py-4 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                  isSelected
                    ? 'gold-gradient-bg text-black font-bold shadow-[0_0_25px_rgba(212,175,55,0.45)] scale-105 z-10'
                    : 'bg-[#15100c] border border-[#2b2014] text-[#a89783] hover:border-[#d4af37]/40 hover:text-white'
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-75">
                  {item.dayName}
                </span>
                <span className="font-serif-luxury text-2xl font-bold mt-1">
                  {item.date}
                </span>
                {hasEvents && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1" />
                )}
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Live Filtered Events Section for Clicked Date */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#120d09] border border-[#302316] shadow-2xl animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#251b11] mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-1">
                <Calendar size={14} />
                <span>{currentDayInfo.dayLabel} · {selectedDay}-oktyabr, 2024</span>
              </div>
              <h4 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
                {selectedDay}-oktyabr dagi konsert va teatrlar
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-[#201811] border border-[#3e2e1c] text-xs font-mono text-[#f5d68d]">
                {eventsOnSelectedDay.length} ta tadbir topildi
              </span>
              {onViewInCatalog && (
                <button
                  type="button"
                  onClick={() => onViewInCatalog(selectedDay)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#c99b45] hover:text-[#f5d68d] font-semibold cursor-pointer group"
                >
                  <span>Katalogda ochish</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Cards for this selected date */}
          {eventsOnSelectedDay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsOnSelectedDay.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl bg-[#17120d] border border-[#2d2116] hover:border-[#d4af37]/50 overflow-hidden flex flex-col justify-between transition-all group hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)]"
                >
                  <div
                    onClick={() => onOpenEvent(event.id)}
                    className="relative h-48 w-full overflow-hidden cursor-pointer"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17120d] via-transparent to-black/40" />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-center">
                      <span className="block text-[11px] font-bold text-[#f5d68d] font-mono leading-none">
                        {event.date}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] font-mono uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-white">
                      <Tag size={11} className="text-[#d4af37]" />
                      <span>{event.category}</span>
                      <span>·</span>
                      <Clock size={11} className="text-[#d4af37]" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h5
                        onClick={() => onOpenEvent(event.id)}
                        className="font-serif-luxury text-lg font-bold text-[#f5efe6] group-hover:text-[#f5d68d] transition-colors cursor-pointer mb-1.5"
                      >
                        {event.title}
                      </h5>
                      <p className="text-xs text-[#8c7b67] flex items-center gap-1.5 mb-4">
                        <MapPin size={12} className="shrink-0 text-[#d4af37]" />
                        <span className="truncate">{event.venue}</span>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#261d14] flex items-center justify-between gap-3">
                      <div>
                        <span className="block text-[9px] uppercase font-mono text-[#736352]">
                          CHIPTA NARXI
                        </span>
                        <span className="font-serif-luxury text-sm font-bold text-[#f5d68d]">
                          {formatPrice(event.minPrice)} dan
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenEvent(event.id)}
                          className="px-3 py-2 rounded-xl bg-[#221a12] border border-[#3b2d1c] hover:border-[#d4af37] text-xs text-[#cfbfab] hover:text-[#f5d68d] transition-colors cursor-pointer"
                        >
                          Batafsil
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenTickets(event)}
                          className="px-4 py-2 rounded-xl gold-gradient-btn text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <ShoppingBag size={13} />
                          <span>Chipta</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1b150e] border border-[#342618] text-[#d4af37] flex items-center justify-center mx-auto">
                <Calendar size={28} />
              </div>
              <div>
                <h5 className="font-serif-luxury text-xl font-bold text-[#f5efe6]">
                  {selectedDay}-oktyabr uchun rejalashtirilgan tadbirlar hozircha mavjud emas
                </h5>
                <p className="text-xs text-[#8c7b67] max-w-md mx-auto mt-1">
                  Boshqa sanalardagi ajoyib konsert va teatr premyeralarini ko'rish uchun yuqoridagi kunlarni tanlang:
                </p>
              </div>

              {/* Quick Jump Date Suggestions */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {[22, 24, 25, 27].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className="px-4 py-2 rounded-xl bg-[#1d1610] border border-[#362719] text-xs font-semibold text-[#f5d68d] hover:border-[#d4af37] transition-all cursor-pointer"
                  >
                    {d}-oktyabr tadbirlari ({filterEventsByDayNumber(events, d).length} ta)
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

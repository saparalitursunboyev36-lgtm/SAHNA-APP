import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Heart, Calendar, Clock, MapPin } from 'lucide-react';
import { EventItem } from '../../types';
import { filterEventsByQuickTag } from '../../utils/dateHelper';

interface WeeklyEventsProps {
  events: EventItem[];
  onOpenEvent: (eventId: string) => void;
  onOpenTickets: (event: EventItem) => void;
  favorites: string[];
  onToggleFavorite: (eventId: string) => void;
  onViewAll: () => void;
  selectedCategory?: string;
}

export const WeeklyEvents: React.FC<WeeklyEventsProps> = ({
  events,
  onOpenEvent,
  onOpenTickets,
  favorites,
  onToggleFavorite,
  onViewAll,
  selectedCategory,
}) => {
  const [filterTab, setFilterTab] = useState<'Hammasi' | 'Bugun' | 'Ertaga' | 'Dam olish kunlari'>('Hammasi');

  const filterEvents = () => {
    let pool = events;
    if (selectedCategory && selectedCategory !== 'Hammasi') {
      const matchCat = pool.filter((e) => e.category === selectedCategory);
      if (matchCat.length > 0) pool = matchCat;
    }

    if (filterTab === 'Hammasi') return pool.slice(0, 4);
    return filterEventsByQuickTag(pool, filterTab);
  };

  const currentList = filterEvents().length > 0 ? filterEvents() : events.slice(0, 4);

  const formatPrice = (price: number) => {
    if (price === 0) return 'Bepul';
    return `${new Intl.NumberFormat('uz-UZ').format(price)} UZS`;
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5efe6] mb-3">
            Shu hafta
          </h2>
          <div className="flex items-center gap-2">
            {(['Hammasi', 'Bugun', 'Ertaga', 'Dam olish kunlari'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  filterTab === tab
                    ? 'bg-[#291e14] text-[#f5d68d] border border-[#d4af37]/40'
                    : 'text-[#8c7b67] hover:text-[#f4efe8]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="group flex items-center gap-1.5 text-xs font-semibold text-[#c99b45] hover:text-[#f5d68d] transition-colors cursor-pointer"
        >
          <span>Barcha tadbirlar</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentList.map((event) => {
          const isFav = favorites.includes(event.id);
          return (
            <div
              key={event.id}
              className="group relative rounded-2xl bg-[#14100c] border border-[#2e2417] overflow-hidden hover:border-[#d4af37]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] transition-all flex flex-col justify-between"
            >
              {/* Image Container with Badges */}
              <div
                onClick={() => onOpenEvent(event.id)}
                className="relative h-64 w-full overflow-hidden cursor-pointer"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100c] via-transparent to-black/40" />

                {/* Date Badge (e.g. 24 OKT) */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-center">
                  <span className="block text-[11px] font-bold text-[#f5d68d] font-mono leading-none">
                    {event.date.split(' ')[0]}
                  </span>
                  <span className="block text-[8px] font-mono uppercase tracking-wider text-[#d4af37]">
                    {event.date.split(' ')[1] || 'OKT'}
                  </span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(event.id);
                  }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-colors cursor-pointer ${
                    isFav
                      ? 'bg-[#d4af37] border-white text-black'
                      : 'bg-black/50 border-white/20 text-white hover:text-[#d4af37]'
                  }`}
                >
                  <Heart size={14} fill={isFav ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-wider text-[#a8957e] mb-1.5">
                    <span className="text-[#d4af37] font-bold">{event.category}</span>
                    <span>·</span>
                    <span>{event.time}</span>
                  </div>

                  <h3
                    onClick={() => onOpenEvent(event.id)}
                    className="font-serif-luxury text-lg font-bold text-[#f5efe6] group-hover:text-[#f5d68d] transition-colors line-clamp-2 cursor-pointer mb-2"
                  >
                    {event.title}
                  </h3>

                  <p className="text-[11px] text-[#8c7b67] truncate">
                    {event.venue}
                  </p>
                </div>

                {/* Price and Instant Buy Action */}
                <div className="mt-4 pt-3 border-t border-[#251d14] flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#736352]">
                      NARXI
                    </span>
                    <span className="font-serif-luxury text-sm font-bold text-[#f5d68d]">
                      {formatPrice(event.minPrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenTickets(event)}
                    title="Chipta tanlash"
                    className="w-9 h-9 rounded-xl bg-[#241c13] border border-[#4a3922] text-[#e0ceb5] hover:text-black hover:bg-[#d4af37] hover:border-[#f5d68d] flex items-center justify-center transition-all cursor-pointer shadow-md"
                  >
                    <ShoppingBag size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

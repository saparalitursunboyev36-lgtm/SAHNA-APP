import React, { useState } from 'react';
import { Search, X, Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';
import { EventItem } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EventItem[];
  onSelectEvent: (eventId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  events,
  onSelectEvent,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = events.filter((ev) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      ev.title.toLowerCase().includes(q) ||
      ev.venue.toLowerCase().includes(q) ||
      ev.category.toLowerCase().includes(q) ||
      ev.organizer.name.toLowerCase().includes(q)
    );
  }).slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#14100c] border border-[#d4af37]/30 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#2d2217]">
          <Search size={20} className="text-[#d4af37]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tadbir nomi, ijrochi, teatr yoki janr bo'yicha qidiring..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#f5efe6] placeholder-[#7d6c5a] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#241c14] text-[#a69580] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[10px] uppercase font-mono text-[#786857]">MASHHUR:</span>
          {['Yulduzli kecha', 'Jazz', 'Hamlet', 'Konservatoriya', 'Balet'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-[#1e1711] border border-[#3b2d1d] text-[#cbbba7] hover:border-[#d4af37]/50 text-xs"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="mt-2 space-y-2 max-h-[360px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#7d6c5a] italic">
              Hech qanday tadbir topilmadi
            </div>
          ) : (
            results.map((ev) => (
              <div
                key={ev.id}
                onClick={() => {
                  onClose();
                  onSelectEvent(ev.id);
                }}
                className="p-3 rounded-2xl bg-[#1b150f] border border-[#2e2316] hover:border-[#d4af37]/50 flex items-center justify-between gap-4 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[9px] uppercase font-mono text-[#d4af37]">
                      {ev.category} · {ev.date}
                    </span>
                    <h4 className="text-xs font-bold text-[#f5efe6] group-hover:text-[#f5d68d]">
                      {ev.title}
                    </h4>
                    <span className="text-[10px] text-[#8e7d69] truncate block">
                      {ev.venue}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif-luxury text-xs font-bold text-[#f5d68d]">
                    {ev.minPrice === 0 ? 'Bepul' : `${new Intl.NumberFormat('uz-UZ').format(ev.minPrice)} so'm`}
                  </span>
                  <ArrowRight size={14} className="text-[#8e7d69] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

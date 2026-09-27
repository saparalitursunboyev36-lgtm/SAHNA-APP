import React, { useState } from 'react';
import { Play, Ticket, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { EventItem } from '../../types';

interface FeaturedEventProps {
  events: EventItem[];
  onOpenTickets: (event: EventItem) => void;
  onOpenStory: (event: EventItem) => void;
}

export const FeaturedEvent: React.FC<FeaturedEventProps> = ({
  events,
  onOpenTickets,
  onOpenStory,
}) => {
  const featuredList = events.filter((e) => e.isFeatured || e.id === 'xalqaro-jazz-festivali' || e.id === 'yulduzli-kecha');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentEvent = featuredList[currentIndex] || events[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : featuredList.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < featuredList.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#d4af37]/30 min-h-[460px] sm:min-h-[500px] flex items-end p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentEvent.image}
            alt={currentEvent.title}
            className="w-full h-full object-cover brightness-[0.4] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b08] via-[#0e0b08]/70 to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1710]/80 border border-[#d4af37]/40 backdrop-blur-md">
              <Sparkles size={12} className="text-[#d4af37]" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#f5d68d] font-bold">
                ASOSIY TAVSIYA
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#f5efe6] leading-tight">
              {currentEvent.title}
            </h2>

            <p className="text-sm text-[#b8a794] leading-relaxed">
              {currentEvent.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenTickets(currentEvent)}
                className="px-6 py-3 rounded-full gold-gradient-btn text-xs uppercase tracking-wider font-bold cursor-pointer"
              >
                Chipta Band Qilish
              </button>
              <button
                type="button"
                onClick={() => onOpenStory(currentEvent)}
                className="px-6 py-3 rounded-full bg-black/40 border border-white/20 hover:border-[#d4af37]/50 text-xs text-[#f5efe6] flex items-center gap-2 backdrop-blur-md transition-colors cursor-pointer"
              >
                <Play size={13} fill="currentColor" />
                <span>Video ko'rish</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-end">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#1b150f]/80 border border-[#3d2e1c] text-[#d4af37] hover:bg-[#d4af37] hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#1b150f]/80 border border-[#3d2e1c] text-[#d4af37] hover:bg-[#d4af37] hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

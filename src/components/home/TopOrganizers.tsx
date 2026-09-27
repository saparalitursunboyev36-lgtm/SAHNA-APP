import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Organizer } from '../../types';

interface TopOrganizersProps {
  organizers: Organizer[];
  onOpenStory: (organizer: Organizer) => void;
  onOpenCreateEvent: () => void;
}

export const TopOrganizers: React.FC<TopOrganizersProps> = ({
  organizers,
  onOpenStory,
  onOpenCreateEvent,
}) => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#211910]">
      {/* Title */}
      <div className="mb-10 text-center sm:text-left">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5efe6]">
          Mashhur tashkilotchilar
        </h2>
      </div>

      {/* Organizers List */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-16">
        {organizers.slice(1, 5).map((org) => (
          <div
            key={org.id}
            onClick={() => onOpenStory(org)}
            className="group flex flex-col items-center text-center cursor-pointer"
          >
            <div className="relative mb-3.5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#694e18] via-[#d4af37] to-[#fce4a6] group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <img
                  src={org.avatar}
                  alt={org.name}
                  className="w-full h-full rounded-full object-cover border-2 border-[#120f0c]"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#d4af37] text-black flex items-center justify-center shadow-md">
                <ShieldCheck size={12} strokeWidth={3} />
              </span>
            </div>

            <h4 className="text-sm font-bold text-[#f5efe6] group-hover:text-[#f5d68d] transition-colors">
              {org.name}
            </h4>
            <span className="text-[11px] font-mono text-[#8a7b68] mt-0.5">
              {org.eventsCount} TADBIR
            </span>
          </div>
        ))}
      </div>

      {/* Organizer Partnership CTA Banner matching Screenshot 1 */}
      <div className="relative w-full rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#1b150f] via-[#241c14] to-[#1b150f] border border-[#d4af37]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5efe6] mb-3">
            O'z tadbiringizni Sahna'da soting
          </h3>
          <p className="text-sm text-[#a89783] leading-relaxed">
            Eng nufuzli auditoriyaga chiqing va chiptalar savdosini bir zumda boshlang. Shaffof statistika, tezkor to'lovlar va video-tasdiq.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreateEvent}
          className="relative z-10 px-8 py-4 rounded-full gold-gradient-btn text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow-lg hover:scale-105 transition-transform"
        >
          Hamkorlikni boshlash
        </button>
      </div>
    </section>
  );
};

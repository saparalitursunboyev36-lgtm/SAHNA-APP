import React from 'react';
import { Play, ShieldCheck, Video, Sparkles } from 'lucide-react';
import { Organizer } from '../../types';

interface VideoStoriesSectionProps {
  organizers: Organizer[];
  onOpenStory: (organizer: Organizer) => void;
}

export const VideoStoriesSection: React.FC<VideoStoriesSectionProps> = ({
  organizers,
  onOpenStory,
}) => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#211910]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Narrative */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#d4af37]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#d4af37]">
              ISHONCH KAFOLATI
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#f5efe6] leading-[1.15]">
            Tashkilotchini <br />
            <span className="gold-gradient-text italic font-light">
              o'z ko'zingiz bilan ko'ring
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#a89783] leading-relaxed max-w-lg">
            Sohadagi ilk bor: Tadbir tashkilotchisining video-murojaatini chipta sotib olishdan oldin tomosha qiling. Biz har bir tashkilotchi va tadbirni shaxsan tasdiqlaymiz.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-[#f5d68d]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
                ✓
              </span>
              <span>100% Tasdiqlangan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
                ✓
              </span>
              <span>Jonli murojaatlar</span>
            </div>
          </div>
        </div>

        {/* Right Column: Intertwined Glowing Circular Story Avatars matching Screenshot 1 */}
        <div className="relative flex items-center justify-center min-h-[320px]">
          {/* Background glow */}
          <div className="absolute w-72 h-72 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Primary Top Story Circle (Main Organizer) */}
          <div
            onClick={() => onOpenStory(organizers[0])}
            className="group relative z-20 cursor-pointer transition-transform hover:scale-105"
          >
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-tr from-[#8f6d23] via-[#e5c168] to-[#fce4a6] shadow-[0_0_40px_rgba(212,175,55,0.35)]">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#120f0c]">
                <img
                  src={organizers[0].avatar}
                  alt={organizers[0].name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/80 flex items-center justify-center text-[#f5d68d] group-hover:scale-110 transition-transform">
                    <Play size={20} className="ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#1b150f] border border-[#d4af37]/40 shadow-lg text-center whitespace-nowrap">
              <span className="text-[11px] font-bold text-[#f5efe6]">{organizers[0].name}</span>
            </div>
          </div>

          {/* Secondary Intertwined Story Circle */}
          {organizers[1] && (
            <div
              onClick={() => onOpenStory(organizers[1])}
              className="group absolute -bottom-4 right-6 sm:right-16 z-30 cursor-pointer transition-transform hover:scale-105"
            >
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-[#8f6d23] via-[#e5c168] to-[#fce4a6] shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#120f0c]">
                  <img
                    src={organizers[1].avatar}
                    alt={organizers[1].name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/80 flex items-center justify-center text-[#f5d68d] group-hover:scale-110 transition-transform">
                      <Play size={15} className="ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#1b150f] border border-[#d4af37]/40 shadow-lg text-center whitespace-nowrap">
                <span className="text-[10px] font-bold text-[#f5efe6]">{organizers[1].name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ShieldCheck, Ticket, Eye, Sparkles } from 'lucide-react';
import { Organizer, EventItem } from '../../types';

interface VideoStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizer: Organizer;
  event?: EventItem;
  onSelectSeats: () => void;
}

export const VideoStoryModal: React.FC<VideoStoryModalProps> = ({
  isOpen,
  onClose,
  organizer,
  event,
  onSelectSeats,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm sm:max-w-md h-[540px] sm:h-[620px] bg-[#120f0c] border border-[#d4af37]/50 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.3)] flex flex-col justify-between">
        {/* Background Visual (Video or Animated Stage Background) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=80"
            alt="Stage Background"
            className="w-full h-full object-cover brightness-[0.45] scale-105 transition-transform duration-700 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b08] via-transparent to-[#0e0b08]/80" />
        </div>

        {/* Top Story Bar with Progress & Controls */}
        <div className="relative z-10 p-4">
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-gradient-to-r from-[#d4af37] to-[#f5d68d] w-3/4 animate-pulse rounded-full" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={organizer.avatar}
                  alt={organizer.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#d4af37]"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#d4af37] text-black flex items-center justify-center">
                  <ShieldCheck size={11} strokeWidth={3} />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-[#f4efe8]">{organizer.name}</h4>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#d4af37]/20 text-[#f5d68d] border border-[#d4af37]/30">
                    TASDIQLANGAN
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#a4937e]">
                  <span>{organizer.eventsCount} tadbir tashkilotchisi</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5 text-[#e5be6b]">
                    <Eye size={10} /> {organizer.videoViews.toLocaleString()} ko'rildi
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Center Play / Pause Indicator */}
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative z-10 flex-1 flex items-center justify-center cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#f5d68d] hover:scale-110 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </div>
        </div>

        {/* Bottom Dialogue Subtitles & Ticket Purchase Action */}
        <div className="relative z-10 p-5 bg-gradient-to-t from-[#0e0b08] via-[#0e0b08]/90 to-transparent">
          {/* Subtitles Quote */}
          <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-[#d4af37]/30 mb-4 shadow-lg">
            <p className="text-xs text-[#f4efe8] italic leading-relaxed text-center">
              {organizer.quote}
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-[#c99b45] font-mono">
              <span>● Jonli ovoz</span>
              <span>● Eksklyuziv premyera</span>
              <span>● Haqiqiy hislar</span>
            </div>
          </div>

          {/* Direct CTA */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectSeats();
            }}
            className="w-full py-3 rounded-xl gold-gradient-btn flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            <Ticket size={14} />
            <span>Chipta olish & Joy tanlash</span>
          </button>
        </div>
      </div>
    </div>
  );
};

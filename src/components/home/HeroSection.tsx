import React, { useState } from 'react';
import { Calendar, Tag, DollarSign, ArrowRight, Search } from 'lucide-react';
import { EventCategory } from '../../types';

interface HeroSectionProps {
  onSearch: (params: { category?: string; date?: string; maxPrice?: number }) => void;
  onSelectQuickTag: (tag: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSelectQuickTag,
}) => {
  const [selectedDate, setSelectedDate] = useState('Hammasi');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hammasi');
  const [selectedPrice, setSelectedPrice] = useState('Hammasi');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let maxPrice: number | undefined = undefined;
    if (selectedPrice === '100k') maxPrice = 100000;
    if (selectedPrice === '300k') maxPrice = 300000;
    if (selectedPrice === '500k') maxPrice = 500000;

    onSearch({
      category: selectedCategory === 'Hammasi' ? undefined : selectedCategory,
      date: selectedDate === 'Hammasi' ? undefined : selectedDate,
      maxPrice,
    });
  };

  return (
    <section className="relative w-full pt-16 pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background theatrical stage imagery and gold illumination */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80"
          alt="Theatrical Stage"
          className="w-full h-full object-cover object-top opacity-35 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0907] via-[#0b0907]/70 to-[#0b0907]/90" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#d4af37]/10 blur-[130px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Main Hero Typography */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f5efe6] max-w-3xl leading-[1.1] mb-6">
          Kechani unutilmas <br />
          <span className="italic font-light gold-gradient-text">qiladigan joy.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#b6a592] max-w-xl leading-relaxed mb-10">
          O'zbekistondagi eng nufuzli tadbirlar, teatr premyeralari va yirik konsertlarga chiptalarni birinchi bo'lib qo'lga kiriting.
        </p>

        {/* Luxury Hero Filter Pill Widget */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-4xl p-2 rounded-2xl sm:rounded-full bg-[#1b150f]/90 border border-[#d4af37]/30 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-center gap-2 mb-6"
        >
          {/* Qachon (Sana) */}
          <div className="flex-1 w-full flex items-center gap-3 px-5 py-2.5 rounded-full hover:bg-[#251d15] transition-colors border-b sm:border-b-0 sm:border-r border-[#2d2216]">
            <Calendar size={18} className="text-[#d4af37] shrink-0" />
            <div className="text-left w-full">
              <span className="block text-[9px] uppercase tracking-wider font-mono text-[#8a7b68]">
                QACHON
              </span>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-xs text-[#f4efe8] font-medium focus:outline-none cursor-pointer"
              >
                <option value="Hammasi" className="bg-[#1b150f]">Sana tanlang (Hammasi)</option>
                <option value="Bugun" className="bg-[#1b150f]">Bugun</option>
                <option value="Ertaga" className="bg-[#1b150f]">Ertaga</option>
                <option value="Dam olish kunlari" className="bg-[#1b150f]">Dam olish kunlari</option>
                <option value="Shu oy" className="bg-[#1b150f]">Shu oy davomida</option>
              </select>
            </div>
          </div>

          {/* Kategoriya */}
          <div className="flex-1 w-full flex items-center gap-3 px-5 py-2.5 rounded-full hover:bg-[#251d15] transition-colors border-b sm:border-b-0 sm:border-r border-[#2d2216]">
            <Tag size={18} className="text-[#d4af37] shrink-0" />
            <div className="text-left w-full">
              <span className="block text-[9px] uppercase tracking-wider font-mono text-[#8a7b68]">
                KATEGORIYA
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs text-[#f4efe8] font-medium focus:outline-none cursor-pointer"
              >
                <option value="Hammasi" className="bg-[#1b150f]">Hammasi</option>
                <option value="Konsert" className="bg-[#1b150f]">Konsertlar</option>
                <option value="Teatr" className="bg-[#1b150f]">Teatrlar</option>
                <option value="Jazz" className="bg-[#1b150f]">Jazz & Mumtoz</option>
                <option value="Ko'rgazma" className="bg-[#1b150f]">Ko'rgazmalar</option>
              </select>
            </div>
          </div>

          {/* Narx */}
          <div className="flex-1 w-full flex items-center gap-3 px-5 py-2.5 rounded-full hover:bg-[#251d15] transition-colors">
            <DollarSign size={18} className="text-[#d4af37] shrink-0" />
            <div className="text-left w-full">
              <span className="block text-[9px] uppercase tracking-wider font-mono text-[#8a7b68]">
                NARX
              </span>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full bg-transparent text-xs text-[#f4efe8] font-medium focus:outline-none cursor-pointer"
              >
                <option value="Hammasi" className="bg-[#1b150f]">Narxni belgilang</option>
                <option value="100k" className="bg-[#1b150f]">100 000 so'mgacha</option>
                <option value="300k" className="bg-[#1b150f]">300 000 so'mgacha</option>
                <option value="500k" className="bg-[#1b150f]">500 000 so'mgacha</option>
              </select>
            </div>
          </div>

          {/* Qidirish Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full gold-gradient-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Qidirish</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Tezkor Filter Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-14 text-[#9c8b77]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#736352] mr-1">
            Tezkor:
          </span>
          {['Bugun', 'Ertaga', 'Dam olish kunlari', 'Jazz oqshomi'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectQuickTag(tag)}
              className="px-3.5 py-1 rounded-full bg-[#1b150f] border border-[#342718] text-[#c9b8a3] hover:border-[#d4af37]/60 hover:text-[#f5d68d] hover:bg-[#251c14] transition-all cursor-pointer text-xs"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stats Counter Section */}
        <div className="w-full max-w-lg grid grid-cols-2 gap-8 pt-4 border-t border-[#251d14]">
          <div className="text-center sm:text-left">
            <div className="font-serif-luxury text-4xl sm:text-5xl font-bold gold-gradient-text">
              12k+
            </div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8a7966] mt-1">
              FAOL FOYDALANUVCHI
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-serif-luxury text-4xl sm:text-5xl font-bold gold-gradient-text">
              450+
            </div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8a7966] mt-1">
              TADBIR HAR OY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

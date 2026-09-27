import React from 'react';
import { Sparkles, Music, Theater, Film, Trophy, Palette, Briefcase } from 'lucide-react';
import { EventCategory } from '../../types';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: { label: string; value: string; icon: React.ReactNode }[] = [
    { label: 'Hammasi', value: 'Hammasi', icon: <Sparkles size={14} /> },
    { label: 'Konsertlar', value: 'Konsert', icon: <Music size={14} /> },
    { label: 'Teatrlar', value: 'Teatr', icon: <Theater size={14} /> },
    { label: 'Kino', value: 'Kino', icon: <Film size={14} /> },
    { label: 'Sport', value: 'Sport', icon: <Trophy size={14} /> },
    { label: 'Ko\'rgazma', value: 'Ko\'rgazma', icon: <Palette size={14} /> },
    { label: 'Biznes', value: 'Biznes', icon: <Briefcase size={14} /> },
  ];

  return (
    <div className="w-full py-4 border-y border-[#211911] bg-[#0f0c09]/80 backdrop-blur-md sticky top-20 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onSelectCategory(cat.value)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'gold-gradient-bg text-[#14110e] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-105'
                  : 'bg-[#18120c] border border-[#322517] text-[#a99986] hover:border-[#d4af37]/40 hover:text-[#f4efe8]'
              }`}
            >
              <span className={isActive ? 'text-black' : 'text-[#d4af37]'}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { Smartphone, Video, ShieldCheck, Link2 } from 'lucide-react';

export const WhySahna: React.FC = () => {
  const features = [
    {
      icon: <Smartphone size={22} className="text-[#d4af37]" />,
      title: '100% Raqamli va tezkor kirish',
      subtitle: 'Qog\'oz chiptalar va navbatlar',
    },
    {
      icon: <Video size={22} className="text-[#d4af37]" />,
      title: 'Video-tasdiq va shaffoflik',
      subtitle: 'Tushunarsiz tashkilotchilar',
    },
    {
      icon: <ShieldCheck size={22} className="text-[#d4af37]" />,
      title: 'Halol narx, komissiyasiz',
      subtitle: 'Yashirin komissiyalar',
    },
    {
      icon: <Link2 size={22} className="text-[#d4af37]" />,
      title: 'Blockchain xavfsizligi',
      subtitle: 'Soxta chipta xavfi',
    },
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#211910]">
      <div className="text-center mb-12">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5efe6] tracking-wide">
          Nima uchun SAHNA?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#14100c] border border-[#2b2116] hover:border-[#d4af37]/40 hover:bg-[#1a140f] transition-all flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#201811] border border-[#3b2d1d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feat.icon}
            </div>

            <div>
              <div className="text-[11px] text-[#736352] line-through mb-1">
                {feat.subtitle}
              </div>
              <h3 className="text-sm font-bold text-[#f5efe6] leading-snug">
                {feat.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

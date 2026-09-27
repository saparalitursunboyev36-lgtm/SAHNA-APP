import React from 'react';
import { Globe, Share2, Instagram, Send, ShieldCheck, Smartphone } from 'lucide-react';
import { ActivePage } from '../../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="w-full bg-[#080605] border-t border-[#241c14] pt-16 pb-8 text-[#988876]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#211810]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-cinzel text-3xl font-bold tracking-[0.25em] gold-gradient-text">
                SAHNA
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#6d5e4d] font-mono mt-0.5">
                Eksklyuziv madaniyat portali
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#8a7966] max-w-sm">
              Sizning premium tadbirlar olamiga yo'llanmangiz. Har bir chipta — yangi sarguzasht. O'zbekistondagi eng nufuzli teatrlar va konsertlar bir platformada.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#17110c] border border-[#302316] flex items-center justify-center text-[#cbb69b] hover:text-[#f5d68d] hover:border-[#d4af37]/50 transition-colors"
              >
                <Send size={13} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#17110c] border border-[#302316] flex items-center justify-center text-[#cbb69b] hover:text-[#f5d68d] hover:border-[#d4af37]/50 transition-colors"
              >
                <Instagram size={13} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#17110c] border border-[#302316] flex items-center justify-center text-[#cbb69b] hover:text-[#f5d68d] hover:border-[#d4af37]/50 transition-colors"
              >
                <Globe size={13} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#17110c] border border-[#302316] flex items-center justify-center text-[#cbb69b] hover:text-[#f5d68d] hover:border-[#d4af37]/50 transition-colors"
              >
                <Share2 size={13} />
              </a>
            </div>
          </div>

          {/* Kategoriyalar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#e8d5bf]">
              Kategoriyalar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('catalog')}
                  className="hover:text-[#f5d68d] transition-colors"
                >
                  Konsertlar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('catalog')}
                  className="hover:text-[#f5d68d] transition-colors"
                >
                  Teatrlar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('catalog')}
                  className="hover:text-[#f5d68d] transition-colors"
                >
                  Kino & Balet
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('catalog')}
                  className="hover:text-[#f5d68d] transition-colors"
                >
                  Sport & Shoulari
                </button>
              </li>
            </ul>
          </div>

          {/* Yordam */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#e8d5bf]">
              Yordam
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#faq" className="hover:text-[#f5d68d] transition-colors">
                  Tez-tez beriladigan savollar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f5d68d] transition-colors">
                  Ommaviy oferta
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f5d68d] transition-colors">
                  Maxfiylik siyosati
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f5d68d] transition-colors">
                  Bog'lanish (Kassa)
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile App & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#e8d5bf]">
              Ilovani yuklang
            </h4>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[#140f0b] border border-[#2b2014] flex items-center gap-2.5 cursor-pointer hover:border-[#d4af37]/40 transition-colors">
                <Smartphone size={18} className="text-[#d4af37]" />
                <div>
                  <div className="text-[9px] text-[#736352] uppercase">Available on</div>
                  <div className="text-xs font-bold text-[#f4efe8]">App Store</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#140f0b] border border-[#2b2014] flex items-center gap-2.5 cursor-pointer hover:border-[#d4af37]/40 transition-colors">
                <Smartphone size={18} className="text-[#d4af37]" />
                <div>
                  <div className="text-[9px] text-[#736352] uppercase">Get it on</div>
                  <div className="text-xs font-bold text-[#f4efe8]">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom credits & payment gateway logos */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[11px] text-[#695b4c]">
            © 2024 SAHNA. Barcha huquqlar himoyalangan.
          </p>

          <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-[#695b4c]">
            <span>CLICK</span>
            <span>PAYME</span>
            <span>UZUM</span>
            <span>HUMO</span>
            <span>UZCARD</span>
            <span>VISA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

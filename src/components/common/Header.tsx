import React, { useState } from 'react';
import { Search, Heart, Ticket, User, PlusCircle, MapPin, Phone, HelpCircle, ChevronDown, ArrowLeft } from 'lucide-react';
import { ActivePage, EventItem } from '../../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  favoritesCount: number;
  ticketsCount: number;
  currentCity: string;
  setCurrentCity: (city: 'Toshkent' | 'Samarqand' | 'Buxoro') => void;
  onOpenSearch: () => void;
  onOpenCreateEvent: () => void;
  onSelectCategory?: (category: string) => void;
  onGoBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  favoritesCount,
  ticketsCount,
  currentCity,
  setCurrentCity,
  onOpenSearch,
  onOpenCreateEvent,
  onSelectCategory,
  onGoBack,
}) => {
  const [cityOpen, setCityOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0a08]/90 backdrop-blur-md border-b border-[#2a2117]">
      {/* Top micro bar */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-12 py-1.5 border-b border-[#1f1811] text-[11px] text-[#93836f]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span>TASDIQLANGAN CHIPTALAR</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone size={11} className="text-[#d4af37]" />
            <span>24/7 QO'LLAB-QUVVATLASH</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* City Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCityOpen(!cityOpen)}
              className="flex items-center gap-1 text-[#c2b29d] hover:text-[#f4efe8] transition-colors"
            >
              <MapPin size={11} className="text-[#d4af37]" />
              <span>{currentCity}</span>
              <ChevronDown size={11} />
            </button>

            {cityOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-32 py-1 bg-[#19130d] border border-[#3b2d1d] rounded-xl shadow-xl z-50">
                {(['Toshkent', 'Samarqand', 'Buxoro'] as const).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setCurrentCity(city);
                      setCityOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#271d13] ${
                      currentCity === city ? 'text-[#f5d68d] font-bold' : 'text-[#a69682]'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#faq" className="hover:text-[#f4efe8] transition-colors">
            Yordam
          </a>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Back Button */}
        <div className="flex items-center gap-4 sm:gap-8">
          {activePage !== 'home' && onGoBack && (
            <button
              type="button"
              onClick={onGoBack}
              title="Orqaga qaytish"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b140d] border border-[#3f2e1a] hover:border-[#d4af37] text-[#f5d68d] hover:bg-[#261c12] text-xs font-semibold cursor-pointer shadow-sm transition-all group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Orqaga</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActivePage('home')}
            className="flex flex-col text-left group cursor-pointer"
          >
            <span className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.25em] gold-gradient-text transition-all group-hover:brightness-110">
              SAHNA
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#867561] -mt-1 font-mono">
              Eksklyuziv chiptalar
            </span>
          </button>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-[#b8a794]">
            <button
              type="button"
              onClick={() => setActivePage('catalog')}
              className={`hover:text-[#f5d68d] transition-colors relative py-1 cursor-pointer ${
                activePage === 'catalog' ? 'text-[#f5d68d]' : ''
              }`}
            >
              Tadbirlar
              {activePage === 'catalog' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePage('catalog');
                onSelectCategory?.('Teatr');
              }}
              className="hover:text-[#f5d68d] transition-colors cursor-pointer"
            >
              Teatrlar
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePage('catalog');
                onSelectCategory?.('Konsert');
              }}
              className="hover:text-[#f5d68d] transition-colors cursor-pointer"
            >
              Konsertlar
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePage('catalog');
                onSelectCategory?.('Kino');
              }}
              className="hover:text-[#f5d68d] transition-colors cursor-pointer"
            >
              Kino
            </button>
            <button
              type="button"
              onClick={() => setActivePage('organizer')}
              className={`hover:text-[#f5d68d] transition-colors cursor-pointer ${
                activePage === 'organizer' ? 'text-[#f5d68d]' : ''
              }`}
            >
              Tashkilotchilar
            </button>
          </nav>
        </div>

        {/* Right Action Icons & Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1b150f] border border-[#36291b] text-xs text-[#9a8976] hover:border-[#d4af37]/50 hover:text-white transition-all cursor-pointer"
          >
            <Search size={14} className="text-[#d4af37]" />
            <span className="hidden sm:inline">Tadbir, ijrochi yoki joy...</span>
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => setActivePage('cabinet')}
            className="relative w-9 h-9 rounded-full bg-[#1a140e] border border-[#342718] flex items-center justify-center text-[#c2b09c] hover:text-[#f5d68d] hover:border-[#d4af37]/40 transition-colors cursor-pointer"
            title="Sevimlilar"
          >
            <Heart size={15} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d4af37] text-black text-[9px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* User Tickets / Cabinet */}
          <button
            type="button"
            onClick={() => setActivePage('cabinet')}
            className="relative w-9 h-9 rounded-full bg-[#1a140e] border border-[#342718] flex items-center justify-center text-[#c2b09c] hover:text-[#f5d68d] hover:border-[#d4af37]/40 transition-colors cursor-pointer"
            title="Chiptalarim"
          >
            <Ticket size={15} />
            {ticketsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#996f24] text-white text-[9px] font-bold flex items-center justify-center">
                {ticketsCount}
              </span>
            )}
          </button>

          {/* User Cabinet / Login */}
          <button
            type="button"
            onClick={() => setActivePage('cabinet')}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
              activePage === 'cabinet'
                ? 'bg-[#291e14] border-[#d4af37] text-[#f5d68d]'
                : 'bg-[#18120c] border-[#382b1d] text-[#e0cfbb] hover:border-[#d4af37]/50'
            }`}
          >
            <User size={13} className="text-[#d4af37]" />
            <span>Kirish</span>
          </button>

          {/* + Tadbir yaratish (Organizer) */}
          <button
            type="button"
            onClick={() => setActivePage('organizer')}
            className="px-3.5 py-2 rounded-full gold-gradient-btn text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 transition-transform"
          >
            <PlusCircle size={14} />
            <span className="hidden sm:inline">+ Tadbir yaratish</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>
    </header>
  );
};

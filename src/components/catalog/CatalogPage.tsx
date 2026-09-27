import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Grid,
  List,
  Calendar as CalendarIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Users,
  Check,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  MapPin,
  Clock,
  Tag,
} from 'lucide-react';
import { EventItem } from '../../types';
import { filterEventsByDayNumber, filterEventsByQuickTag, filterEventsByExactDate } from '../../utils/dateHelper';

interface CatalogPageProps {
  events: EventItem[];
  onOpenEvent: (eventId: string) => void;
  onOpenTickets: (event: EventItem) => void;
  onOpenSplitModal: (event: EventItem) => void;
  favorites: string[];
  onToggleFavorite: (eventId: string) => void;
  initialCategory?: string;
  initialDate?: string;
  onBack?: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  events,
  onOpenEvent,
  onOpenTickets,
  onOpenSplitModal,
  favorites,
  onToggleFavorite,
  initialCategory,
  initialDate,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'Hammasi');
  const [selectedQuickDate, setSelectedQuickDate] = useState<string>(initialDate || 'Hammasi');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(null);
  const [customDate, setCustomDate] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(800000);
  const [sortBy, setSortBy] = useState<'ommabop' | 'arzon' | 'qimmat' | 'yaqin'>('ommabop');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync category or date when props change
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialDate) setSelectedQuickDate(initialDate);
  }, [initialDate]);

  // Horizontal day pills (Oktyabr 21-28)
  const daysBar = [
    { label: 'DU', day: 21 },
    { label: 'SE', day: 22 },
    { label: 'CH', day: 23 },
    { label: 'PA', day: 24 },
    { label: 'JU', day: 25 },
    { label: 'SH', day: 26 },
    { label: 'YA', day: 27 },
    { label: 'DU', day: 28 },
  ];

  // Filtering logic
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((ev) => {
        const matchTitle = ev.title.toLowerCase().includes(q);
        const matchVenue = ev.venue.toLowerCase().includes(q);
        const matchOrg = ev.organizer.name.toLowerCase().includes(q);
        const matchCat = ev.category.toLowerCase().includes(q);
        return matchTitle || matchVenue || matchOrg || matchCat;
      });
    }

    // 2. Category
    if (selectedCategory && selectedCategory !== 'Hammasi') {
      result = result.filter((ev) => ev.category === selectedCategory);
    }

    // 3. Price Filter
    result = result.filter((ev) => ev.minPrice <= maxPrice);

    // 4. Date filtering:
    if (customDate) {
      result = filterEventsByExactDate(result, customDate);
    } else if (selectedDayNumber !== null) {
      result = filterEventsByDayNumber(result, selectedDayNumber);
    } else if (selectedQuickDate && selectedQuickDate !== 'Hammasi') {
      result = filterEventsByQuickTag(result, selectedQuickDate);
    }

    // 5. Sorting
    if (sortBy === 'arzon') {
      result.sort((a, b) => a.minPrice - b.minPrice);
    } else if (sortBy === 'qimmat') {
      result.sort((a, b) => b.minPrice - a.minPrice);
    } else if (sortBy === 'ommabop') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sortBy === 'yaqin') {
      result.sort((a, b) => a.rawDate.localeCompare(b.rawDate));
    }

    return result;
  }, [events, searchQuery, selectedCategory, maxPrice, selectedDayNumber, selectedQuickDate, customDate, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Hammasi');
    setSelectedQuickDate('Hammasi');
    setSelectedDayNumber(null);
    setCustomDate('');
    setMaxPrice(800000);
    setSortBy('ommabop');
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Bepul';
    return `${new Intl.NumberFormat('uz-UZ').format(price)} so'm`;
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0907] text-[#f4efe8] pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18120c] border border-[#3b2d1c] hover:border-[#d4af37] text-xs font-semibold text-[#f5d68d] hover:bg-[#251b13] transition-all cursor-pointer group shadow-sm"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Orqaga</span>
              </button>
            )}

            <div className="text-xs text-[#8c7a67] flex items-center gap-2">
              <button
                type="button"
                onClick={onBack}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Bosh sahifa
              </button>
              <span>/</span>
              <span className="text-[#c7b49f]">Tadbirlar</span>
              {selectedCategory !== 'Hammasi' && (
                <>
                  <span>/</span>
                  <span className="text-[#f5d68d] font-semibold">{selectedCategory}</span>
                </>
              )}
            </div>
          </div>

          {(selectedCategory !== 'Hammasi' || selectedDayNumber !== null || selectedQuickDate !== 'Hammasi' || customDate || searchQuery) && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-[#c99b45] hover:text-[#f5d68d] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Filtrlarni tozalash</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Filter Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tadbir, artist yoki joy nomi..."
                className="w-full pl-4 pr-10 py-3 rounded-2xl bg-[#14100c] border border-[#2e2316] text-xs text-[#f4efe8] placeholder-[#7d6c5a] focus:outline-none focus:border-[#d4af37] transition-colors"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-[#a8957e] hover:text-white"
                >
                  <X size={15} />
                </button>
              ) : (
                <Search
                  size={16}
                  className="absolute right-4 top-3.5 text-[#a8957e]"
                />
              )}
            </div>

            {/* SANA Filter */}
            <div className="p-5 rounded-2xl bg-[#14100c] border border-[#2b2014] space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-[#b5a38f] flex items-center gap-1.5">
                  <CalendarIcon size={14} className="text-[#d4af37]" />
                  <span>SANA</span>
                </h4>
                {(selectedDayNumber !== null || customDate || selectedQuickDate !== 'Hammasi') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDayNumber(null);
                      setSelectedQuickDate('Hammasi');
                      setCustomDate('');
                    }}
                    className="text-[10px] text-[#c99b45] hover:underline"
                  >
                    Tozalash
                  </button>
                )}
              </div>

              {/* Day selection badges */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {['DU', 'SE', 'CH', 'PA', 'JU', 'SH', 'YA'].map((d) => (
                  <span key={d} className="text-[9px] font-mono text-[#6d5e4f] font-bold">
                    {d}
                  </span>
                ))}
                {[21, 22, 23, 24, 25, 26, 27].map((num) => {
                  const isSelected = selectedDayNumber === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setSelectedDayNumber(isSelected ? null : num);
                        setCustomDate('');
                        setSelectedQuickDate('Hammasi');
                      }}
                      className={`h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'gold-gradient-bg text-black font-bold shadow-md scale-105'
                          : 'text-[#9c8a76] hover:bg-[#201811] hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {/* Quick Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#231a11]">
                {['Hammasi', 'Bugun', 'Ertaga', 'Dam olish kunlari', 'Shu hafta'].map((tag) => {
                  const isActive = selectedQuickDate === tag && selectedDayNumber === null && !customDate;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSelectedQuickDate(tag);
                        setSelectedDayNumber(null);
                        setCustomDate('');
                      }}
                      className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#291e14] text-[#f5d68d] border border-[#d4af37]/40 font-bold'
                          : 'bg-[#1b150f] text-[#8c7a67] border border-[#2a1f14] hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Custom Date Picker input */}
              <div className="pt-2 border-t border-[#231a11]">
                <label className="block text-[10px] uppercase font-mono text-[#7a6b5a] mb-1">
                  Aniq sana tanlash:
                </label>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => {
                    setCustomDate(e.target.value);
                    setSelectedDayNumber(null);
                    setSelectedQuickDate('Hammasi');
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#1a140e] border border-[#302315] text-xs text-[#f5efe6] focus:outline-none focus:border-[#d4af37] cursor-pointer"
                />
              </div>
            </div>

            {/* KATEGORIYA Checkboxes */}
            <div className="p-5 rounded-2xl bg-[#14100c] border border-[#2b2014] space-y-3 shadow-md">
              <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-[#b5a38f]">
                KATEGORIYA
              </h4>

              <div className="space-y-2">
                {[
                  { name: 'Hammasi', count: events.length },
                  { name: 'Konsert', count: events.filter((e) => e.category === 'Konsert').length },
                  { name: 'Teatr', count: events.filter((e) => e.category === 'Teatr').length },
                  { name: 'Jazz', count: events.filter((e) => e.category === 'Jazz').length },
                  { name: 'Ko\'rgazma', count: events.filter((e) => e.category === "Ko'rgazma").length },
                  { name: 'Kino', count: 12 },
                ].map((cat) => {
                  const isChecked = selectedCategory === cat.name;
                  return (
                    <label
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className="flex items-center justify-between text-xs text-[#c9b8a3] hover:text-[#f4efe8] cursor-pointer py-1"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#d4af37] border-[#d4af37] text-black'
                              : 'border-[#4a3924] bg-[#1a130d]'
                          }`}
                        >
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span className={isChecked ? 'text-[#f5d68d] font-bold' : ''}>
                          {cat.name}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-[#71614f]">
                        {cat.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* NARX Range Slider */}
            <div className="p-5 rounded-2xl bg-[#14100c] border border-[#2b2014] space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-[#b5a38f]">
                  NARX CHEGIRMASI
                </h4>
                <span className="font-mono text-xs text-[#d4af37] font-bold">
                  {maxPrice >= 800000 ? 'Cheklovsiz' : `${new Intl.NumberFormat('uz-UZ').format(maxPrice)} so'm`}
                </span>
              </div>

              <input
                type="range"
                min={50000}
                max={800000}
                step={25000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-[#d4af37] bg-[#291f15] h-1.5 rounded-lg cursor-pointer"
              />

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="flex-1 py-2 rounded-xl bg-[#1d1610] border border-[#362719] text-xs text-[#9c8975] hover:text-white transition-colors cursor-pointer"
                >
                  Tozalash
                </button>
                <div className="flex-1 py-2 rounded-xl gold-gradient-btn text-xs font-bold text-center">
                  {filteredEvents.length} ta tadbir
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header with Title and Sorting Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#211810]">
              <div>
                <h1 className="font-serif-luxury text-3xl font-bold text-[#f5efe6]">
                  {selectedCategory === 'Hammasi' ? 'Barcha tadbirlar' : selectedCategory}
                </h1>
                <p className="text-xs text-[#8c7a67] mt-1">
                  Toshkentda {filteredEvents.length} ta mos tadbir topildi
                  {selectedDayNumber && ` · ${selectedDayNumber}-oktyabr`}
                  {selectedQuickDate !== 'Hammasi' && ` · ${selectedQuickDate}`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-[#16110c] border border-[#302315] text-xs text-[#d6c4ae] focus:outline-none focus:border-[#d4af37] cursor-pointer"
                >
                  <option value="ommabop">Saralash: Ommabop</option>
                  <option value="arzon">Narx: arzonroq</option>
                  <option value="qimmat">Narx: qimmatroq</option>
                  <option value="yaqin">Eng yaqin sana</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center rounded-xl bg-[#16110c] border border-[#302315] p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#291e14] text-[#f5d68d]'
                        : 'text-[#7e6d5b] hover:text-white'
                    }`}
                  >
                    <Grid size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-[#291e14] text-[#f5d68d]'
                        : 'text-[#7e6d5b] hover:text-white'
                    }`}
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Horizontal Date Strip */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-[11px] font-mono uppercase text-[#736352] mr-1 shrink-0">
                Sana:
              </span>
              {daysBar.map((item) => {
                const isSelected = selectedDayNumber === item.day;
                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => {
                      setSelectedDayNumber(isSelected ? null : item.day);
                      setCustomDate('');
                      setSelectedQuickDate('Hammasi');
                    }}
                    className={`shrink-0 px-4 py-2 rounded-2xl flex flex-col items-center justify-center min-w-[56px] transition-all cursor-pointer ${
                      isSelected
                        ? 'gold-gradient-bg text-black font-bold shadow-md scale-105'
                        : 'bg-[#15100c] border border-[#2b1f14] text-[#9c8975] hover:text-white hover:border-[#d4af37]/40'
                    }`}
                  >
                    <span className="text-[9px] uppercase font-mono tracking-wider">
                      {item.label}
                    </span>
                    <span className="font-serif-luxury text-base font-bold">
                      {item.day}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Applied Filters Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {selectedCategory !== 'Hammasi' && (
                <span className="px-3 py-1 rounded-full bg-[#1e1710] border border-[#3d2e1d] text-[#e0cfbb] flex items-center gap-1.5">
                  <span>Kategoriya: {selectedCategory}</span>
                  <X
                    size={12}
                    className="cursor-pointer hover:text-red-400"
                    onClick={() => setSelectedCategory('Hammasi')}
                  />
                </span>
              )}
              {selectedDayNumber !== null && (
                <span className="px-3 py-1 rounded-full bg-[#2a1d12] border border-[#d4af37]/50 text-[#f5d68d] flex items-center gap-1.5 font-semibold">
                  <span>{selectedDayNumber}-oktyabr</span>
                  <X
                    size={12}
                    className="cursor-pointer hover:text-red-400"
                    onClick={() => setSelectedDayNumber(null)}
                  />
                </span>
              )}
              {selectedQuickDate !== 'Hammasi' && selectedDayNumber === null && (
                <span className="px-3 py-1 rounded-full bg-[#2a1d12] border border-[#d4af37]/50 text-[#f5d68d] flex items-center gap-1.5 font-semibold">
                  <span>{selectedQuickDate}</span>
                  <X
                    size={12}
                    className="cursor-pointer hover:text-red-400"
                    onClick={() => setSelectedQuickDate('Hammasi')}
                  />
                </span>
              )}
              {customDate && (
                <span className="px-3 py-1 rounded-full bg-[#2a1d12] border border-[#d4af37]/50 text-[#f5d68d] flex items-center gap-1.5 font-semibold">
                  <span>Sana: {customDate}</span>
                  <X
                    size={12}
                    className="cursor-pointer hover:text-red-400"
                    onClick={() => setCustomDate('')}
                  />
                </span>
              )}
            </div>

            {/* Events Grid / List */}
            {filteredEvents.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredEvents.map((event) => {
                  const isFav = favorites.includes(event.id);
                  const isSoldOut = event.status === 'sold_out';

                  if (viewMode === 'list') {
                    return (
                      <div
                        key={event.id}
                        className="p-4 rounded-2xl bg-[#14100c] border border-[#2e2316] hover:border-[#d4af37]/40 flex flex-col sm:flex-row items-center gap-5 transition-all shadow-md"
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full sm:w-44 h-32 rounded-xl object-cover shrink-0 cursor-pointer"
                          onClick={() => onOpenEvent(event.id)}
                        />
                        <div className="flex-1 space-y-1 w-full">
                          <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-[#a6957e]">
                            <span className="text-[#d4af37] font-bold">{event.category}</span>
                            <span>·</span>
                            <span>{event.date} · {event.time}</span>
                          </div>
                          <h3
                            onClick={() => onOpenEvent(event.id)}
                            className="font-serif-luxury text-xl font-bold text-[#f5efe6] hover:text-[#f5d68d] cursor-pointer"
                          >
                            {event.title}
                          </h3>
                          <p className="text-xs text-[#8c7b67] truncate">{event.venue}</p>
                        </div>
                        <div className="text-right sm:self-center shrink-0 w-full sm:w-auto flex sm:flex-col justify-between items-end gap-2">
                          <span className="font-serif-luxury text-lg font-bold text-[#f5d68d]">
                            {formatPrice(event.minPrice)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onOpenEvent(event.id)}
                              className="px-3 py-2 rounded-xl bg-[#1f1710] border border-[#382918] hover:border-[#d4af37] text-xs text-[#cfbfab] hover:text-[#f5d68d] cursor-pointer"
                            >
                              Batafsil
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenTickets(event)}
                              disabled={isSoldOut}
                              className="px-5 py-2 rounded-xl gold-gradient-btn text-xs font-bold disabled:opacity-50 cursor-pointer"
                            >
                              {isSoldOut ? 'Tugagan' : 'Chipta'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={event.id}
                      className="group relative rounded-2xl bg-[#14100c] border border-[#2e2316] overflow-hidden hover:border-[#d4af37]/50 hover:shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] transition-all flex flex-col justify-between"
                    >
                      {/* Poster with overlays */}
                      <div
                        onClick={() => onOpenEvent(event.id)}
                        className="relative h-64 w-full overflow-hidden cursor-pointer"
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#14100c] via-transparent to-black/40" />

                        {/* Date Badge */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-center">
                          <span className="block text-[11px] font-bold text-[#f5d68d] font-mono leading-none">
                            {event.date}
                          </span>
                        </div>

                        {/* Status Badges */}
                        {isSoldOut && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <span className="transform -rotate-12 px-4 py-1.5 bg-red-700/80 border-2 border-red-500 text-white font-serif-luxury font-bold text-lg tracking-widest uppercase shadow-2xl">
                              SOTIB BO'LINDI
                            </span>
                          </div>
                        )}

                        {event.status === 'few_left' && (
                          <div className="absolute top-3 right-12 px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-400 text-[10px] font-mono font-bold border border-red-500/40">
                            Kam qoldi · {event.fewLeftCount} ta
                          </div>
                        )}

                        {/* Favorite Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(event.id);
                          }}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-colors cursor-pointer ${
                            isFav
                              ? 'bg-[#d4af37] border-white text-black'
                              : 'bg-black/50 border-white/20 text-white hover:text-[#d4af37]'
                          }`}
                        >
                          <Heart size={14} fill={isFav ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      {/* Card Details */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-mono tracking-wider text-[#d4af37] font-bold mb-1 flex items-center justify-between">
                            <span>{event.category}</span>
                            <span className="text-[#8c7b67] font-normal">{event.time}</span>
                          </div>
                          <h3
                            onClick={() => onOpenEvent(event.id)}
                            className="font-serif-luxury text-lg font-bold text-[#f5efe6] group-hover:text-[#f5d68d] transition-colors line-clamp-2 cursor-pointer mb-1.5"
                          >
                            {event.title}
                          </h3>
                          <p className="text-[11px] text-[#8c7b67] truncate">
                            📍 {event.venue}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#251d14] flex items-center justify-between gap-2">
                          <div>
                            <span className="block text-[9px] uppercase tracking-wider text-[#736352]">
                              NARXI
                            </span>
                            <span className="font-serif-luxury text-sm font-bold text-[#f5d68d]">
                              {isSoldOut ? 'Tugagan' : formatPrice(event.minPrice)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onOpenEvent(event.id)}
                              className="px-2.5 py-1.5 rounded-xl bg-[#1e1710] border border-[#3b2d1c] hover:border-[#d4af37] text-xs text-[#cfbfab] hover:text-[#f5d68d] transition-colors cursor-pointer"
                            >
                              Ko'rish
                            </button>
                            {isSoldOut ? (
                              <span className="px-3 py-1.5 rounded-xl bg-[#221a13] text-[#6b5a48] text-xs font-semibold">
                                Yopiq
                              </span>
                            ) : event.minPrice === 0 ? (
                              <button
                                type="button"
                                onClick={() => onOpenTickets(event)}
                                className="px-3 py-1.5 rounded-xl bg-[#241c13] border border-[#4a3922] text-[#f5d68d] hover:bg-[#d4af37] hover:text-black text-xs font-semibold transition-colors cursor-pointer"
                              >
                                Bepul
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => onOpenTickets(event)}
                                className="px-3.5 py-1.5 rounded-xl gold-gradient-btn text-xs font-bold transition-all cursor-pointer shadow-md"
                              >
                                Chipta
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-[#14100c] border border-[#2b2014] text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#201811] text-[#d4af37] border border-[#3d2e1c] flex items-center justify-center mx-auto">
                  <CalendarIcon size={28} />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
                  Ushbu mezonlar va sanada tadbirlar topilmadi
                </h3>
                <p className="text-xs text-[#8c7b67] max-w-md mx-auto">
                  Qidiruv so'zini o'zgartirib ko'ring yoki boshqa sana va narx oraliqlarini tanlang.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Barcha filtrlarni tiklash
                </button>
              </div>
            )}

            {/* Group Booking Highlight Banner matching Screenshot 2 */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1d1610] via-[#241c14] to-[#1d1610] border border-[#d4af37]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#f5d68d] shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-xl font-bold text-[#f5efe6]">
                    Do'stlaringiz bilan borasizmi?
                  </h4>
                  <p className="text-xs text-[#a3927d]">
                    Guruh xaridida har kim o'z chiptasini o'zi to'laydi.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenSplitModal(filteredEvents[0] || events[0])}
                className="group px-5 py-2.5 rounded-xl border border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-black text-xs font-bold text-[#f5d68d] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Qanday ishlaydi?</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Pagination */}
            {filteredEvents.length > 6 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="w-9 h-9 rounded-full bg-[#18120c] border border-[#2b2014] text-[#8a7966] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>

                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      currentPage === page
                        ? 'gold-gradient-bg text-black'
                        : 'bg-[#18120c] text-[#8a7966] hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, 3))}
                  className="w-9 h-9 rounded-full bg-[#18120c] border border-[#2b2014] text-[#8a7966] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

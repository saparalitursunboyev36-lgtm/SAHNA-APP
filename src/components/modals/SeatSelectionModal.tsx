import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Clock, Check } from 'lucide-react';
import { EventItem, Seat } from '../../types';

interface SeatSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem;
  onProceedToCheckout: (selectedSeats: Seat[], totalPrice: number) => void;
}

export const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  isOpen,
  onClose,
  event,
  onProceedToCheckout,
}) => {
  // Generate realistic seats
  const [seats, setSeats] = useState<Seat[]>(() => {
    const list: Seat[] = [];
    
    // Balkon (1 row of 8 seats)
    for (let s = 1; s <= 8; s++) {
      list.push({
        id: `balkon-1-${s}`,
        section: 'BALKON',
        row: 1,
        seatNumber: s,
        tier: 'standart',
        price: event.seatingTiers.standart.price || 180000,
        status: s === 3 || s === 4 ? 'sold' : 'available',
      });
    }

    // Parter (8 rows)
    const rowCounts = [10, 11, 12, 13, 14, 15, 16, 17];
    rowCounts.forEach((count, rowIndex) => {
      const rowNum = rowIndex + 1;
      let tier: 'vip' | 'premium' | 'standart' = 'standart';
      let price = event.seatingTiers.standart.price || 180000;

      if (rowNum <= 2) {
        tier = 'vip';
        price = event.seatingTiers.vip.price || 450000;
      } else if (rowNum <= 5) {
        tier = 'premium';
        price = event.seatingTiers.premium.price || 320000;
      }

      for (let s = 1; s <= count; s++) {
        // Pre-sold seats for realism
        const isSold = (rowNum === 2 && (s === 5 || s === 6)) ||
                       (rowNum === 4 && (s === 1 || s === 2 || s === 8)) ||
                       (rowNum === 6 && (s === 10 || s === 11 || s === 12));
        
        list.push({
          id: `parter-${rowNum}-${s}`,
          section: 'PARTER',
          row: rowNum,
          seatNumber: s,
          tier,
          price,
          status: isSold ? 'sold' : 'available',
        });
      }
    });

    return list;
  });

  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(['parter-4-12', 'parter-4-13']);
  const [zoom, setZoom] = useState(1);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  // Countdown timer for 10-minute hold
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'sold') return;
    setSelectedSeatIds((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const removeSeat = (seatId: string) => {
    setSelectedSeatIds((prev) => prev.filter((id) => id !== seatId));
  };

  const resetSelection = () => {
    setSelectedSeatIds([]);
  };

  const selectedSeats = seats.filter((s) => selectedSeatIds.includes(s.id));
  const totalPrice = selectedSeats.reduce((acc, curr) => acc + curr.price, 0);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#120f0c] border border-[#d4af37]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Main Seating Map Area */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 bg-radial-at-t from-[#251e16] via-[#14100c] to-[#0c0a08] overflow-y-auto">
          {/* Header & Stage */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-full max-w-md flex flex-col items-center">
              <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-2" />
              <div className="px-8 py-1 rounded-full border border-[#d4af37]/40 bg-[#1e1710] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                <span className="font-cinzel text-xs tracking-[0.3em] text-[#e8c679] uppercase">SAHNA</span>
              </div>
              <div className="w-full h-8 mt-2 rounded-[50%] border-t-2 border-[#d4af37]/40 bg-gradient-to-b from-[#d4af37]/15 to-transparent blur-[1px]" />
            </div>
          </div>

          {/* Hall Layout */}
          <div
            className="flex-1 flex flex-col items-center justify-center min-h-[360px] transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* BALKON SECTION */}
            <div className="w-full flex flex-col items-center mb-7">
              <span className="text-[11px] font-mono tracking-widest text-[#a89985] uppercase mb-2">BALKON</span>
              <div className="flex gap-2 justify-center">
                {seats
                  .filter((s) => s.section === 'BALKON')
                  .map((seat) => {
                    const isSelected = selectedSeatIds.includes(seat.id);
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        onClick={() => toggleSeat(seat)}
                        disabled={seat.status === 'sold'}
                        title={`Balkon, Qator 1, O'rindiq ${seat.seatNumber} — ${formatPrice(seat.price)} so'm`}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded text-[10px] font-semibold flex items-center justify-center transition-all ${
                          seat.status === 'sold'
                            ? 'bg-[#1e1b17] border border-[#2e271f] text-[#4d4438] cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#d4a949] text-black font-bold border border-[#f5d68d] shadow-[0_0_12px_rgba(212,169,73,0.7)]'
                            : 'bg-[#181410] border border-[#715c34] text-[#cfb786] hover:border-[#d4a949] hover:bg-[#2b2216]'
                        }`}
                      >
                        {isSelected ? <Check size={12} strokeWidth={3} /> : seat.seatNumber}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* PARTER SECTION */}
            <div className="w-full flex flex-col items-center">
              <span className="text-[11px] font-mono tracking-widest text-[#a89985] uppercase mb-2">PARTER</span>
              <div className="flex flex-col gap-2 items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((rowNum) => {
                  const rowSeats = seats.filter((s) => s.section === 'PARTER' && s.row === rowNum);
                  return (
                    <div key={rowNum} className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-4 text-[10px] text-right font-mono text-[#8a7b69]">{rowNum}</span>
                      <div className="flex gap-1 sm:gap-1.5 justify-center">
                        {rowSeats.map((seat) => {
                          const isSelected = selectedSeatIds.includes(seat.id);
                          const isSold = seat.status === 'sold';

                          let colorClasses = '';
                          if (isSold) {
                            colorClasses = 'bg-[#1a1714] border border-[#2a231b] text-[#3d362c] cursor-not-allowed';
                          } else if (isSelected) {
                            colorClasses = 'bg-gradient-to-br from-[#f8e3a8] to-[#c99a36] text-black font-bold border-2 border-white shadow-[0_0_15px_rgba(212,169,73,0.9)] transform scale-110';
                          } else if (seat.tier === 'vip') {
                            colorClasses = 'bg-[#423315] border border-[#d4af37] text-[#f4deb0] hover:bg-[#5e491e]';
                          } else if (seat.tier === 'premium') {
                            colorClasses = 'bg-[#292218] border border-[#a8823b] text-[#dfc38d] hover:bg-[#3c3020]';
                          } else {
                            colorClasses = 'bg-[#1c1712] border border-[#524430] text-[#a49683] hover:bg-[#2b2218]';
                          }

                          return (
                            <button
                              key={seat.id}
                              type="button"
                              onClick={() => toggleSeat(seat)}
                              disabled={isSold}
                              title={`Parter, Qator ${rowNum}, O'rindiq ${seat.seatNumber} (${seat.tier.toUpperCase()}) — ${formatPrice(seat.price)} so'm`}
                              className={`w-5 h-5 sm:w-6 sm:h-6 rounded text-[9px] font-medium flex items-center justify-center transition-all ${colorClasses}`}
                            >
                              {isSelected ? <Check size={11} strokeWidth={3} /> : seat.seatNumber}
                            </button>
                          );
                        })}
                      </div>
                      <span className="w-4 text-[10px] text-left font-mono text-[#8a7b69]">{rowNum}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend and Zoom Controls */}
          <div className="mt-6 pt-4 border-t border-[#2e261d] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-[#a39480]">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#423315] border border-[#d4af37]" />
                <span>VIP 450k</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#292218] border border-[#a8823b]" />
                <span>Premium 320k</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#1c1712] border border-[#524430]" />
                <span>Standart 180k</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#1a1714] border border-[#2a231b]" />
                <span>Sotilgan</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetSelection}
                className="flex items-center gap-1 text-[#b89547] hover:text-[#e4be68] px-2 py-1 rounded bg-[#201a14] border border-[#3d3122] transition-colors"
              >
                <RotateCcw size={13} />
                <span>Qayta tiklash</span>
              </button>
              <div className="flex items-center rounded bg-[#201a14] border border-[#3d3122]">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(z + 0.15, 1.4))}
                  className="p-1.5 text-[#b89547] hover:text-[#e4be68] hover:bg-[#2b2218]"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(z - 0.15, 0.8))}
                  className="p-1.5 text-[#b89547] hover:text-[#e4be68] hover:bg-[#2b2218]"
                >
                  <ZoomOut size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Selected Seats & Checkout CTA */}
        <div className="w-full md:w-80 bg-[#16120e] border-t md:border-t-0 md:border-l border-[#2e261d] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#29221a]">
              <h3 className="font-serif-luxury text-2xl text-[#f4efe8] tracking-wide">
                Tanlangan joylar
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#251d16] text-[#b3a491] hover:text-white hover:bg-[#382b1f] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Selected seats list */}
            <div className="py-4 space-y-2.5 max-h-[260px] overflow-y-auto">
              {selectedSeats.length === 0 ? (
                <div className="py-8 text-center text-[#756857] text-sm italic">
                  Iltimos, zaldan o'rindiqlarni tanlang
                </div>
              ) : (
                selectedSeats.map((seat) => (
                  <div
                    key={seat.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#201a14] border border-[#362b1d] group hover:border-[#d4af37]/40 transition-colors"
                  >
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#9f8d77]">
                        {seat.section} · QATOR {seat.row}
                      </div>
                      <div className="text-sm font-semibold text-[#f4efe8]">
                        O'rindiq {seat.seatNumber}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#d4af37]">
                        {formatPrice(seat.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSeat(seat.id)}
                        className="p-1 text-[#8b4b4b] hover:text-[#ff6b6b] hover:bg-red-500/10 rounded transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bottom Total & Button */}
          <div className="pt-4 border-t border-[#29221a]">
            <div className="mb-4 text-right">
              <span className="text-xs text-[#9f8d77]">Umumiy narx:</span>
              <div className="font-serif-luxury text-3xl font-bold text-[#f5d68d]">
                {formatPrice(totalPrice)}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#7a6b5a]">
                O'ZBEK SO'MI
              </span>
            </div>

            <button
              type="button"
              disabled={selectedSeats.length === 0}
              onClick={() => onProceedToCheckout(selectedSeats, totalPrice)}
              className="w-full py-3.5 rounded-xl gold-gradient-btn flex items-center justify-center gap-2 text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Davom etish</span>
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#8c7c68]">
              <Clock size={13} className="text-[#c99b45]" />
              <span>Joylar {formatTimer(timeLeft)} daqiqa band turadi.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

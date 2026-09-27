import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventItem, Seat } from '../../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem;
  selectedSeats: Seat[];
  totalPrice: number;
  onPaymentSuccess: (ticketData: any) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  event,
  selectedSeats,
  totalPrice,
  onPaymentSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'karta' | 'payme' | 'click' | 'muddatli'>('karta');
  const [selectedSavedCard, setSelectedSavedCard] = useState(true);
  const [cardNumber, setCardNumber] = useState('8600 4242 8192 1093');
  const [expiry, setExpiry] = useState('09/27');
  const [cvv, setCvv] = useState('421');
  const [cardHolder, setCardHolder] = useState('ISLOM KARIMOV');
  const [saveCard, setSaveCard] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      // Trigger golden confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f3d99d', '#ffffff', '#aa8022'],
        });
      } catch (e) {
        // fallback
      }

      const randomTicketNum = `#SHN-${Math.floor(10000 + Math.random() * 90000)}`;
      const newTicket = {
        id: `ticket-${Date.now()}`,
        ticketNumber: randomTicketNum,
        eventId: event.id,
        eventTitle: event.title,
        category: event.category,
        venue: event.venue,
        date: event.date,
        time: event.time,
        poster: event.image,
        seats: selectedSeats.map((s) => ({
          section: s.section,
          row: s.row,
          seatNumber: s.seatNumber,
          tier: s.tier.toUpperCase(),
          price: s.price,
        })),
        totalPaid: totalPrice,
        qrCodeData: `SAHNA-${randomTicketNum}-${Date.now()}`,
        purchaseDate: new Date().toISOString().split('T')[0],
        status: 'active' as const,
        daysRemaining: 12,
      };

      onPaymentSuccess(newTicket);
    }, 1200);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#16120e] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-[#251d16] text-[#b3a491] hover:text-white hover:bg-[#382b1f] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Title */}
        <div className="mb-5">
          <h2 className="font-serif-luxury text-3xl font-bold tracking-wider gold-gradient-text">
            TO'LOV
          </h2>
        </div>

        {/* Payment Tabs */}
        <div className="flex p-1 rounded-2xl bg-[#211a14] border border-[#32271a] mb-5">
          {(
            [
              { id: 'karta', label: 'Karta' },
              { id: 'payme', label: 'Payme' },
              { id: 'click', label: 'Click' },
              { id: 'muddatli', label: 'Muddatli' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'gold-gradient-bg text-[#14110e] shadow-md'
                  : 'text-[#9c8b77] hover:text-[#f4efe8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'karta' && (
          <div className="space-y-4">
            {/* Saved Card Selector */}
            <div
              onClick={() => setSelectedSavedCard(!selectedSavedCard)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#201913] border border-[#3c2f1f] cursor-pointer hover:border-[#d4af37]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedSavedCard
                      ? 'border-[#d4af37] bg-[#d4af37]'
                      : 'border-[#5a4833]'
                  }`}
                >
                  {selectedSavedCard && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
                <div className="text-xs font-mono text-[#dcd2c4]">
                  •••• 4242 · Uzcard · 09/27
                </div>
              </div>
              <span className="text-xs text-[#d4af37] hover:underline font-medium">
                + Yangi karta
              </span>
            </div>

            {/* Card Inputs Form */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-[#8b7965] mb-1">
                  KARTA RAQAMI
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1e1711] border border-[#3d2f1e] text-xs font-mono text-[#f4efe8] focus:outline-none focus:border-[#d4af37] tracking-wider"
                  />
                  <span className="absolute right-3 top-2.5 px-2 py-0.5 rounded text-[9px] font-bold bg-[#2e2316] text-[#dfbe73] border border-[#523f26]">
                    UZCARD
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-[#8b7965] mb-1">
                    AMAL QILISH MUDDATI
                  </label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1e1711] border border-[#3d2f1e] text-xs font-mono text-[#f4efe8] focus:outline-none focus:border-[#d4af37] text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-[#8b7965] mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="•••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1e1711] border border-[#3d2f1e] text-xs font-mono text-[#f4efe8] focus:outline-none focus:border-[#d4af37] text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-[#8b7965] mb-1">
                  KARTA EGASI
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  placeholder="ISM SHARIF"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1e1711] border border-[#3d2f1e] text-xs font-mono text-[#f4efe8] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Save card toggle switch */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSaveCard(!saveCard)}
                  className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                    saveCard ? 'bg-[#d4af37]' : 'bg-[#33281c]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      saveCard ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs text-[#b8a691]">Kartani saqlash</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payme' && (
          <div className="py-6 text-center space-y-3 bg-[#1e1711] rounded-2xl border border-[#382b1c] p-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#00cccc]/20 flex items-center justify-center text-[#00cccc] font-bold">
              Payme
            </div>
            <p className="text-xs text-[#b09e88]">
              To'lovni Payme ilovasi orqali 1 marta bosishda tasdiqlang.
            </p>
            <div className="text-xs font-mono text-[#d4af37] bg-[#292015] py-2 rounded-xl border border-[#483721]">
              Telefon: +998 90 123 45 67
            </div>
          </div>
        )}

        {activeTab === 'click' && (
          <div className="py-6 text-center space-y-3 bg-[#1e1711] rounded-2xl border border-[#382b1c] p-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#0088cc]/20 flex items-center justify-center text-[#0088cc] font-bold">
              CLICK
            </div>
            <p className="text-xs text-[#b09e88]">
              CLICK Evolution orqali tezkor va xavfsiz to'lov.
            </p>
            <div className="text-xs font-mono text-[#d4af37] bg-[#292015] py-2 rounded-xl border border-[#483721]">
              Telefon: +998 90 123 45 67
            </div>
          </div>
        )}

        {activeTab === 'muddatli' && (
          <div className="py-5 space-y-2.5 bg-[#1e1711] rounded-2xl border border-[#382b1c] p-4 text-xs">
            <div className="flex items-center justify-between text-[#e4ceaa]">
              <span>Uzum Nasiya (3 oy):</span>
              <span className="font-bold text-[#d4af37]">
                {formatPrice(Math.round(totalPrice / 3))} so'm / oy
              </span>
            </div>
            <div className="flex items-center justify-between text-[#e4ceaa]">
              <span>Anorbank (6 oy):</span>
              <span className="font-bold text-[#d4af37]">
                {formatPrice(Math.round(totalPrice / 6))} so'm / oy
              </span>
            </div>
            <p className="text-[11px] text-[#7d6c59] pt-1">
              Boshlang'ich to'lovsiz, 0% ortiqcha foizsiz.
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="my-5 h-[1px] bg-gradient-to-r from-transparent via-[#443522] to-transparent" />

        {/* Order Summary Line */}
        <div className="mb-4">
          <h4 className="font-serif-luxury text-lg font-semibold text-[#f4efe8]">
            {event.title}
          </h4>
          <div className="flex items-center justify-between text-xs text-[#a3927d] mt-1">
            <span>
              {selectedSeats.length > 0
                ? `${selectedSeats.length} x ${selectedSeats[0]?.tier.toUpperCase()} · ${selectedSeats[0]?.section}, Qator ${selectedSeats[0]?.row}`
                : '1 x Standart'}
            </span>
            <span className="font-serif-luxury text-base font-bold text-[#f5d68d]">
              {formatPrice(totalPrice)} so'm
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          type="button"
          disabled={isProcessing}
          onClick={handlePay}
          className="w-full py-3.5 rounded-xl gold-gradient-btn flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-bold cursor-pointer disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="animate-spin text-black" />
              <span>To'lov amalga oshirilmoqda...</span>
            </>
          ) : (
            <>
              <ShieldCheck size={16} />
              <span>To'lash · {formatPrice(totalPrice)} so'm</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

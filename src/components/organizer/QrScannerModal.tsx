import React, { useState } from 'react';
import { X, QrCode, CheckCircle, AlertTriangle, Search, Volume2 } from 'lucide-react';
import { UserTicket } from '../../types';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: UserTicket[];
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  tickets,
}) => {
  const [ticketQuery, setTicketQuery] = useState('#SHN-48210');
  const [scanResult, setScanResult] = useState<{
    valid: boolean;
    ticket?: UserTicket;
    message: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleVerify = (query: string) => {
    const clean = query.trim().toUpperCase();
    const found = tickets.find(
      (t) =>
        t.ticketNumber.toUpperCase() === clean ||
        t.ticketNumber.replace('#', '').toUpperCase() === clean.replace('#', '')
    );

    if (found) {
      setScanResult({
        valid: true,
        ticket: found,
        message: `Chipta haqiqiy! Xush kelibsiz: ${found.eventTitle}`,
      });
    } else {
      setScanResult({
        valid: false,
        message: "Chipta topilmadi yoki soxta! Iltimos, qaytadan tekshiring.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#16120e] border border-[#d4af37]/35 rounded-3xl p-6 sm:p-7 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-[#251d16] text-[#b3a491] hover:text-white hover:bg-[#382b1f] transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#f5d68d]">
            <QrCode size={20} />
          </div>
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#f5efe6]">
              QR Chipta Nazorati
            </h3>
            <p className="text-xs text-[#9a8976]">
              Kirish eshigi nazoratchisi uchun tezkor tekshiruv
            </p>
          </div>
        </div>

        {/* Scanner Visual Camera Simulation */}
        <div className="relative w-full h-48 rounded-2xl bg-black border border-[#392b1b] overflow-hidden flex items-center justify-center my-4">
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-red-500 shadow-[0_0_15px_red] animate-pulse" />
          <div className="w-36 h-36 border-2 border-dashed border-[#d4af37]/60 rounded-2xl flex items-center justify-center text-[#736352] text-xs">
            Kamera nigohida
          </div>
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-mono text-green-400">
            ● SCANNER ONLINE
          </div>
        </div>

        {/* Manual Code Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify(ticketQuery);
          }}
          className="flex gap-2 mb-4"
        >
          <input
            type="text"
            value={ticketQuery}
            onChange={(e) => setTicketQuery(e.target.value)}
            placeholder="#SHN-..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs font-mono text-[#f5efe6] focus:outline-none focus:border-[#d4af37]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold uppercase cursor-pointer"
          >
            Tekshirish
          </button>
        </form>

        {/* Scan Result */}
        {scanResult && (
          <div
            className={`p-4 rounded-2xl border text-xs ${
              scanResult.valid
                ? 'bg-green-950/40 border-green-500/50 text-green-200'
                : 'bg-red-950/40 border-red-500/50 text-red-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {scanResult.valid ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
              <span>{scanResult.valid ? 'MUVAFFAQIYATLI TEKSHIRILDI' : 'XATOLIK'}</span>
            </div>
            <p>{scanResult.message}</p>
            {scanResult.ticket && (
              <div className="mt-2 pt-2 border-t border-green-500/30 font-mono text-[11px] text-green-300">
                O'rindiqlar:{' '}
                {scanResult.ticket.seats
                  .map((s) => `${s.section} Qator ${s.row} Joy ${s.seatNumber}`)
                  .join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

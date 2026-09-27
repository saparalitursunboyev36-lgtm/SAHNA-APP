import React, { useState } from 'react';
import { Check, Calendar, Share2, Download, CheckCheck, Sparkles, X } from 'lucide-react';
import { UserTicket } from '../../types';

interface SuccessTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: UserTicket | null;
  onGoToCabinet: () => void;
}

export const SuccessTicketModal: React.FC<SuccessTicketModalProps> = ({
  isOpen,
  onClose,
  ticket,
  onGoToCabinet,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !ticket) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Men SAHNA platformasida "${ticket.eventTitle}" tadbiriga chipta oldim! Chipta raqami: ${ticket.ticketNumber}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPdf = () => {
    setDownloaded(true);
    // Trigger printable ticket window
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>SAHNA Elektron Chipta - ${ticket.ticketNumber}</title>
            <style>
              body { font-family: sans-serif; background: #0b0907; color: #f4efe8; padding: 40px; text-align: center; }
              .card { border: 2px solid #d4af37; border-radius: 20px; max-width: 500px; margin: 0 auto; padding: 30px; background: #16120e; }
              h1 { color: #f5d68d; font-family: serif; margin-bottom: 5px; }
              .num { font-family: monospace; color: #d4af37; font-size: 18px; letter-spacing: 2px; }
              .details { margin: 20px 0; border-top: 1px dashed #443; border-bottom: 1px dashed #443; padding: 15px 0; }
              .qr { margin: 20px auto; background: white; padding: 15px; border-radius: 12px; display: inline-block; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="num">SAHNA · ${ticket.ticketNumber}</div>
              <h1>${ticket.eventTitle}</h1>
              <p>${ticket.category} · ${ticket.venue}</p>
              <div class="details">
                <p><strong>Sana:</strong> ${ticket.date} · <strong>Vaqt:</strong> ${ticket.time}</p>
                <p><strong>Joylar:</strong> ${ticket.seats.map(s => `${s.section} Qator ${s.row} O'rindiq ${s.seatNumber}`).join(', ')}</p>
                <p><strong>Jami to'langan:</strong> ${ticket.totalPaid.toLocaleString()} so'm</p>
              </div>
              <div class="qr">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.qrCodeData}" width="150" height="150" />
              </div>
              <p style="font-size: 12px; color: #888;">Kirishda ushbu QR-kodni nazoratchiga ko'rsating. Internet talab etilmaydi.</p>
            </div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleCalendar = () => {
    // Generate iCal event
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SAHNA//Ticket Platform//UZ
BEGIN:VEVENT
SUMMARY:${ticket.eventTitle}
DESCRIPTION:SAHNA chiptasi: ${ticket.ticketNumber}. Manzil: ${ticket.venue}
LOCATION:${ticket.venue}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `sahna-event-${ticket.ticketNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#16120e] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_60px_rgba(212,175,55,0.2)] text-center my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-[#251d16] text-[#b3a491] hover:text-white hover:bg-[#382b1f] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Golden Checkmark Emblem */}
        <div className="relative mx-auto w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] mb-4">
          <Check size={32} className="text-[#14110e]" strokeWidth={3} />
          <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-25" />
        </div>

        {/* Heading */}
        <h2 className="font-serif-luxury text-3xl font-bold text-[#f4efe8] mb-1 tracking-wide">
          Chiptangiz tayyor!
        </h2>
        <p className="text-xs text-[#a1907d] mb-6">
          Telefoningizda saqlanadi — internet kerak emas.
        </p>

        {/* Ticket Artifact Box */}
        <div className="relative rounded-2xl bg-[#1d1712] border border-[#3f3120] p-4 mb-6 shadow-inner text-left">
          <div className="flex gap-3 mb-3">
            <img
              src={ticket.poster}
              alt={ticket.eventTitle}
              className="w-16 h-20 rounded-xl object-cover border border-[#4d3c26] shadow-md shrink-0"
            />
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c99b45]">
                {ticket.category}
              </span>
              <h4 className="font-serif-luxury text-base font-bold text-[#f4efe8] leading-tight">
                {ticket.eventTitle}
              </h4>
              <p className="text-[11px] text-[#9c8b77] mt-1">
                📅 {ticket.date} · {ticket.time}
              </p>
              <p className="text-[11px] text-[#847462] truncate">
                📍 {ticket.venue}
              </p>
            </div>
          </div>

          {/* Seat breakdown pill */}
          <div className="py-2 px-3 rounded-xl bg-[#261e16] border border-[#453623] flex items-center justify-between text-xs text-[#dcd2c4] mb-2">
            <span className="font-mono text-[11px]">
              {ticket.seats.length > 0
                ? ticket.seats
                    .map((s) => `${s.section} · Qator ${s.row} · O'rindiq ${s.seatNumber}`)
                    .join(' | ')
                : 'Parter · Qator 4'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#3d2f19] text-[#e8c679] border border-[#6b5229]">
              {ticket.seats.length} TA CHIPTA
            </span>
            <span className="font-mono text-xs text-[#9c8b77]">
              Jami: {new Intl.NumberFormat('uz-UZ').format(ticket.totalPaid)} so'm
            </span>
          </div>
        </div>

        {/* Primary Action Button: Save to Cabinet */}
        <button
          type="button"
          onClick={onGoToCabinet}
          className="w-full py-3.5 rounded-xl gold-gradient-btn text-sm font-bold uppercase tracking-wider mb-4 cursor-pointer"
        >
          Chiptalarimga saqlash
        </button>

        {/* Quick action buttons row */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            type="button"
            onClick={handleCalendar}
            className="py-2.5 px-2 rounded-xl bg-[#201913] border border-[#3b2e1e] hover:border-[#d4af37]/50 text-xs text-[#cfbfab] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Calendar size={13} className="text-[#d4af37]" />
            <span>Kalendarga</span>
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="py-2.5 px-2 rounded-xl bg-[#201913] border border-[#3b2e1e] hover:border-[#d4af37]/50 text-xs text-[#cfbfab] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <CheckCheck size={13} className="text-green-400" />
            ) : (
              <Share2 size={13} className="text-[#d4af37]" />
            )}
            <span>{copied ? 'Nusxalandi' : 'Ulashish'}</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="py-2.5 px-2 rounded-xl bg-[#201913] border border-[#3b2e1e] hover:border-[#d4af37]/50 text-xs text-[#cfbfab] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download size={13} className="text-[#d4af37]" />
            <span>{downloaded ? 'Yuklandi' : 'PDF'}</span>
          </button>
        </div>

        {/* Scannable QR Code Artwork */}
        <div className="relative mx-auto w-36 h-36 bg-white p-2.5 rounded-2xl shadow-xl flex items-center justify-center mb-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(
              ticket.qrCodeData
            )}`}
            alt="Ticket QR Code"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 rounded-lg bg-[#0b0907] border-2 border-[#d4af37] flex items-center justify-center shadow-lg">
              <span className="font-cinzel text-[8px] font-bold text-[#f5d68d]">S</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="space-y-1">
          <p className="text-[11px] text-[#7a6b5a]">
            🔔 Tadbirdan 1 kun oldin eslatib qo'yamiz.
          </p>
          <div className="font-mono text-xs tracking-widest text-[#d4af37] font-semibold">
            {ticket.ticketNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

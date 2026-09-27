import React, { useState } from 'react';
import { X, Calendar, MapPin, DollarSign, Image, Tag, Check, Sparkles } from 'lucide-react';
import { EventItem, EventCategory, Organizer } from '../../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizer: Organizer;
  onEventCreated: (newEvent: EventItem) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  organizer,
  onEventCreated,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('Konsert');
  const [venue, setVenue] = useState('Turkiston saroyi, Toshkent');
  const [city, setCity] = useState<'Toshkent' | 'Samarqand' | 'Buxoro'>('Toshkent');
  const [date, setDate] = useState('28 Noyabr');
  const [time, setTime] = useState('19:00');
  const [standartPrice, setStandartPrice] = useState(120000);
  const [premiumPrice, setPremiumPrice] = useState(250000);
  const [vipPrice, setVipPrice] = useState(480000);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvent: EventItem = {
      id: `ev-${Date.now()}`,
      title,
      subtitle: `${organizer.name} taqdim etadi`,
      category,
      date,
      rawDate: '2024-11-28',
      dayOfWeek: 'payshanba',
      time,
      duration: '2 soat',
      language: "O'zbek",
      ageLimit: '6+',
      venue,
      city,
      minPrice: standartPrice,
      maxPrice: vipPrice,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      gallery: [],
      description: description || `${title} — yilning eng kutilgan madaniy voqeasi.`,
      organizer,
      status: 'available',
      rating: 5.0,
      reviewsCount: 1,
      seatingTiers: {
        vip: { price: vipPrice, desc: "Markaziy VIP qatorlar" },
        premium: { price: premiumPrice, desc: "Oldingi qatorlar" },
        standart: { price: standartPrice, desc: "Balkon va yon joylar" },
      },
      program: [],
      reviews: [],
    };

    onEventCreated(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#16120e] border border-[#d4af37]/35 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-[#251d16] text-[#b3a491] hover:text-white hover:bg-[#382b1f] transition-colors"
        >
          <X size={16} />
        </button>

        <div className="mb-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37]">
            TASHKILOTCHI KABINETI
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#f5efe6] mt-0.5">
            Yangi tadbir yaratish
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase font-mono tracking-wider text-[#93826e] mb-1">
              TADBIR NOMI
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masalan: Bahor Simfoniyasi"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs text-[#f5efe6] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-[#93826e] mb-1">
                KATEGORIYA
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs text-[#f5efe6] focus:outline-none"
              >
                <option value="Konsert">Konsert</option>
                <option value="Teatr">Teatr</option>
                <option value="Jazz">Jazz</option>
                <option value="Ko'rgazma">Ko'rgazma</option>
                <option value="Kino">Kino</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-[#93826e] mb-1">
                SHAHAR
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs text-[#f5efe6] focus:outline-none"
              >
                <option value="Toshkent">Toshkent</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Buxoro">Buxoro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-[#93826e] mb-1">
                SANA (MASALAN: 28 NOYABR)
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs text-[#f5efe6] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-[#93826e] mb-1">
                BOSHLANISH VAQTI
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="19:00"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs text-[#f5efe6] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-wider text-[#93826e] mb-1">
              JOY VA MANZIL
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs text-[#f5efe6] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-[#93826e] mb-1">
                STANDART (SO'M)
              </label>
              <input
                type="number"
                value={standartPrice}
                onChange={(e) => setStandartPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs text-[#f5efe6]"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-[#93826e] mb-1">
                PREMIUM (SO'M)
              </label>
              <input
                type="number"
                value={premiumPrice}
                onChange={(e) => setPremiumPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs text-[#f5efe6]"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-[#93826e] mb-1">
                VIP (SO'M)
              </label>
              <input
                type="number"
                value={vipPrice}
                onChange={(e) => setVipPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs text-[#f5efe6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-wider text-[#93826e] mb-1">
              TAVSIF
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tadbir haqida batafsil ma'lumot..."
              className="w-full px-4 py-2 rounded-xl bg-[#1d1610] border border-[#3b2d1d] text-xs text-[#f5efe6] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gold-gradient-btn text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg mt-2"
          >
            Tadbirni e'lon qilish
          </button>
        </form>
      </div>
    </div>
  );
};

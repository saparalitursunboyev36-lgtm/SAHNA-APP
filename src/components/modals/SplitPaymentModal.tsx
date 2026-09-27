import React, { useState } from 'react';
import { X, Users, Copy, Check, Share2, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { EventItem } from '../../types';

interface SplitPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem;
}

export const SplitPaymentModal: React.FC<SplitPaymentModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const [copied, setCopied] = useState(false);
  const [friends, setFriends] = useState([
    { name: 'Siz (Islom Karimov)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', paid: true, role: 'Tashabbuskor' },
    { name: 'Sardor Aliyev', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', paid: true, role: "Do'st" },
    { name: 'Madina Umarova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', paid: true, role: "Do'st" },
    { name: 'Javohir Toirov', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', paid: false, role: "Do'st" },
  ]);

  const [newFriendName, setNewFriendName] = useState('');

  if (!isOpen) return null;

  const inviteLink = `https://sahna.uz/guruh/invite-${event.id}-9841`;

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const addFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendName.trim()) return;
    setFriends((prev) => [
      ...prev,
      {
        name: newFriendName.trim(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        paid: false,
        role: "Do'st",
      },
    ]);
    setNewFriendName('');
  };

  const simulateFriendPayment = (index: number) => {
    setFriends((prev) =>
      prev.map((f, i) => (i === index ? { ...f, paid: !f.paid } : f))
    );
  };

  const paidCount = friends.filter((f) => f.paid).length;
  const progressPercent = Math.round((paidCount / friends.length) * 100);
  const perPersonPrice = event.seatingTiers.premium.price || 280000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#16120e] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-[#251d16] text-[#b3a491] hover:text-white hover:bg-[#382b1f] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#f5d68d]">
            <Users size={20} />
          </div>
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#f4efe8]">
              Guruh xaridi (Split Payment)
            </h3>
            <p className="text-xs text-[#a1907d]">
              Do'stlaringiz bilan birga o'tiring — har kim o'z hissasini to'laydi.
            </p>
          </div>
        </div>

        {/* Event Highlight */}
        <div className="p-3.5 rounded-2xl bg-[#201913] border border-[#3b2e1e] my-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#d4af37]">
              TADBIR
            </span>
            <h4 className="text-sm font-semibold text-[#f4efe8]">{event.title}</h4>
            <p className="text-xs text-[#8c7b67]">
              {event.date} · {event.venue}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#8c7b67]">Kishi boshiga:</span>
            <div className="font-serif-luxury text-base font-bold text-[#f5d68d]">
              {new Intl.NumberFormat('uz-UZ').format(perPersonPrice)} so'm
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#c7b7a3]">
              To'lov holati: <strong>{paidCount}/{friends.length}</strong> to'ladi
            </span>
            <span className="font-mono text-[#d4af37] font-semibold">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#261f17] overflow-hidden border border-[#3a2e1f]">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#f5d68d] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Members List */}
        <div className="space-y-2 mb-4 max-h-[160px] overflow-y-auto">
          {friends.map((friend, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#1d1712] border border-[#32271a]"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#4d3b24]"
                />
                <div>
                  <div className="text-xs font-semibold text-[#f4efe8]">
                    {friend.name}
                  </div>
                  <div className="text-[10px] text-[#84735f]">{friend.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    friend.paid
                      ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {friend.paid ? "To'lagan ✓" : 'Kutilmoqda...'}
                </span>
                {!friend.name.includes('Siz') && (
                  <button
                    type="button"
                    onClick={() => simulateFriendPayment(idx)}
                    title="To'lov holatini simulyatsiya qilish"
                    className="text-[10px] text-[#bca36e] hover:underline cursor-pointer"
                  >
                    O'zgartirish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Friend Form */}
        <form onSubmit={addFriend} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            placeholder="Do'stingizning ismi..."
            className="flex-1 px-3 py-2 rounded-xl bg-[#1a140f] border border-[#3d2e1e] text-xs text-[#f4efe8] focus:outline-none focus:border-[#d4af37]"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-[#2b2216] border border-[#524128] text-xs text-[#f5d68d] hover:bg-[#3a2e1d] flex items-center gap-1 cursor-pointer"
          >
            <Plus size={14} />
            <span>Qo'shish</span>
          </button>
        </form>

        {/* Share Link Box */}
        <div className="p-3 rounded-2xl bg-[#1b150f] border border-[#3b2d1d] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <Share2 size={14} className="text-[#d4af37] shrink-0" />
            <span className="text-[11px] font-mono text-[#a89885] truncate">
              {inviteLink}
            </span>
          </div>
          <button
            type="button"
            onClick={copyLink}
            className="px-3 py-1.5 rounded-lg gold-gradient-bg text-black text-xs font-semibold shrink-0 flex items-center gap-1 hover:brightness-110 cursor-pointer"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? 'Olingan' : 'Nusxa'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

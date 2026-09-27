import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, Theater, ArrowRight, Loader2 } from 'lucide-react';
import { EventItem } from '../../types';

interface SahnaAiConciergeProps {
  onOpenEvent: (eventId: string) => void;
  events: EventItem[];
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  suggestedEventId?: string;
}

export const SahnaAiConcierge: React.FC<SahnaAiConciergeProps> = ({
  onOpenEvent,
  events,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Assalomu alaykum! Men SAHNA platformasining shaxsiy madaniyat konsyerjiman. ✨\n\nSizga bugungi kayfiyatingiz, didingiz yoki rejangizga mos eng sara teatr va konsertlarni tanlashda ko'maklashaman. Qanday tadbir izlayapsiz?`,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const presetQueries = [
    '🌹 Romantik kecha uchun nima bor?',
    '🎷 Jonli jazz yoki simfoniya',
    '🎭 Teatrda eng qaynoq premyera',
    '💡 Bepul yoki qulay narxli tadbirlar',
  ];

  const handleSend = async (userText?: string) => {
    const query = userText || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const replyText = data.reply || "Afsuski, hozir javob bera olmadim. Iltimos, qaytadan so'rang.";

      // Check if any event title is mentioned in the response to link it
      let matchedEventId: string | undefined = undefined;
      for (const ev of events) {
        if (replyText.toLowerCase().includes(ev.title.toLowerCase().slice(0, 10))) {
          matchedEventId = ev.id;
          break;
        }
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        suggestedEventId: matchedEventId,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: `Kechirasiz, aloqada qisqa uzilish bo'ldi. Sizga bugun **"Yulduzli kecha — Sevimli qo'shiqlar"** yoki **"Hamlet"** spektaklini tavsiya etaman!`,
          suggestedEventId: 'yulduzli-kecha',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full gold-gradient-bg text-[#14110e] font-semibold text-xs flex items-center gap-2.5 shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <div className="relative">
            <Sparkles size={17} className="animate-spin text-black" style={{ animationDuration: '6s' }} />
          </div>
          <span className="tracking-wide uppercase font-bold">Sahna AI Konsyerj</span>
          <span className="w-2 h-2 rounded-full bg-green-950 border border-green-400" />
        </button>
      )}

      {/* Concierge Drawer Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] bg-[#14100c] border border-[#d4af37]/40 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#211a13] via-[#1a140f] to-[#211a13] border-b border-[#362a1b] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl gold-gradient-bg flex items-center justify-center text-black shadow-md">
                <Theater size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-luxury text-base font-bold text-[#f4efe8]">
                    Sahna AI Konsyerj
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#d4af37]/20 text-[#f5d68d] border border-[#d4af37]/40 font-mono">
                    GEMINI
                  </span>
                </div>
                <p className="text-[10px] text-[#9c8a75]">
                  Madaniyat va teatr bo'yicha shaxsiy maslahatchi
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#241c14] text-[#b3a491] hover:text-white hover:bg-[#382b1f] transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-radial-at-t from-[#1b1510] to-[#110e0b]">
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isAi
                        ? 'bg-[#1e1812] border border-[#3b2e1e] text-[#f2ece2] shadow-sm'
                        : 'gold-gradient-bg text-[#14110e] font-medium shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-line">{m.text}</div>

                    {/* If AI suggested an event, show quick link card */}
                    {m.suggestedEventId && (
                      <div className="mt-2.5 pt-2.5 border-t border-[#443522] flex items-center justify-between">
                        <span className="text-[10px] text-[#e0c483] font-medium">
                          Tavsiya etilgan tadbir:
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            onOpenEvent(m.suggestedEventId!);
                          }}
                          className="px-2 py-1 rounded bg-[#2b2116] hover:bg-[#3d2e1e] text-[10px] text-[#f5d68d] border border-[#5a4325] flex items-center gap-1 cursor-pointer"
                        >
                          <span>Ko'rish</span>
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#a69580] p-3 rounded-2xl bg-[#1e1812] border border-[#3b2e1e] max-w-[70%]">
                <Loader2 size={13} className="animate-spin text-[#d4af37]" />
                <span>Konsyerj o'ylamoqda...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className="px-3 py-2 bg-[#17120e] border-t border-[#2d2217] flex gap-1.5 overflow-x-auto no-scrollbar">
            {presetQueries.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-[#201912] border border-[#3a2d1d] text-[10px] text-[#c9b9a5] hover:border-[#d4af37]/60 hover:text-[#f5d68d] transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#1a140f] border-t border-[#2e2317]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Savolingizni yozing (masalan, bugungi teatrlar)..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#221b14] border border-[#3b2d1d] text-xs text-[#f4efe8] placeholder-[#7d6e5d] focus:outline-none focus:border-[#d4af37]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-black disabled:opacity-40 cursor-pointer hover:brightness-110"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

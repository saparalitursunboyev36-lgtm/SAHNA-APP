import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // Initialize Gemini API client if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // AI Cultural Concierge endpoint
  app.post('/api/ai/concierge', async (req, res) => {
    try {
      const { message, context, preferredCategory, budget } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Xabar kiritilmadi' });
      }

      if (ai) {
        const systemInstruction = `Siz "SAHNA" platformasining madaniyat va teatr bo'yicha sun'iy intellekt konsyerjisiz. 
Toshkent va butun O'zbekistondagi teatrlar (Alisher Navoiy nomidagi teatr, O'zbek Milliy Akademik drama teatri, Ilhom teatri, Rus akademik teatri), simfonik konsertlar (Xalqaro simfonik orkestr, Turkiston saroyi, Konservatoriya, Humo Arena), zamonaviy san'at ko'rgazmalari va jazz festivallari bo'yicha eksklyuziv bilimga egasiz.

Foydalanuvchiga juda muloyim, madaniyatli, estetik va samimiy o'zbek tilida javob bering.
Takliflaringizda:
1. Tadbir nomi va janri
2. Nega aynan shu tadbir qiziqarli ekanligi
3. Qaysi joylarni (VIP, Parter, Balkon) tanlash ma'qulligi
4. Kiyinish qoidalari (Dress code) yoki kecha uchun maslahat bering.

Hozirgi mavjud tadbirlar bazasi:
- "Yulduzli kecha — Sevimli qo'shiqlar" (Estrada, Turkiston saroyi, 150 000 - 550 000 so'm)
- "Hamlet: Yangicha talqin" (Teatr, Milliy Akademik Teatri, 45 000 - 150 000 so'm)
- "Shaxmat va Musiqa: Jazz simfoniyasi" (Xalqlar Do'stligi, 150 000 - 450 000 so'm)
- "Betxoven: 9-Simfoniya" (Konservatoriya, Mumtoz)
- "Xalqaro Jazz Festivali" (Turkiston ochiq amfiteatri)
- "Oqqush ko'li" (Balet, Alisher Navoiy nomidagi teatr)
- "Raqs sehri: Yangi qadam" (Zamonaviy raqs, Yoshlar teatri)
- "Nazm va navo kechasi" (Alisher Navoiy kutubxonasi, Bepul)`;

        const prompt = `Foydalanuvchi so'rovi: "${message}". 
Kategoriya qiziqishi: ${preferredCategory || 'ixtiyoriy'}. 
Byudjet: ${budget || 'ko\'rsatilmagan'}.
Tadbir tavsiya eting va chiroyli yo'l-yo'riq bering.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        return res.json({
          reply: response.text,
          model: 'gemini-3.8-flash',
        });
      } else {
        // Fallback intelligent concierge responses when GEMINI_API_KEY is not set
        const lower = (message || '').toLowerCase();
        let fallbackReply = '';

        if (lower.includes('romantik') || lower.includes('sevgi') || lower.includes('qizim') || lower.includes('juftlik')) {
          fallbackReply = `✨ **Romantik oqshom uchun ajoyib tavsiya:**\n\nSizga Alisher Navoiy nomidagi Davlat Akademik Katta Teatrida bo'lib o'tadigan **"Oqqush ko'li"** klassik baletini yoki Turkiston saroyidagi **"Yulduzli kecha — Sevimli qo'shiqlar"** konsertini tavsiya etaman.\n\n🏛 **Joy tavsiyasi:** Parter 4-6 qatorlar yoki Markaziy lojalar romantik atmosfera uchun eng mukammal ko'rinish va akustikani beradi.\n🍷 **Dress code:** Smart-casual yoki klassik oqshom libosi.`;
        } else if (lower.includes('teatr') || lower.includes('spektakl') || lower.includes('drama')) {
          fallbackReply = `🎭 **Teatr ixlosmandlari uchun maxsus:**\n\nMilliy Akademik Teatrida namoyish etilayotgan **"Hamlet: Yangicha talqin"** spektaklini o'tkazib yubormang! Zamonaviy sahna yechimlari va yulduz aktyorlar jamoasi sizni lol qoldiradi.\n\n🎟 **Chipta narxi:** 45 000 so'mdan boshlanadi. Sahna yaqinidagi Parter 3-5 qatorlar aktyorlarning jonli mimikasini his qilish uchun eng ma'qul tanlov.`;
        } else if (lower.includes('jazz') || lower.includes('musiqa') || lower.includes('konsert')) {
          fallbackReply = `🎷 **Jonli musiqa va Jazz shaydolari uchun:**\n\nBu hafta eng kutilgan tadbirlar:\n1. **"Xalqaro Jazz Festivali"** — Turkiston saroyi yozgi amfiteatrida xalqaro virtuozlar ishtirokida.\n2. **"Shaxmat va Musiqa: Jazz simfoniyasi"** — Xalqlar Do'stligi saroyida simfonik orkestr bilan uyg'unlashgan noyob kompozitsiyalar.\n\n✨ Jonli ovoz va haqiqiy qalb musiqasi kafolatlanadi!`;
        } else if (lower.includes('byudjet') || lower.includes('arzon') || lower.includes('bepul')) {
          fallbackReply = `💡 **Tejamkor va ma'rifiy tadbirlar:**\n\n1. **"Nazm va navo kechasi"** — Alisher Navoiy milliy kutubxonasida, kirish mutlaqo **BEPUL** (ro'yxatdan o'tish kifoya).\n2. **"Modern Art Expo 2024"** — Markaziy ko'rgazmalar galereyasida, bepul kirish.\n3. Teatrlarimizda 45 000 - 80 000 so'mlik balkon va amfiteatr chiptalari ham a'lo akustikaga ega!`;
        } else {
          fallbackReply = `🎭 **SAHNA Madaniyat Konsyeri sizga xizmat qilishdan mamnun!**\n\nBugungi kunda O'zbekiston madaniy hayotidagi eng qaynoq voqea — bu **"Yulduzli kecha — Sevimli qo'shiqlar"** va **"Xalqaro Jazz Festivali"**dir.\n\nSiz qanday janrni afzal ko'rasiz? Mumtoz teatr, estrada konserti, simfoniya yoki ko'rgazmalar? Istalgan qiziqishingizni yozing, sizga eng munosib o'rindiqlarni tanlab beraman!`;
        }

        return res.json({
          reply: fallbackReply,
          model: 'sahna-curator-engine',
        });
      }
    } catch (err: any) {
      console.error('Gemini Concierge Error:', err);
      return res.status(500).json({
        error: 'Tavsiya olishda xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.',
      });
    }
  });

  // Setup Vite in middleware mode for dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SAHNA server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

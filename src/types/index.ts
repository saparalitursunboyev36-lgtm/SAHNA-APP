export type EventCategory =
  | 'Hammasi'
  | 'Konsert'
  | 'Teatr'
  | 'Kino'
  | 'Sport'
  | 'Ko\'rgazma'
  | 'Biznes'
  | 'Jazz';

export interface Organizer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  verified: boolean;
  eventsCount: number;
  rating: number;
  guestsCount: number;
  quote: string;
  videoGreetingUrl?: string;
  videoViews: number;
  videoDuration: string;
}

export interface ProgramItem {
  time: string;
  title: string;
  desc: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  category: EventCategory;
  date: string; // e.g. "24 Okt", "18 avgust"
  rawDate: string; // "2024-10-24"
  dayOfWeek: string; // "shanba", "yakshanba"
  time: string; // "19:00"
  duration: string; // "2 soat 30 daqiqa"
  language: string; // "O'zbek", "Rus", "Ingliz"
  ageLimit: string; // "12+", "6+", "16+"
  venue: string; // "Turkiston saroyi, Toshkent"
  city: 'Toshkent' | 'Samarqand' | 'Buxoro';
  minPrice: number;
  maxPrice: number;
  image: string;
  gallery: string[];
  description: string;
  organizer: Organizer;
  status: 'available' | 'sold_out' | 'few_left' | 'free';
  fewLeftCount?: number;
  rating: number;
  reviewsCount: number;
  seatingTiers: {
    vip: { price: number; desc: string };
    premium: { price: number; desc: string };
    standart: { price: number; desc: string };
  };
  program: ProgramItem[];
  reviews: ReviewItem[];
  isFeatured?: boolean;
  isUpcomingSoon?: boolean;
  countdownSeconds?: number;
}

export interface Seat {
  id: string;
  section: 'PARTER' | 'BALKON';
  row: number;
  seatNumber: number;
  tier: 'vip' | 'premium' | 'standart';
  price: number;
  status: 'available' | 'reserved' | 'sold';
}

export interface UserTicket {
  id: string;
  ticketNumber: string; // e.g. #SHN-48210
  eventId: string;
  eventTitle: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  poster: string;
  seats: {
    section: string;
    row: number;
    seatNumber: number;
    tier: string;
    price: number;
  }[];
  totalPaid: number;
  qrCodeData: string;
  purchaseDate: string;
  status: 'active' | 'used' | 'cancelled';
  daysRemaining: number;
}

export interface FriendGroupBooking {
  id: string;
  title: string;
  eventId: string;
  organizerName: string;
  totalMembers: number;
  paidMembers: number;
  myPrice: number;
  status: 'pending' | 'completed';
  members: {
    name: string;
    avatar: string;
    paid: boolean;
    isMe?: boolean;
  }[];
}

export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}

export type ActivePage =
  | 'home'
  | 'catalog'
  | 'event-detail'
  | 'cabinet'
  | 'organizer';

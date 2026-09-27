/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CategoryBar } from './components/home/CategoryBar';
import { WeeklyEvents } from './components/home/WeeklyEvents';
import { VideoStoriesSection } from './components/home/VideoStoriesSection';
import { WhySahna } from './components/home/WhySahna';
import { FeaturedEvent } from './components/home/FeaturedEvent';
import { CountdownSection } from './components/home/CountdownSection';
import { TopOrganizers } from './components/home/TopOrganizers';
import { FaqSection } from './components/home/FaqSection';
import { CatalogPage } from './components/catalog/CatalogPage';
import { EventDetailPage } from './components/event/EventDetailPage';
import { UserCabinetPage } from './components/cabinet/UserCabinetPage';
import { OrganizerDashboard } from './components/organizer/OrganizerDashboard';

// Modals
import { SeatSelectionModal } from './components/modals/SeatSelectionModal';
import { PaymentModal } from './components/modals/PaymentModal';
import { SuccessTicketModal } from './components/modals/SuccessTicketModal';
import { VideoStoryModal } from './components/modals/VideoStoryModal';
import { SplitPaymentModal } from './components/modals/SplitPaymentModal';
import { CreateEventModal } from './components/modals/CreateEventModal';
import { QrScannerModal } from './components/organizer/QrScannerModal';
import { SearchModal } from './components/modals/SearchModal';
import { SahnaAiConcierge } from './components/ai/SahnaAiConcierge';

// Data
import { sampleEvents, organizersList, userActiveTickets, sampleFriendBooking } from './data/mockData';
import { ActivePage, EventItem, Organizer, Seat, UserTicket } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [pageHistory, setPageHistory] = useState<ActivePage[]>(['home']);

  const [events, setEvents] = useState<EventItem[]>(sampleEvents);
  const [organizers, setOrganizers] = useState<Organizer[]>(organizersList);
  const [tickets, setTickets] = useState<UserTicket[]>(userActiveTickets);
  const [favorites, setFavorites] = useState<string[]>(['yulduzli-kecha', 'hamlet-yangicha-talqin', 'xalqaro-jazz-festivali']);
  const [currentCity, setCurrentCity] = useState<'Toshkent' | 'Samarqand' | 'Buxoro'>('Toshkent');
  const [selectedEventId, setSelectedEventId] = useState<string>('yulduzli-kecha');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Hammasi');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('Hammasi');

  // Modal states
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isVideoStoryOpen, setIsVideoStoryOpen] = useState(false);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Active target objects for modals
  const [modalTargetEvent, setModalTargetEvent] = useState<EventItem>(sampleEvents[0]);
  const [modalTargetOrganizer, setModalTargetOrganizer] = useState<Organizer>(organizersList[0]);
  const [checkoutSeats, setCheckoutSeats] = useState<Seat[]>([]);
  const [checkoutTotalPrice, setCheckoutTotalPrice] = useState<number>(560000);
  const [recentlyPurchasedTicket, setRecentlyPurchasedTicket] = useState<UserTicket | null>(null);

  // Navigation management: smooth push to history and back tracking
  const navigateTo = (page: ActivePage) => {
    if (page !== activePage) {
      setPageHistory((prev) => [...prev, page]);
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      const updated = [...pageHistory];
      updated.pop(); // remove current
      const prevPage = updated[updated.length - 1];
      setPageHistory(updated);
      setActivePage(prevPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActivePage('home');
      setPageHistory(['home']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Browser back/forward button support
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.page) {
        setActivePage(e.state.page);
      } else {
        goBack();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [pageHistory]);

  // Helpers
  const toggleFavorite = (eventId: string) => {
    setFavorites((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const handleOpenEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    const ev = events.find((e) => e.id === eventId);
    if (ev) setModalTargetEvent(ev);
    navigateTo('event-detail');
  };

  const handleOpenTickets = (event: EventItem) => {
    setModalTargetEvent(event);
    setIsSeatModalOpen(true);
  };

  const handleProceedToCheckout = (selectedSeats: Seat[], totalPrice: number) => {
    setCheckoutSeats(selectedSeats);
    setCheckoutTotalPrice(totalPrice);
    setIsSeatModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (newTicket: UserTicket) => {
    setRecentlyPurchasedTicket(newTicket);
    setTickets((prev) => [newTicket, ...prev]);
    setIsPaymentModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleOpenStory = (organizer: Organizer, event?: EventItem) => {
    setModalTargetOrganizer(organizer);
    if (event) setModalTargetEvent(event);
    setIsVideoStoryOpen(true);
  };

  const handleOpenSplit = (event: EventItem) => {
    setModalTargetEvent(event);
    setIsSplitModalOpen(true);
  };

  const handleEventCreated = (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
    setSelectedEventId(newEvent.id);
    setModalTargetEvent(newEvent);
    navigateTo('catalog');
  };

  const currentDetailEvent = events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <div className="min-h-screen bg-[#0b0907] text-[#f4efe8] flex flex-col font-sans selection:bg-[#c99b45]/30 selection:text-[#f3d99d]">
      {/* Global Navigation Header */}
      <Header
        activePage={activePage}
        setActivePage={navigateTo}
        onGoBack={goBack}
        favoritesCount={favorites.length}
        ticketsCount={tickets.length}
        currentCity={currentCity}
        setCurrentCity={setCurrentCity}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCreateEvent={() => setIsCreateEventOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategoryFilter(cat);
          navigateTo('catalog');
        }}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {/* 1. BOSH SAHIFA (HOME PAGE) */}
        {activePage === 'home' && (
          <div className="animate-fade-in">
            <HeroSection
              onSearch={(params) => {
                if (params.category) setSelectedCategoryFilter(params.category);
                if (params.date) setSelectedDateFilter(params.date);
                navigateTo('catalog');
              }}
              onSelectQuickTag={(tag) => {
                if (tag === 'Jazz oqshomi') {
                  setSelectedCategoryFilter('Jazz');
                  setSelectedDateFilter('Hammasi');
                } else {
                  setSelectedDateFilter(tag);
                }
                navigateTo('catalog');
              }}
            />

            {/* Category selection on Home stays on Home page and filters events! */}
            <CategoryBar
              selectedCategory={selectedCategoryFilter}
              onSelectCategory={(cat) => {
                setSelectedCategoryFilter(cat);
              }}
            />

            <WeeklyEvents
              events={events}
              onOpenEvent={handleOpenEvent}
              onOpenTickets={handleOpenTickets}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              selectedCategory={selectedCategoryFilter}
              onViewAll={() => navigateTo('catalog')}
            />

            <VideoStoriesSection
              organizers={organizers}
              onOpenStory={(org) => handleOpenStory(org)}
            />

            <WhySahna />

            <FeaturedEvent
              events={events}
              onOpenTickets={handleOpenTickets}
              onOpenStory={(ev) => handleOpenStory(ev.organizer, ev)}
            />

            {/* Interactive Countdown & Date Calendar Section: Clicking dates stays on page and reveals events for that day! */}
            <CountdownSection
              events={events}
              onOpenTickets={handleOpenTickets}
              onOpenEvent={handleOpenEvent}
              onViewInCatalog={(dayNum) => {
                setSelectedDateFilter(`${dayNum}`);
                navigateTo('catalog');
              }}
            />

            <TopOrganizers
              organizers={organizers}
              onOpenStory={(org) => handleOpenStory(org)}
              onOpenCreateEvent={() => setIsCreateEventOpen(true)}
            />

            <FaqSection />
          </div>
        )}

        {/* 2. TADBIRLAR (KATALOG + FILTER) */}
        {activePage === 'catalog' && (
          <div className="animate-fade-in">
            <CatalogPage
              events={events}
              onOpenEvent={handleOpenEvent}
              onOpenTickets={handleOpenTickets}
              onOpenSplitModal={handleOpenSplit}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              initialCategory={selectedCategoryFilter}
              initialDate={selectedDateFilter}
              onBack={goBack}
            />
          </div>
        )}

        {/* 3. TADBIR SAHIFASI (SINGLE EVENT) */}
        {activePage === 'event-detail' && (
          <div className="animate-fade-in">
            <EventDetailPage
              event={currentDetailEvent}
              onOpenSeatModal={() => handleOpenTickets(currentDetailEvent)}
              onOpenSplitModal={() => handleOpenSplit(currentDetailEvent)}
              onOpenStoryModal={() => handleOpenStory(currentDetailEvent.organizer, currentDetailEvent)}
              onBackToCatalog={() => navigateTo('catalog')}
              onBack={goBack}
              onGoToHome={() => navigateTo('home')}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        )}

        {/* 4. CHIPTALARIM (USER CABINET) */}
        {activePage === 'cabinet' && (
          <div className="animate-fade-in">
            <UserCabinetPage
              tickets={tickets}
              events={events}
              friendBooking={sampleFriendBooking}
              onOpenTicketPass={(t) => {
                setRecentlyPurchasedTicket(t);
                setIsSuccessModalOpen(true);
              }}
              onOpenEvent={handleOpenEvent}
              onPayGroupShare={() => {
                setCheckoutSeats([
                  {
                    id: 'seat-grp-1',
                    section: 'PARTER',
                    row: 3,
                    seatNumber: 15,
                    tier: 'premium',
                    price: sampleFriendBooking.myPrice,
                    status: 'reserved',
                  },
                ]);
                setCheckoutTotalPrice(sampleFriendBooking.myPrice);
                setIsPaymentModalOpen(true);
              }}
              onLogout={() => navigateTo('home')}
              onBack={goBack}
            />
          </div>
        )}

        {/* 5. TASHKILOTCHI PANELI (ORGANIZER DASHBOARD) */}
        {activePage === 'organizer' && (
          <div className="animate-fade-in">
            <OrganizerDashboard
              organizer={organizers[0]}
              events={events}
              onOpenCreateEvent={() => setIsCreateEventOpen(true)}
              onOpenQrScanner={() => setIsQrScannerOpen(true)}
              onOpenStoryModal={() => handleOpenStory(organizers[0])}
              onBack={goBack}
            />
          </div>
        )}
      </main>

      {/* Global Luxury Footer */}
      <Footer setActivePage={navigateTo} />

      {/* MODAL 1: Joy tanlash (Interactive Hall Seating Modal) */}
      <SeatSelectionModal
        isOpen={isSeatModalOpen}
        onClose={() => setIsSeatModalOpen(false)}
        event={modalTargetEvent}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* MODAL 2: To'lov (Payment Modal) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        event={modalTargetEvent}
        selectedSeats={checkoutSeats}
        totalPrice={checkoutTotalPrice}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* MODAL 3: Muvaffaqiyatli xarid (Success Ticket Pass Modal) */}
      <SuccessTicketModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        ticket={recentlyPurchasedTicket}
        onGoToCabinet={() => {
          setIsSuccessModalOpen(false);
          navigateTo('cabinet');
        }}
      />

      {/* MODAL 4: Video Murojaat (Organizer Story Player Modal) */}
      <VideoStoryModal
        isOpen={isVideoStoryOpen}
        onClose={() => setIsVideoStoryOpen(false)}
        organizer={modalTargetOrganizer}
        event={modalTargetEvent}
        onSelectSeats={() => {
          setIsVideoStoryOpen(false);
          handleOpenTickets(modalTargetEvent);
        }}
      />

      {/* MODAL 5: Do'stlar bilan bo'lib to'lash (Split Payment Modal) */}
      <SplitPaymentModal
        isOpen={isSplitModalOpen}
        onClose={() => setIsSplitModalOpen(false)}
        event={modalTargetEvent}
      />

      {/* MODAL 6: Yangi tadbir yaratish (Create Event Modal) */}
      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        organizer={organizers[0]}
        onEventCreated={handleEventCreated}
      />

      {/* MODAL 7: QR Ticket Scanner Tool (Organizer Live Scanner) */}
      <QrScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        tickets={tickets}
      />

      {/* MODAL 8: Global Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        events={events}
        onSelectEvent={handleOpenEvent}
      />

      {/* AI Madaniyat Konsyeri (Gemini Cultural Concierge Floating Widget) */}
      <SahnaAiConcierge
        events={events}
        onOpenEvent={handleOpenEvent}
      />
    </div>
  );
}

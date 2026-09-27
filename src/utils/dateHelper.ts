import { EventItem } from '../types';

/**
 * Filter events by day number (e.g. 21, 22, 24, 25, 27)
 */
export function filterEventsByDayNumber(events: EventItem[], day: number): EventItem[] {
  const paddedDay = day < 10 ? `0${day}` : `${day}`;
  return events.filter((ev) => {
    // Check rawDate e.g. "2024-10-22"
    if (ev.rawDate && (ev.rawDate.endsWith(`-${paddedDay}`) || ev.rawDate.endsWith(`-${day}`))) {
      return true;
    }
    // Check display date e.g. "22 Okt" or "22"
    if (ev.date && (ev.date.startsWith(`${day} `) || ev.date.startsWith(`${paddedDay} `))) {
      return true;
    }
    // Bugun matches 27
    if (day === 27 && (ev.date === 'Bugun' || ev.rawDate.includes('10-27'))) {
      return true;
    }
    // Ertaga matches 28
    if (day === 28 && (ev.date === 'Ertaga' || ev.rawDate.includes('10-28'))) {
      return true;
    }
    return false;
  });
}

/**
 * Filter events by quick date tags ("Hammasi", "Bugun", "Ertaga", "Dam olish kunlari", "Shu hafta", "Shu oy")
 */
export function filterEventsByQuickTag(events: EventItem[], tag: string): EventItem[] {
  if (!tag || tag === 'Hammasi') return events;

  if (tag === 'Bugun') {
    return events.filter(
      (ev) => ev.date === 'Bugun' || ev.rawDate.includes('10-27') || ev.date.startsWith('27')
    );
  }

  if (tag === 'Ertaga') {
    return events.filter(
      (ev) => ev.date === 'Ertaga' || ev.rawDate.includes('10-28') || ev.date.startsWith('28')
    );
  }

  if (tag === 'Dam olish kunlari') {
    return events.filter(
      (ev) =>
        ev.dayOfWeek?.toLowerCase() === 'shanba' ||
        ev.dayOfWeek?.toLowerCase() === 'yakshanba' ||
        ev.rawDate.includes('10-26') ||
        ev.rawDate.includes('10-27')
    );
  }

  if (tag === 'Shu hafta') {
    return events.filter((ev) => {
      // Days between 21 and 27
      const match = ev.rawDate.match(/2024-10-(\d+)/);
      if (match) {
        const d = parseInt(match[1], 10);
        return d >= 21 && d <= 28;
      }
      return true;
    });
  }

  if (tag === 'Shu oy') {
    return events.filter((ev) => ev.rawDate.includes('2024-10'));
  }

  return events;
}

/**
 * Filter events by exact rawDate string "YYYY-MM-DD"
 */
export function filterEventsByExactDate(events: EventItem[], exactDate: string): EventItem[] {
  if (!exactDate) return events;
  return events.filter((ev) => ev.rawDate === exactDate);
}

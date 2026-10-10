import type { IsoDate } from '@/content/types';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function parts(iso: IsoDate) {
  const [y, m, d] = iso.split('-');
  return { year: y, month: m ? MONTHS[Number(m) - 1] : undefined, day: d ? Number(d) : undefined };
}

/** Formats an ISO date at the precision it was given (never invents a day). */
export function formatDate(iso: IsoDate): string {
  const { year, month, day } = parts(iso);
  if (!month) return year;
  return day ? `${month} ${day}, ${year}` : `${month} ${year}`;
}

/** "October 2025 – Present", "January – September 2025", "November 2024 – November 2026". */
export function formatMonthRange(start: IsoDate, end?: IsoDate, ongoing?: boolean): string {
  const s = parts(start);
  if (ongoing) return `${formatDate(start)} – Present`;
  if (!end) return formatDate(start);
  const e = parts(end);
  if (s.year === e.year) return `${s.month} – ${e.month} ${e.year}`;
  return `${formatDate(start)} – ${formatDate(end)}`;
}

/** "September 27 – October 1, 2026", "September 10–11, 2026", or a single day. */
export function formatDayRange(start: IsoDate, end?: IsoDate): string {
  if (!end || end === start) return formatDate(start);
  const s = parts(start);
  const e = parts(end);
  if (s.year !== e.year) return `${formatDate(start)} – ${formatDate(end)}`;
  if (s.month === e.month) return `${s.month} ${s.day}–${e.day}, ${s.year}`;
  return `${s.month} ${s.day} – ${e.month} ${e.day}, ${s.year}`;
}

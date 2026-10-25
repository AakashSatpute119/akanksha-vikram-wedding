const IST_TIMEZONE = "Asia/Kolkata";
const IST_OFFSET = "+05:30";
const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

/**
 * Parses a date string as India Standard Time.
 * Accepts full ISO strings with an offset, `YYYY-MM-DDTHH:mm`, or `YYYY-MM-DD`.
 */
export function parseIstDate(value?: string | null): Date | null {
  if (!value) return null;
  let trimmed = value.trim();
  if (!trimmed) return null;

  trimmed = trimmed.replace(" ", "T").replace(/(\d)T(\d{2}:\d{2}:\d{2})\.\d+/, "$1T$2");

  const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(trimmed);
  const normalized = hasZone
    ? trimmed
    : /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
      ? `${trimmed}T00:00:00${IST_OFFSET}`
      : `${trimmed}${IST_OFFSET}`;

  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDateLong(value?: string | null): string {
  const date = parseIstDate(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("mr-IN", {
    timeZone: IST_TIMEZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateShort(value?: string | null): string {
  const date = parseIstDate(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("mr-IN", {
    timeZone: IST_TIMEZONE,
    day: "numeric",
    month: "short",
  }).format(date);
}

export function formatTimeInIst(value?: string | null): string {
  const date = parseIstDate(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("mr-IN", {
    timeZone: IST_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function toDevDigits(value: string | number, pad = false): string {
  const text = pad ? String(value).padStart(2, "0") : String(value);
  return text.replace(/\d/g, (digit) => DEVANAGARI_DIGITS[Number(digit)]);
}

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

export function getCountdown(target: Date): CountdownParts {
  const total = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
    total,
  };
}

const toCalendarStamp = (date: Date) =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function buildCalendarUrl(options: {
  title: string;
  date: Date;
  durationMinutes?: number;
  details?: string;
  location?: string;
}): string {
  const end = new Date(options.date.getTime() + (options.durationMinutes ?? 120) * 60_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: options.title,
    dates: `${toCalendarStamp(options.date)}/${toCalendarStamp(end)}`,
    details: options.details ?? "",
    location: options.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function buildMapsEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number, locale: string = "en") {
  return new Intl.NumberFormat(locale).format(n);
}

export function formatDate(
  date: string | Date,
  locale: string = "en",
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", options).format(d);
}

/** Localized field accessor for Sanity bilingual content */
export function pickLocale<T>(
  field: { en?: T; id?: T } | undefined,
  locale: string,
  fallback: T | "" = ""
): T | "" {
  if (!field) return fallback;
  return (field as Record<string, T>)[locale] ?? field.en ?? fallback;
}

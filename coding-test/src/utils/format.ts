export interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  locale?: string;
}

export function parseDate(value: string | number | Date): Date {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'number') {
    return new Date(value);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date value: ${value}`);
  }

  return parsed;
}

export function formatDate(value: string | number | Date, options: FormatDateOptions = {}): string {
  const locale =
    options.locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US');
  const date = parseDate(value);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(date);
}

export function formatDateTime(
  value: string | number | Date,
  options: FormatDateOptions = {}
): string {
  return formatDate(value, {
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  });
}

export function formatRelativeTime(value: string | number | Date): string {
  const date = parseDate(value);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / (1000 * 60));

  const rtf = new Intl.RelativeTimeFormat(navigator?.language ?? 'en-US', {
    numeric: 'auto',
  });

  const divisions = [
    { amount: 60, name: 'minutes' as const },
    { amount: 24, name: 'hours' as const },
    { amount: 7, name: 'days' as const },
    { amount: 4.34524, name: 'weeks' as const },
    { amount: 12, name: 'months' as const },
    { amount: Number.POSITIVE_INFINITY, name: 'years' as const },
  ];

  let duration = diffMinutes;
  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(duration, division.name);
    }
    duration = Math.round(duration / division.amount);
  }

  return rtf.format(duration, 'years');
}

export interface FormatCurrencyOptions {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatCurrency(
  value: number,
  {
    locale = 'en-US',
    currency = 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
  }: FormatCurrencyOptions = {}
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions & { locale?: string } = {}
): string {
  const { locale, ...formatOptions } = options;
  return new Intl.NumberFormat(locale ?? 'en-US', {
    maximumFractionDigits: 2,
    ...formatOptions,
  }).format(value);
}

export function formatCurrencyCompact(
  value: number,
  { locale = 'en-US', currency = 'USD' }: Pick<FormatCurrencyOptions, 'locale' | 'currency'> = {}
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function differenceInDays(
  start: string | number | Date,
  end: string | number | Date
): number {
  const startDate = parseDate(start);
  const endDate = parseDate(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const parts = [];
  if (hrs) parts.push(`${hrs}h`);
  if (mins) parts.push(`${mins}m`);
  return parts.length ? parts.join(' ') : '0m';
}

export function truncateText(value: string, maxLength = 120): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1)}…`;
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0) ?? ''}${lastName.charAt(0) ?? ''}`.toUpperCase();
}

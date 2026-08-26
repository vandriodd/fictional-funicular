import type { CurrencyCode } from '@/constants/currencies';

/** `18400` -> `"18,400 MUR"` */
export function formatMoney(value: number, currency: CurrencyCode) {
  return `${Math.abs(value).toLocaleString('en-US')} ${currency}`;
}

/** `-520` -> `"-520 MUR"`, `1250` -> `"+1,250 MUR"` */
export function formatSignedMoney(value: number, currency: CurrencyCode) {
  return `${value < 0 ? '-' : '+'}${formatMoney(value, currency)}`;
}

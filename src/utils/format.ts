import { CURRENCY } from '@/data/mock';

/** `18400` -> `"18,400 MUR"` */
export function formatMoney(value: number) {
  return `${Math.abs(value).toLocaleString('en-US')} ${CURRENCY}`;
}

/** `-520` -> `"-520 MUR"`, `1250` -> `"+1,250 MUR"` */
export function formatSignedMoney(value: number) {
  return `${value < 0 ? '-' : '+'}${formatMoney(value)}`;
}

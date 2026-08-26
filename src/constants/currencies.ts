export type CurrencyCode = 'UYU' | 'USD' | 'MUR';

export type Currency = {
  code: CurrencyCode;
  /** Shown in the compact dropdown pill. */
  symbol: string;
  flag: string;
  label: string;
};

export const CURRENCIES: Currency[] = [
  { code: 'UYU', symbol: '$U', flag: '🇺🇾', label: 'Uruguayan peso' },
  { code: 'USD', symbol: '$', flag: '🇺🇸', label: 'US dollar' },
  { code: 'MUR', symbol: 'Rs', flag: '🇲🇺', label: 'Mauritian rupee' },
];

export const DEFAULT_CURRENCY: CurrencyCode = 'MUR';

export function getCurrency(code: CurrencyCode) {
  return CURRENCIES.find((currency) => currency.code === code) ?? CURRENCIES[2];
}

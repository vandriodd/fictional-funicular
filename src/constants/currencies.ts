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

/** Display preference a fresh profile starts with. */
export const DEFAULT_CURRENCY: CurrencyCode = 'MUR';

/**
 * The currency the account's summary figures (balance, category totals, daily
 * spend) are recorded in. Independent of what the user chooses to see.
 */
export const BASE_CURRENCY: CurrencyCode = 'MUR';

/**
 * Indicative rates: how many USD one unit is worth. Mock figures — swap for a
 * live feed. Amounts are stored in the currency the movement was created in and
 * only converted when they are displayed.
 */
const USD_PER_UNIT: Record<CurrencyCode, number> = {
  USD: 1,
  UYU: 0.025,
  MUR: 0.0214,
};

export function convert(amount: number, from: CurrencyCode, to: CurrencyCode) {
  if (from === to) return amount;
  return (amount * USD_PER_UNIT[from]) / USD_PER_UNIT[to];
}

export function getCurrency(code: CurrencyCode) {
  return CURRENCIES.find((currency) => currency.code === code) ?? CURRENCIES[2];
}

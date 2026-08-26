import { useMemo } from 'react';

import { BASE_CURRENCY, convert, type CurrencyCode } from '@/constants/currencies';
import { useProfile } from '@/state/profile';
import { formatMoney, formatSignedMoney } from '@/utils/format';

/**
 * Formats amounts in the currency the user picked in Preferences, converting
 * from whichever currency the amount was recorded in.
 */
export function useMoney() {
  const { currency } = useProfile();

  return useMemo(
    () => ({
      /** The currency amounts are shown in. */
      display: currency,
      format: (value: number, from: CurrencyCode = BASE_CURRENCY) =>
        formatMoney(convert(value, from, currency), currency),
      formatSigned: (value: number, from: CurrencyCode = BASE_CURRENCY) =>
        formatSignedMoney(convert(value, from, currency), currency),
    }),
    [currency],
  );
}

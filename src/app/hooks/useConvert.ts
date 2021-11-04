import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useAppSelector } from '../hooks';

/**
 * Returns a helper function for currency conversion
 *
 * @example
 * // returns 0.87 (at Nov 4, 09:50 UTC)
 * const convert = useConvert();
 *
 * convert('USD', 'EUR', 1);
 */
const useConvert = () => {
  const rates = useAppSelector((state) => state.rates.data);

  return useCallback(
    (from: string, to: string, amount?: number): number => {
      if (null == rates) {
        throw new Error('Rates are not initialized');
      }

      const fromRate = rates[from];
      const toRate = rates[to];

      if (null == fromRate || null == toRate) {
        throw new Error(`No rate info found for ${from} or ${to}`);
      }

      if (null == amount) {
        amount = 1;
      }

      return new BigNumber(amount).times(toRate).div(fromRate).toNumber();
    },
    [rates],
  );
};

export default useConvert;

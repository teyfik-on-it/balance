import client from './client';

/**
 * Expected API response for "/latest" endpoint
 */
interface Success {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

/**
 * Latest exchange rates as a key value pair
 *
 * @returns {Success['rates']}
 * @example { USD: 1, EUR: 2 }
 */
const latest = () =>
  client
    .get<Success>('/latest')
    .then(({ data: { rates, base } }) => ({ ...rates, [base]: 1 }));

export default latest;

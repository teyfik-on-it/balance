import client from './client';

interface Success {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

const latest = () =>
  client
    .get<Success>('/latest')
    .then(({ data: { rates, base } }) => ({ ...rates, [base]: 1 }));

export default latest;

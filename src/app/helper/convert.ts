import { store } from '../store';

const convert = (from: string, to: string, amount?: number): number => {
  const state = store.getState();
  const rates = state.rates.data;

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

  return +((amount * toRate) / fromRate);
};

export default convert;

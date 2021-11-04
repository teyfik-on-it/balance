import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';

interface Wallet {
  id: string;
  symbol: string;
  balance: number;
}

interface Exchange {
  from: Wallet;
  to: Wallet;
  amount: number;
  rate: number;
}

interface State {
  items: Wallet[];
}

const initialState: State = {
  items: [
    { id: 'USD', symbol: '$', balance: 200 },
    { id: 'EUR', symbol: '€', balance: 150 },
    { id: 'GBP', symbol: '£', balance: 10 },
  ],
};

const wallets = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    exchange: (state, action: PayloadAction<Exchange>) => {
      const { from, to, amount, rate } = action.payload;

      if (new BigNumber(from.balance).lt(amount)) {
        throw new Error('Insufficient balance');
      }

      state.items = state.items.map((wallet) => {
        if (wallet.id === from.id) {
          return {
            ...wallet,
            balance: new BigNumber(wallet.balance).minus(amount).toNumber(),
          };
        }

        if (wallet.id === to.id) {
          return {
            ...wallet,
            balance: new BigNumber(amount)
              .times(rate)
              .plus(wallet.balance)
              .toNumber(),
          };
        }

        return wallet;
      });
    },
  },
});

export type { Wallet };
export const { exchange } = wallets.actions;
export default wallets.reducer;

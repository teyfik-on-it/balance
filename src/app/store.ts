import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rates from './reducer/rates';
import wallets from './reducer/wallets';

export const store = configureStore({
  reducer: {
    rates,
    wallets,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

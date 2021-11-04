import find from 'lodash/find';
import { useCallback } from 'react';
import { useAppSelector } from '../hooks';
import { Wallet } from '../reducer/wallets';

const useFindWallet = () => {
  const wallets = useAppSelector((state) => state.wallets.items);

  return useCallback((id) => find(wallets, { id }) as Wallet, [wallets]);
};

export default useFindWallet;

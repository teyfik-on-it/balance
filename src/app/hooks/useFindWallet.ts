import find from 'lodash/find';
import { useCallback } from 'react';
import { useAppSelector } from '../hooks';
import { Wallet } from '../reducer/wallets';

/**
 * Returns a helper function for finding wallets by id
 *
 * @example
 * // returns USD wallet
 * findWallet('USD');
 */
const useFindWallet = () => {
  const wallets = useAppSelector((state) => state.wallets.items);

  return useCallback((id) => find(wallets, { id }) as Wallet, [wallets]);
};

export default useFindWallet;

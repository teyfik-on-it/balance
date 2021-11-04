import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { BsArrowLeftRight } from 'react-icons/bs';
import ButtonGroup from '../../cmp/ButtonGroup';
import ButtonGroupItem from '../../cmp/ButtonGroupItem';
import WalletInput from '../../cmp/WalletInput';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useConvert from '../../hooks/useConvert';
import useFindWallet from '../../hooks/useFindWallet';
import { exchange } from '../../reducer/wallets';
import './Exchange.scss';

/**
 * Gives functionality transferring balances
 * between wallets with current exchange rates
 * to the application
 */
const Exchange = () => {
  const wallets = useAppSelector((state) => map(state.wallets.items, 'id'));

  const convert = useConvert();
  const dispatch = useAppDispatch();
  const findWallet = useFindWallet();

  const [from, setFrom] = useState({ wallet: findWallet('USD'), value: 0 });
  const [to, setTo] = useState({ wallet: findWallet('EUR'), value: 0 });

  const [invalid, setInvalid] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => setPending(false), [wallets]);
  useEffect(() => {
    if (pending) {
      return;
    }

    setFrom({ wallet: findWallet(from.wallet.id), value: 0 });
    setTo({ wallet: findWallet(to.wallet.id), value: 0 });
  }, [findWallet, pending, from.wallet.id, to.wallet.id]);
  useEffect(() => setInvalid(from.value > from.wallet.balance), [from]);

  return (
    <div className={'exchange'}>
      <header>
        <h2 className={'flex mt-4 items-center justify-center text-blue-500'}>
          <span className={'text-3xl'}>{from.wallet.symbol}</span>
          <div className={'mx-4'}>
            <BsArrowLeftRight />
          </div>
          <span className={'text-3xl'}>{to.wallet.symbol}</span>
        </h2>
      </header>

      <main className={'mt-6 bg-indigo-50 p-4 rounded-lg shadow-md'}>
        <ButtonGroup
          value={from.wallet.id}
          onChange={(id) => setFrom({ ...from, wallet: findWallet(id) })}
        >
          {wallets.map((id) => (
            <ButtonGroupItem key={id} value={id} disabled={id === to.wallet.id}>
              {id}
            </ButtonGroupItem>
          ))}
        </ButtonGroup>

        <WalletInput
          wallet={from.wallet}
          value={from.value}
          onChange={(value) => {
            if (value === from.value) {
              return;
            }

            setFrom({ ...from, value });
            setTo({
              ...to,
              value: convert(from.wallet.id, to.wallet.id, value),
            });
          }}
          invalid={invalid}
          className={'mt-6'}
        />

        <WalletInput
          wallet={to.wallet}
          value={to.value}
          onChange={(value) => {
            if (value === to.value) {
              return;
            }

            setTo({ ...to, value });
            setFrom({
              ...from,
              value: convert(to.wallet.id, from.wallet.id, value),
            });
          }}
          className={'mt-4'}
        />

        <ButtonGroup
          value={to.wallet.id}
          onChange={(id) => setTo({ ...to, wallet: findWallet(id) })}
          className={'mt-4'}
        >
          {wallets.map((id) => (
            <ButtonGroupItem
              key={id}
              value={id}
              disabled={id === from.wallet.id}
            >
              {id}
            </ButtonGroupItem>
          ))}
        </ButtonGroup>
      </main>

      <footer className={'flex justify-end mt-6'}>
        <button
          className={
            'submit ' +
            (invalid ? 'invalid ' : '') +
            (invalid || pending ? 'disabled ' : '')
          }
          disabled={invalid || pending}
          onClick={() => {
            setPending(true);
            dispatch(
              exchange({
                from: from.wallet,
                to: to.wallet,
                amount: from.value,
                rate: convert(from.wallet.id, to.wallet.id),
              }),
            );
          }}
        >
          Exchange
        </button>
      </footer>
    </div>
  );
};

export default Exchange;

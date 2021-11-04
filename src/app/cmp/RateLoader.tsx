import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchRates } from '../reducer/rates';
import Loading from './Loading';

/**
 * Should be used as a parent by components
 * that is interacting with rates to be sure
 * that exchange rates are ready in the store
 */
const RateLoader = ({ children }: PropsWithChildren<{}>) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.rates.status);
  const error = useAppSelector((state) => state.rates.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRates());
    }
  }, [dispatch, status]);

  if (status === 'idle' || status === 'pending') {
    return (
      <section className={'mt-4 text-gray-700'}>
        <header>
          <h2 className={'text-2xl text-center'}>Please wait</h2>
        </header>

        <main className={'mt-2'}>
          <p className={'text-lg italic text-center'}>
            Loading current exchange rates from{' '}
            <a
              href={'https://exchangeratesapi.io'}
              rel={'noreferrer'}
              target={'_blank'}
              className={'text-blue-400 hover:underline'}
            >
              exchangeratesapi.io
            </a>
          </p>

          <Loading />
        </main>
      </section>
    );
  }

  if (status === 'failure') {
    return (
      <section className={'max-w-xs mt-4 text-gray-700'}>
        <header>
          <h2 className={'text-2xl'}>Well, this is embarrassing.</h2>
        </header>

        <main className={'mt-2'}>
          <p className={'mt-4'}>
            <span className={'font-serif text-blue-400'}>balance</span> or
            another service{' '}
            <span className={'font-serif text-blue-400'}>balance</span> depend's
            on is not available at the moment.
          </p>
          <p className={'mt-2'}>
            You can find more details about this issue in the following error
            message.
          </p>
          <p
            className={
              'font-mono text-sm py-2 px-4 mt-4 bg-gray-100 rounded-md shadow-md'
            }
          >
            {error}
          </p>
        </main>
      </section>
    );
  }

  return children as ReactElement;
};

export default RateLoader;

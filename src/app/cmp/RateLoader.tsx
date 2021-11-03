import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchRates } from '../reducer/rates';

const RateLoader = ({ children }: PropsWithChildren<{}>) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.rates.status);
  const error = useAppSelector((state) => state.rates.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRates());
    }
  }, [dispatch, status]);

  if (status === 'idle') {
    return <p>Idle</p>;
  }

  if (status === 'pending') {
    return <p>Loading rates</p>;
  }

  if (status === 'failure') {
    return <p>{error}</p>;
  }

  return children as ReactElement;
};

export default RateLoader;

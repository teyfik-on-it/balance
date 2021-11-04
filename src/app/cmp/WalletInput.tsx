import 'animate.css/source/attention_seekers/flash.css';
import 'animate.css/source/attention_seekers/shake.css';
import BigNumber from 'bignumber.js';
import { HTMLAttributes, useEffect, useState } from 'react';
import { Wallet } from '../reducer/wallets';
import NumberInput from './NumberInput';
import './WalletInput.scss';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  wallet: Wallet;
  invalid?: boolean;
}

const WalletInput = ({
  value,
  wallet,
  invalid,
  onChange,
  className,
  ...props
}: Props) => {
  const [shake, setShake] = useState<boolean>();
  const [highlight, setHighlight] = useState<boolean>();

  useEffect(() => setShake(invalid), [invalid]);
  useEffect(() => setHighlight(true), [wallet]);

  return (
    <div className={'wallet-input ' + (className ?? '')} {...props}>
      <NumberInput
        value={value}
        prefix={wallet.symbol}
        onChange={onChange}
        invalid={invalid}
      />

      <p
        className={
          'balance ' +
          (shake ? 'invalid animated shake ' : '') +
          (highlight ? 'animated flash ' : '')
        }
        onAnimationEnd={() => {
          setShake(false);
          setHighlight(false);
        }}
      >
        {wallet.symbol} {new BigNumber(wallet.balance).toFormat()}
      </p>
    </div>
  );
};

export default WalletInput;

import { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import './NumberInput.scss';

interface Props {
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  invalid?: boolean;
}

const NumberInput = ({ value, onChange, prefix, invalid }: Props) => {
  useEffect(() => console.log(prefix + ' value', value), [value, prefix]);

  return (
    <NumberFormat
      value={value}
      prefix={prefix + ' '}
      decimalScale={6}
      allowNegative={false}
      allowEmptyFormatting={false}
      allowLeadingZeros={false}
      decimalSeparator={','}
      thousandSeparator={'.'}
      fixedDecimalScale={false}
      onValueChange={({ floatValue }) => {
        if ('function' === typeof onChange && 'number' === typeof floatValue) {
          onChange(floatValue);
          console.log(prefix + ' floatValue', floatValue);
        }
      }}
      className={'number-input ' + (invalid ? 'invalid ' : '')}
    />
  );
};

export default NumberInput;

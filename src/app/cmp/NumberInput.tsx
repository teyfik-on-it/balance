import { useEffect } from 'react';
import NumberFormat from 'react-number-format';

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
      className={
        'block w-full px-4 py-2 ' +
        'text-2xl border ' +
        (invalid
          ? 'text-red-600 border-red-200 bg-red-100 '
          : 'text-gray-700 border-gray-100 ') +
        'shadow-md rounded-md ' +
        'transition-colors'
      }
    />
  );
};

export default NumberInput;

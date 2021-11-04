import NumberFormat from 'react-number-format';
import './NumberInput.scss';

interface Props {
  value: number;
  onChange: (value: number) => void;
  /**
   * Will be placed before numeric value in input
   */
  prefix?: string;
  /**
   * Can be provided for styling the input that indicates value's validity to user
   */
  invalid?: boolean;
}

/**
 * NumberFormat wrapper with project specific custom options
 * Can be used as same as an input with type "number"
 */
const NumberInput = ({ value, onChange, prefix, invalid }: Props) => (
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
      }
    }}
    className={'number-input ' + (invalid ? 'invalid ' : '')}
  />
);

export default NumberInput;

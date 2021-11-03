import {
  Children,
  cloneElement,
  KeyboardEvent,
  ReactElement,
  useCallback,
} from 'react';
import './ButtonGroup.scss';
import { ButtonGroupItemProps } from './ButtonGroupItem';

interface Props {
  value: string;
  children: ReactElement<ButtonGroupItemProps>[];
  onChange?: (value: string) => void;
}

const ButtonGroup = ({ value, children, onChange }: Props) => {
  const handle = useCallback(
    (item: ReactElement<ButtonGroupItemProps>) => {
      if (item.props.disabled) {
        return;
      }

      if ('function' === typeof onChange) {
        onChange(item.props.value);
      }
    },
    [onChange],
  );

  return (
    <ul className={'button-group'}>
      {Children.map(children, (item) =>
        cloneElement(item, {
          active: value === item.props.value,
          onClick: () => handle(item),
          onKeyPress: ({ key }: KeyboardEvent<HTMLLIElement>) =>
            (key === ' ' || key === 'Enter') && handle(item),
        }),
      )}
    </ul>
  );
};

export default ButtonGroup;

import {
  Children,
  cloneElement,
  HTMLAttributes,
  KeyboardEvent,
  ReactElement,
  useCallback,
} from 'react';
import './ButtonGroup.scss';
import { ButtonGroupItemProps } from './ButtonGroupItem';

interface Props extends Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> {
  value: string;
  children: ReactElement<ButtonGroupItemProps>[];
  onChange?: (value: string) => void;
}

const ButtonGroup = ({
  value,
  children,
  onChange,
  className,
  ...props
}: Props) => {
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
    <ul className={'button-group ' + (className ?? '')} {...props}>
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

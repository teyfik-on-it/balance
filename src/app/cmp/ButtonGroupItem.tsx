import React, { LiHTMLAttributes, PropsWithChildren } from 'react';

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  value: string;
  active?: boolean;
  disabled?: boolean;
}

const ButtonGroupItem = ({ active, disabled, ...props }: PropsWithChildren<Props>) => (
  <li
    {...props}
    tabIndex={disabled ? -1 : 0}
    className={
      'button-group-item' +
      (disabled ? ' disabled' : '') +
      (active ? ' active' : '')
    }
  />
);

export type { Props as ButtonGroupItemProps };
export default ButtonGroupItem;

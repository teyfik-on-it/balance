import React, { LiHTMLAttributes, PropsWithChildren } from 'react';

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  /**
   * Should be unique for every button group
   */
  value: string;
  /**
   * Current state for button which should not be given manually
   * ButtonGroup component will be manipulating this prop
   */
  active?: boolean;
  disabled?: boolean;
}

/**
 * Must be used as a child of ButtonGroup component
 */
const ButtonGroupItem = ({
  active,
  disabled,
  ...props
}: PropsWithChildren<Props>) => (
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

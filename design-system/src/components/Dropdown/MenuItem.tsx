import React from 'react';
import { useDropdownContext } from './DropdownMenu';
import styles from './Dropdown.module.css';

export interface MenuItemProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  disabled = false,
  danger = false,
  icon,
  className = '',
}) => {
  const { closeMenu } = useDropdownContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(event);
    closeMenu();
  };

  const itemClasses = [
    styles.menuItem,
    danger ? styles.danger : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      aria-disabled={disabled}
      className={itemClasses}
      onClick={handleClick}
    >
      {icon && <span className={styles.menuItemIcon}>{icon}</span>}
      <span className={styles.menuItemContent}>{children}</span>
    </button>
  );
};

export default MenuItem;

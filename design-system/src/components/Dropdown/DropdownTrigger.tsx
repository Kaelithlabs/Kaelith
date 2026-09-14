import React from 'react';
import { useDropdownContext } from './DropdownMenu';
import styles from './Dropdown.module.css';

export interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  className = '',
  disabled = false,
  asChild = false,
}) => {
  const { isOpen, toggleOpen, openMenu, triggerId, menuId, triggerRef } = useDropdownContext();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMenu();
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    if (disabled) return;
    event.preventDefault();
    toggleOpen();
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<Record<string, unknown>>;
    return React.cloneElement(child, {
      ref: triggerRef,
      id: triggerId,
      'aria-haspopup': 'menu',
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? menuId : undefined,
      onClick: (e: React.MouseEvent) => {
        handleClick(e);
        if (typeof child.props.onClick === 'function') {
          (child.props.onClick as (e: React.MouseEvent) => void)(e);
        }
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        handleKeyDown(e);
        if (typeof child.props.onKeyDown === 'function') {
          (child.props.onKeyDown as (e: React.KeyboardEvent) => void)(e);
        }
      },
    });
  }

  const triggerClasses = [styles.triggerButton, className].filter(Boolean).join(' ');

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      id={triggerId}
      type="button"
      className={triggerClasses}
      disabled={disabled}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={isOpen ? menuId : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
};

export default DropdownTrigger;

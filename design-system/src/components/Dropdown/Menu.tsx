import React, { useEffect } from 'react';
import { useDropdownContext } from './DropdownMenu';
import styles from './Dropdown.module.css';

export interface MenuProps {
  children: React.ReactNode;
  align?: 'start' | 'end' | 'center';
  position?: 'top' | 'bottom';
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  align = 'start',
  position = 'bottom',
  className = '',
}) => {
  const { isOpen, menuId, triggerId, menuRef, closeMenu, triggerRef } = useDropdownContext();

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const items = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled]):not([aria-disabled="true"])')
      );
      if (items.length > 0) {
        items[0].focus();
      } else {
        menuRef.current.focus();
      }
    }
  }, [isOpen, menuRef]);

  if (!isOpen) return null;

  const alignClass =
    align === 'end'
      ? styles.alignEnd
      : align === 'center'
      ? styles.alignCenter
      : styles.alignStart;

  const positionClass = position === 'top' ? styles.positionTop : styles.positionBottom;

  const menuClasses = [styles.menu, alignClass, positionClass, className].filter(Boolean).join(' ');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!menuRef.current) return;

    const items = Array.from(
      menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled]):not([aria-disabled="true"])')
    );

    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = currentIndex === -1 || currentIndex === items.length - 1 ? 0 : currentIndex + 1;
      items[nextIndex]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
      items[prevIndex]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      items[items.length - 1]?.focus();
    } else if (event.key === 'Tab') {
      closeMenu();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
      triggerRef.current?.focus();
    }
  };

  return (
    <div
      ref={menuRef}
      id={menuId}
      role="menu"
      tabIndex={-1}
      aria-labelledby={triggerId}
      aria-orientation="vertical"
      className={menuClasses}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

export default Menu;

import React, { createContext, useContext, useState, useRef, useEffect, useId } from 'react';
import styles from './Dropdown.module.css';
import { DropdownTrigger } from './DropdownTrigger';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import { MenuSeparator } from './MenuSeparator';

export interface DropdownContextValue {
  isOpen: boolean;
  toggleOpen: () => void;
  closeMenu: () => void;
  openMenu: () => void;
  triggerId: string;
  menuId: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export const useDropdownContext = (): DropdownContextValue => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a DropdownMenu');
  }
  return context;
};

export interface DropdownMenuProps {
  children: React.ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const DropdownMenuComponent: React.FC<DropdownMenuProps> = ({
  children,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  className = '',
}) => {
  const isControlled = controlledIsOpen !== undefined;
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const generatedId = useId();
  const triggerId = `dropdown-trigger-${generatedId}`;
  const menuId = `dropdown-menu-${generatedId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledIsOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const toggleOpen = () => handleOpenChange(!isOpen);
  const closeMenu = () => handleOpenChange(false);
  const openMenu = () => handleOpenChange(true);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        closeMenu();
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const containerClasses = [styles.dropdownContainer, className].filter(Boolean).join(' ');

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        toggleOpen,
        closeMenu,
        openMenu,
        triggerId,
        menuId,
        triggerRef,
        menuRef,
      }}
    >
      <div ref={containerRef} className={containerClasses}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownMenu = Object.assign(DropdownMenuComponent, {
  Trigger: DropdownTrigger,
  Menu: Menu,
  Item: MenuItem,
  Separator: MenuSeparator,
});

export default DropdownMenu;

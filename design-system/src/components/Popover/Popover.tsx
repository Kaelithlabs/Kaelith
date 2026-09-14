import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './Popover.module.css';

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = 'bottom',
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  className = '',
  contentClassName = '',
  closeOnOutsideClick = true,
  closeOnEsc = true,
}) => {
  const isControlled = controlledIsOpen !== undefined;
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);
  const openState = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const generatedId = useId();
  const popoverId = `popover-${generatedId}`;
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledIsOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const togglePopover = () => {
    handleOpenChange(!openState);
  };

  useEffect(() => {
    if (!openState || !closeOnOutsideClick) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [openState, closeOnOutsideClick]);

  useEffect(() => {
    if (!openState || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        handleOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openState, closeOnEsc]);

  const positionClass = styles[position] || styles.bottom;

  const containerClasses = [styles.popoverContainer, className].filter(Boolean).join(' ');
  const contentClasses = [styles.popoverContent, positionClass, contentClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={containerClasses}>
      <div
        className={styles.triggerWrapper}
        onClick={togglePopover}
        aria-haspopup="dialog"
        aria-expanded={openState}
        aria-controls={openState ? popoverId : undefined}
      >
        {trigger}
      </div>

      {openState && (
        <div
          id={popoverId}
          role="dialog"
          aria-modal="false"
          className={contentClasses}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;

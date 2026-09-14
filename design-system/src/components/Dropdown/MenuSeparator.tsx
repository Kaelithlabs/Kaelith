import React from 'react';
import styles from './Dropdown.module.css';

export interface MenuSeparatorProps {
  className?: string;
}

export const MenuSeparator: React.FC<MenuSeparatorProps> = ({ className = '' }) => {
  const separatorClasses = [styles.menuSeparator, className].filter(Boolean).join(' ');

  return <div role="separator" aria-orientation="horizontal" className={separatorClasses} />;
};

export default MenuSeparator;

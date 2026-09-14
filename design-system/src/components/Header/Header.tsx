import React from 'react';
import { Button } from '../Button';
import styles from './Header.module.css';

export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface HeaderProps {
  brandTitle?: string;
  navItems?: NavItem[];
  actionLabel?: string;
  onActionClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC<HeaderProps> = ({
  brandTitle = 'Kaelith',
  navItems = DEFAULT_NAV_ITEMS,
  actionLabel = 'Contact Us',
  onActionClick,
  className = '',
  children,
}) => {
  const classes = [styles.header, className].filter(Boolean).join(' ');

  return (
    <header className={classes}>
      <div className={styles.brand}>{brandTitle}</div>

      {children ? (
        children
      ) : (
        <>
          {navItems && navItems.length > 0 && (
            <nav className={styles.nav}>
              {navItems.map((item, index) => (
                <a
                  key={`${item.label}-${index}`}
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={styles.navItem}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {actionLabel && (
            <div className={styles.action}>
              <Button variant="primary" onClick={onActionClick}>
                {actionLabel}
              </Button>
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;

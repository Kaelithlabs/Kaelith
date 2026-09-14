import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?: 'default' | 'accent';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
}) => {
  const classes = [
    styles.badge,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
};

export default Badge;

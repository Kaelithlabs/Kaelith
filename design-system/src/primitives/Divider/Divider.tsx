import React from 'react';
import styles from './Divider.module.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  margin,
  className = '',
  style,
}) => {
  const classes = [
    styles.divider,
    styles[orientation],
    margin ? styles[`margin-${margin}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <hr
      className={classes}
      style={style}
      aria-orientation={orientation}
    />
  );
};

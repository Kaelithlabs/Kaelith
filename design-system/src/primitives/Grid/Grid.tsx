import React from 'react';
import styles from './Grid.module.css';

export interface GridColumnsResponsive {
  sm?: number;
  md?: number;
  lg?: number;
}

export interface GridProps {
  as?: React.ElementType;
  columns?: number | GridColumnsResponsive;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Grid: React.FC<GridProps> = ({
  as: Component = 'div',
  columns,
  gap,
  className = '',
  children,
  style,
}) => {
  const customStyles: Record<string, string | number> = {};

  if (typeof columns === 'number') {
    customStyles['--grid-cols-base'] = columns;
  } else if (typeof columns === 'object' && columns !== null) {
    if (columns.sm !== undefined) {
      customStyles['--grid-cols-sm'] = columns.sm;
    }
    if (columns.md !== undefined) {
      customStyles['--grid-cols-md'] = columns.md;
    }
    if (columns.lg !== undefined) {
      customStyles['--grid-cols-lg'] = columns.lg;
    }
  }

  const combinedStyle = {
    ...customStyles,
    ...style,
  } as React.CSSProperties;

  const classes = [
    styles.grid,
    gap ? styles[`gap-${gap}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} style={combinedStyle}>
      {children}
    </Component>
  );
};

import React from 'react';
import styles from './Stack.module.css';

export interface StackProps {
  as?: React.ElementType;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Stack: React.FC<StackProps> = ({
  as: Component = 'div',
  gap,
  align,
  justify,
  className = '',
  children,
  style,
}) => {
  const classes = [
    styles.stack,
    gap ? styles[`gap-${gap}`] : '',
    align ? styles[`align-${align}`] : '',
    justify ? styles[`justify-${justify}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} style={style}>
      {children}
    </Component>
  );
};

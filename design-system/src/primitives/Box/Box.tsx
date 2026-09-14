import React from 'react';
import styles from './Box.module.css';

export interface BoxProps {
  as?: React.ElementType;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: 'app' | 'surface' | 'elevated' | 'muted';
  border?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Box: React.FC<BoxProps> = ({
  as: Component = 'div',
  padding,
  margin,
  radius,
  background,
  border = false,
  className = '',
  children,
  style,
}) => {
  const classes = [
    styles.box,
    padding ? styles[`padding-${padding}`] : '',
    margin ? styles[`margin-${margin}`] : '',
    radius ? styles[`radius-${radius}`] : '',
    background ? styles[`bg-${background}`] : '',
    border ? styles.border : '',
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

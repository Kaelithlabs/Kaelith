import React from 'react';
import styles from './Heading.module.css';

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  variant?: 'display' | 'heading';
  color?: 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h2',
  variant = 'heading',
  color = 'primary',
  className = '',
  children,
  style,
}) => {
  const classes = [
    styles.heading,
    variant ? styles[`variant-${variant}`] : '',
    color ? styles[`color-${color}`] : '',
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

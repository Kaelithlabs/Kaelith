import React from 'react';
import styles from './Text.module.css';

export interface TextProps {
  as?: React.ElementType;
  variant?: 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'muted';
  weight?: 'medium' | 'semibold' | 'bold';
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant = 'body',
  color = 'primary',
  weight,
  className = '',
  children,
  style,
}) => {
  const classes = [
    styles.text,
    variant ? styles[`variant-${variant}`] : '',
    color ? styles[`color-${color}`] : '',
    weight ? styles[`weight-${weight}`] : '',
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

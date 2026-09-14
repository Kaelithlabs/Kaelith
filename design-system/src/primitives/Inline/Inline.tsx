import React from 'react';
import styles from './Inline.module.css';

export interface InlineProps {
  as?: React.ElementType;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Inline: React.FC<InlineProps> = ({
  as: Component = 'div',
  gap,
  align,
  justify,
  wrap = false,
  className = '',
  children,
  style,
}) => {
  const classes = [
    styles.inline,
    wrap ? styles.wrap : '',
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

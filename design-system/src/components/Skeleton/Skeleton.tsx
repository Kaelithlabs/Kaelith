import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animated?: boolean;
  className?: string;
}

const getDimension = (val?: string | number): string | undefined => {
  if (val === undefined) return undefined;
  return typeof val === 'number' ? `${val}px` : val;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animated = true,
  className = '',
}) => {
  const classes = [
    styles.skeleton,
    styles[variant],
    animated ? styles.animated : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {
    width: getDimension(width),
    height: getDimension(height),
  };

  return <div className={classes} style={style} aria-hidden="true" />;
};

export default Skeleton;

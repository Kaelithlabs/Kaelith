import React from 'react';
import styles from './Progress.module.css';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  showValue?: boolean;
  size?: ProgressSize;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'default',
  showValue = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const safeMax = max > 0 ? max : 100;
  const percentage = Math.min(100, Math.max(0, (value / safeMax) * 100));

  const sizeClass = styles[size] || styles.md;
  const variantClass = styles[variant] || styles.default;

  const containerClasses = [styles.container, className].filter(Boolean).join(' ');
  const trackClasses = [styles.track, sizeClass].filter(Boolean).join(' ');
  const fillClasses = [styles.fill, variantClass].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {showValue && (
        <div className={styles.header}>
          <span className={styles.valueText}>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={trackClasses}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={safeMax}
      >
        <div
          className={fillClasses}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;

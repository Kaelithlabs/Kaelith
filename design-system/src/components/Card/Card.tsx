import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface CardInfoProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export interface CardMetricProps {
  label: string;
  value: string | number;
  children?: React.ReactNode;
  className?: string;
}

export const CardInfo: React.FC<CardInfoProps> = ({
  icon,
  title,
  description,
  children,
  className = '',
}) => {
  const classes = [styles.info, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className={styles.infoHead}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  );
};

export const CardMetric: React.FC<CardMetricProps> = ({
  label,
  value,
  children,
  className = '',
}) => {
  const classes = [styles.metric, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <span className={styles.metricLabel}>{label}</span>
      <span className={styles.metricValue}>{value}</span>
      {children}
    </div>
  );
};

export interface CardComponent extends React.FC<CardProps> {
  Info: React.FC<CardInfoProps>;
  Metric: React.FC<CardMetricProps>;
}

export const Card: CardComponent = Object.assign(
  ({ children, className = '', ...props }: CardProps) => {
    const classes = [styles.card, className].filter(Boolean).join(' ');
    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  },
  {
    Info: CardInfo,
    Metric: CardMetric,
  }
);

export default Card;

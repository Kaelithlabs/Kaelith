import React from 'react';
import styles from './Table.module.css';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
}

export const Table: React.FC<TableProps> = ({
  striped = false,
  hoverable = false,
  className = '',
  ...props
}) => {
  const classes = [
    styles.table,
    striped ? styles.striped : '',
    hoverable ? styles.hoverable : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      <table className={classes} {...props} />
    </div>
  );
};

export const Thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className = '',
  ...props
}) => <thead className={[styles.head, className].filter(Boolean).join(' ')} {...props} />;

export const Tbody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className = '',
  ...props
}) => <tbody className={className} {...props} />;

export const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className = '',
  ...props
}) => <tr className={className} {...props} />;

export const Th: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  className = '',
  ...props
}) => <th className={[styles.cell, styles.headerCell, className].filter(Boolean).join(' ')} {...props} />;

export const Td: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className = '',
  ...props
}) => <td className={[styles.cell, className].filter(Boolean).join(' ')} {...props} />;

export default Table;
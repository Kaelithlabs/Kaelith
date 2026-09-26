import React from 'react';
import styles from './Pagination.module.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  'aria-label'?: string;
}

type PageItem = number | 'ellipsis-start' | 'ellipsis-end';

const getPageItems = (currentPage: number, totalPages: number, siblingCount: number): PageItem[] => {
  if (totalPages <= 0) return [];

  const totalNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const firstSibling = Math.max(currentPage - siblingCount, 1);
  const lastSibling = Math.min(currentPage + siblingCount, totalPages);
  const showStartEllipsis = firstSibling > 2;
  const showEndEllipsis = lastSibling < totalPages - 1;

  if (!showStartEllipsis && showEndEllipsis) {
    return [
      ...Array.from({ length: totalNumbers - 2 }, (_, index) => index + 1),
      'ellipsis-end',
      totalPages,
    ];
  }

  if (showStartEllipsis && !showEndEllipsis) {
    return [
      1,
      'ellipsis-start',
      ...Array.from({ length: totalNumbers - 2 }, (_, index) => totalPages - totalNumbers + 3 + index),
    ];
  }

  return [
    1,
    'ellipsis-start',
    ...Array.from({ length: lastSibling - firstSibling + 1 }, (_, index) => firstSibling + index),
    'ellipsis-end',
    totalPages,
  ];
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
  'aria-label': ariaLabel = 'Pagination',
}) => {
  const pageCount = Math.max(0, Math.floor(totalPages));
  const page = Math.min(pageCount, Math.max(1, Math.floor(currentPage)));
  const siblings = Math.max(0, Math.floor(siblingCount));
  const items = getPageItems(page, pageCount, siblings);
  const classes = [styles.pagination, className].filter(Boolean).join(' ');

  if (pageCount <= 1) return null;

  return (
    <nav aria-label={ariaLabel} className={classes}>
      <button
        type="button"
        className={styles.control}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Go to previous page"
      >
        Previous
      </button>
      <ul className={styles.pages}>
        {items.map((item) => (
          <li key={item}>
            {typeof item === 'number' ? (
              <button
                type="button"
                className={`${styles.page} ${item === page ? styles.current : ''}`}
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Go to page ${item}`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ) : (
              <span className={styles.ellipsis} aria-hidden="true">...</span>
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={styles.control}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
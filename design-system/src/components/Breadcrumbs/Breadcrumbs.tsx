import React from 'react';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  href?: string;
  active?: boolean;
  children: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  children,
  className = '',
  ...props
}) => {
  const items = React.Children.toArray(children);
  const classes = [styles.breadcrumbs, className].filter(Boolean).join(' ');

  return (
    <nav aria-label="Breadcrumb" className={classes} {...props}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <React.Fragment key={React.isValidElement(item) ? item.key ?? index : index}>
            {item}
            {index < items.length - 1 && (
              <li className={styles.separator} aria-hidden="true">/</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,
  active = false,
  children,
  className = '',
  ...props
}) => {
  const classes = [styles.item, active ? styles.active : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <li className={classes} aria-current={active ? 'page' : undefined} {...props}>
      {href && !active ? <a href={href}>{children}</a> : <span>{children}</span>}
    </li>
  );
};

export default Breadcrumbs;
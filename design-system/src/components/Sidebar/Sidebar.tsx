import React, { createContext, useContext } from 'react';
import styles from './Sidebar.module.css';

interface SidebarContextValue {
  collapsed: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({ collapsed: false });

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  onToggle?: () => void;
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export interface SidebarItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
  badge?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggle,
  className = '',
  children,
  ...props
}) => {
  const classes = [styles.sidebar, collapsed ? styles.collapsed : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <aside className={classes} aria-label="Sidebar" {...props}>
        {onToggle && (
          <button
            type="button"
            className={styles.toggle}
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
          >
            <span aria-hidden="true">{collapsed ? '>' : '<'}</span>
          </button>
        )}
        {children}
      </aside>
    </SidebarContext.Provider>
  );
};

export const SidebarNav: React.FC<SidebarNavProps> = ({
  children,
  className = '',
  ...props
}) => {
  const classes = [styles.nav, className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label="Primary navigation" {...props}>
      <ul className={styles.list}>{children}</ul>
    </nav>
  );
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
  href = '#',
  badge,
  className = '',
  ...props
}) => {
  const { collapsed } = useContext(SidebarContext);
  const itemClasses = [styles.item, className].filter(Boolean).join(' ');
  const linkClasses = [styles.link, active ? styles.active : ''].filter(Boolean).join(' ');

  return (
    <li className={itemClasses} {...props}>
      <a
        className={linkClasses}
        href={href}
        aria-current={active ? 'page' : undefined}
        aria-label={collapsed ? label : undefined}
        title={collapsed ? label : undefined}
      >
        {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
        {!collapsed && <span className={styles.label}>{label}</span>}
        {!collapsed && badge != null && <span className={styles.badge}>{badge}</span>}
      </a>
    </li>
  );
};

export default Sidebar;
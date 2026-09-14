import React, { createContext, useContext, useState, useId, useRef } from 'react';
import styles from './Tabs.module.css';

export interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabs = (): TabsContextValue => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a Tabs parent component');
  }
  return context;
};

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export interface TabListProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export interface TabProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsComponent: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onChange,
  children,
  className = '',
}) => {
  const generatedId = useId();
  const baseId = `tabs-${generatedId}`;

  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');

  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalValue;

  const setActiveTab = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const containerClasses = [styles.tabs, className].filter(Boolean).join(' ');

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, baseId }}>
      <div className={containerClasses}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<TabListProps> = ({
  children,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const listElement = listRef.current;
    if (!listElement) return;

    const tabs = Array.from(
      listElement.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
    );
    if (tabs.length === 0) return;

    const activeElement = document.activeElement as HTMLButtonElement | null;
    const currentIndex = tabs.findIndex((tab) => tab === activeElement);

    if (currentIndex === -1) return;

    let targetIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        targetIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    if (targetIndex !== -1) {
      const targetTab = tabs[targetIndex];
      targetTab.focus();
      targetTab.click();
    }
  };

  const listClasses = [styles.tabList, className].filter(Boolean).join(' ');

  return (
    <div
      ref={listRef}
      className={listClasses}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({
  value,
  disabled = false,
  children,
  className = '',
}) => {
  const { activeTab, setActiveTab, baseId } = useTabs();
  const isSelected = activeTab === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  const tabClasses = [
    styles.tab,
    isSelected ? styles.tabSelected : '',
    disabled ? styles.tabDisabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      className={tabClasses}
      onClick={() => {
        if (!disabled) {
          setActiveTab(value);
        }
      }}
    >
      {children}
    </button>
  );
};

export const TabPanel: React.FC<TabPanelProps> = ({
  value,
  children,
  className = '',
}) => {
  const { activeTab, baseId } = useTabs();
  const isSelected = activeTab === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  const panelClasses = [styles.tabPanel, className].filter(Boolean).join(' ');

  if (!isSelected) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={panelClasses}
    >
      {children}
    </div>
  );
};

export type TabsComponentType = React.FC<TabsProps> & {
  TabList: typeof TabList;
  Tab: typeof Tab;
  TabPanel: typeof TabPanel;
};

export const Tabs = TabsComponent as TabsComponentType;
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;

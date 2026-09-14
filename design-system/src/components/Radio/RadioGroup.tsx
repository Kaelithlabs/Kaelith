import React, { createContext, useContext, useId } from 'react';
import styles from './Radio.module.css';

export interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

export const useRadioGroup = (): RadioGroupContextValue | undefined => useContext(RadioGroupContext);

export interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  direction?: 'row' | 'column';
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  name,
  label,
  error,
  disabled = false,
  direction = 'column',
  children,
  className = '',
}) => {
  const generatedId = useId();
  const groupName = name || `radio-group-${generatedId}`;
  const errorId = error ? `${generatedId}-error` : undefined;

  const containerClasses = [
    styles.groupContainer,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const optionsClasses = [
    styles.groupOptions,
    direction === 'row' ? styles.directionRow : styles.directionColumn,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <RadioGroupContext.Provider value={{ value, onChange, name: groupName, disabled }}>
      <div className={containerClasses} role="radiogroup" aria-describedby={errorId}>
        {label && <span className={styles.groupLabel}>{label}</span>}
        <div className={optionsClasses}>{children}</div>
        {error && (
          <span id={errorId} className={styles.errorMessage} role="alert">
            {error}
          </span>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;

import React, { useId } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  id,
  className = '',
}) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.checked);
  };

  const containerClasses = [
    styles.container,
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const boxClasses = [
    styles.box,
    checked ? styles.checked : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={checkboxId} className={containerClasses}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.nativeInput}
      />
      <span className={boxClasses}>
        {checked && (
          <svg
            className={styles.icon}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
          </svg>
        )}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;

import React, { useId } from 'react';
import styles from './Switch.module.css';

export interface SwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  id,
  className = '',
}) => {
  const generatedId = useId();
  const switchId = id || generatedId;

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

  const trackClasses = [
    styles.track,
    checked ? styles.checked : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={switchId} className={containerClasses}>
      <input
        type="checkbox"
        role="switch"
        id={switchId}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.nativeInput}
      />
      <span className={trackClasses}>
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Switch;

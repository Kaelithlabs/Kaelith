import React, { useId } from 'react';
import { useRadioGroup } from './RadioGroup';
import styles from './Radio.module.css';

export interface RadioProps {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Radio: React.FC<RadioProps> = ({
  value,
  label,
  disabled = false,
  id,
  className = '',
  children,
}) => {
  const group = useRadioGroup();
  const generatedId = useId();
  const radioId = id || generatedId;

  const isChecked = group?.value === value;
  const isDisabled = disabled || group?.disabled || false;
  const name = group?.name;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    if (e.target.checked && group?.onChange) {
      group.onChange(value);
    }
  };

  const containerClasses = [
    styles.radioContainer,
    isDisabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const circleClasses = [
    styles.radioCircle,
    isChecked ? styles.checked : '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelContent = label || children;

  return (
    <label htmlFor={radioId} className={containerClasses}>
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
        className={styles.nativeInput}
      />
      <span className={circleClasses}>
        <span className={styles.innerDot} />
      </span>
      {labelContent && <span className={styles.radioLabel}>{labelContent}</span>}
    </label>
  );
};

export default Radio;

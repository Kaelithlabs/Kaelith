import React, { useState, useEffect } from 'react';
import styles from './Avatar.module.css';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'square';
  className?: string;
  alt?: string;
}

export const getInitials = (name?: string): string => {
  if (!name) return '';
  const trimmed = name.trim();
  if (!trimmed) return '';

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  const first = parts[0][0] || '';
  const last = parts[parts.length - 1][0] || '';
  return (first + last).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  variant = 'circle',
  className = '',
  alt,
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const initials = getInitials(name);
  const ariaLabel = alt || name || 'Avatar';

  const sizeClass = styles[size] || styles.md;
  const variantClass = styles[variant] || styles.circle;

  const containerClasses = [
    styles.avatar,
    sizeClass,
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showImage = Boolean(src) && !imageError;

  return (
    <div
      className={containerClasses}
      role="img"
      aria-label={ariaLabel}
    >
      {showImage ? (
        <img
          src={src}
          alt={ariaLabel}
          className={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className={styles.fallback}>
          {initials ? initials : (
            <svg
              className={styles.defaultIcon}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </span>
      )}
    </div>
  );
};

export default Avatar;

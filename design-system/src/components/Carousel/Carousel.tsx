import React, { useState, useMemo } from 'react';
import { Card } from '../Card';
import styles from './Carousel.module.css';

export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export interface CarouselProps {
  items?: CarouselItem[];
  children?: React.ReactNode;
  variant?: 'single' | 'peek' | 'multi';
  defaultActiveIndex?: number;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  className?: string;
  ariaLabel?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  children,
  variant = 'single',
  defaultActiveIndex = 0,
  activeIndex,
  onActiveIndexChange,
  className = '',
  ariaLabel = 'Carousel',
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);

  const slideElements = useMemo(() => {
    if (items && items.length > 0) {
      return items.map((item) => (
        <Card key={item.id}>
          <Card.Info
            icon={item.icon}
            title={item.title}
            description={item.subtitle}
          />
        </Card>
      ));
    }
    return React.Children.toArray(children);
  }, [items, children]);

  const totalSlides = slideElements.length;
  const visibleSlides = variant === 'multi' ? 2 : 1;
  const slideWidth = variant === 'peek' ? 78 : variant === 'multi' ? 50 : 100;
  const maxIndex = Math.max(0, totalSlides - visibleSlides);
  const isControlled = activeIndex !== undefined;
  const rawCurrentIndex = isControlled ? activeIndex : internalIndex;
  const currentIndex =
    totalSlides > 0
      ? Math.min(Math.max(0, rawCurrentIndex), maxIndex)
      : 0;

  const handleSelect = (index: number) => {
    if (totalSlides === 0) return;
    const newIndex = (index + maxIndex + 1) % (maxIndex + 1);
    if (!isControlled) {
      setInternalIndex(newIndex);
    }
    onActiveIndexChange?.(newIndex);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (totalSlides <= 1) return;

    if (event.key === 'ArrowLeft' || event.key === 'Left') {
      event.preventDefault();
      handleSelect(currentIndex - 1);
    } else if (event.key === 'ArrowRight' || event.key === 'Right') {
      event.preventDefault();
      handleSelect(currentIndex + 1);
    }
  };

  const containerClasses = [styles.carousel, className].filter(Boolean).join(' ');
  const variantClasses = [containerClasses, styles[variant]].filter(Boolean).join(' ');
  const pageCount = maxIndex + 1;
  const peekOffset = variant === 'peek' ? 11 : 0;
  const transformPercent =
    ((currentIndex * slideWidth - peekOffset) / (totalSlides * slideWidth)) * 100;

  if (totalSlides === 0) {
    return null;
  }

  return (
    <div
      className={variantClasses}
      tabIndex={0}
      role="region"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            width: `${totalSlides * slideWidth}%`,
            transform: `translateX(-${transformPercent}%)`,
          }}
        >
          {slideElements.map((slide, idx) => {
            const isHidden = idx < currentIndex || idx >= currentIndex + visibleSlides;

            return (
              <div
                key={idx}
                className={styles.slide}
                style={{ flexBasis: `${100 / totalSlides}%` }}
                aria-hidden={isHidden}
                inert={isHidden}
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>

      {totalSlides > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous slides"
            onClick={() => handleSelect(currentIndex - 1)}
          >
            Previous
          </button>
          <div className={styles.dots} role="group" aria-label="Carousel pagination">
          {Array.from({ length: pageCount }, (_, idx) => {
            const isActive = idx === currentIndex;
            const dotClasses = [
              styles.dot,
              isActive ? styles.dotActive : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={idx}
                type="button"
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Go to slide group ${idx + 1} of ${pageCount}`}
                className={dotClasses}
                onClick={() => handleSelect(idx)}
              />
            );
          })}
          </div>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next slides"
            onClick={() => handleSelect(currentIndex + 1)}
          >
            Next
          </button>
          <span className={styles.count} aria-live="polite">
            {String(currentIndex + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
};

export default Carousel;

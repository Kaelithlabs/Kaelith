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
  defaultActiveIndex?: number;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  className?: string;
  ariaLabel?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  children,
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
  const isControlled = activeIndex !== undefined;
  const rawCurrentIndex = isControlled ? activeIndex : internalIndex;
  const currentIndex =
    totalSlides > 0
      ? Math.min(Math.max(0, rawCurrentIndex), totalSlides - 1)
      : 0;

  const handleSelect = (index: number) => {
    if (totalSlides === 0) return;
    const newIndex = (index + totalSlides) % totalSlides;
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

  if (totalSlides === 0) {
    return null;
  }

  return (
    <div
      className={containerClasses}
      tabIndex={0}
      role="region"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slideElements.map((slide, idx) => (
            <div key={idx} className={styles.slide} aria-hidden={idx !== currentIndex}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Carousel pagination">
          {slideElements.map((_, idx) => {
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
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${idx + 1} of ${totalSlides}`}
                className={dotClasses}
                onClick={() => handleSelect(idx)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Carousel;

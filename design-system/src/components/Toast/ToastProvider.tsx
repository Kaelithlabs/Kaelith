import React, { createContext, useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import type { ToastVariant } from './Toast';
import styles from './Toast.module.css';

export type ToastPosition =
  | 'top-right'
  | 'bottom-right'
  | 'top-left'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastOptions {
  title?: string;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  position: ToastPosition;
  addToast: (options: ToastOptions | string) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  info: (message: React.ReactNode, options?: Omit<ToastOptions, 'variant' | 'description'>) => string;
  success: (message: React.ReactNode, options?: Omit<ToastOptions, 'variant' | 'description'>) => string;
  warning: (message: React.ReactNode, options?: Omit<ToastOptions, 'variant' | 'description'>) => string;
  danger: (message: React.ReactNode, options?: Omit<ToastOptions, 'variant' | 'description'>) => string;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  duration?: number;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let toastIdCounter = 0;

const positionClassMap: Record<ToastPosition, string> = {
  'top-right': styles.topRight,
  'bottom-right': styles.bottomRight,
  'top-left': styles.topLeft,
  'bottom-left': styles.bottomLeft,
  'top-center': styles.topCenter,
  'bottom-center': styles.bottomCenter,
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  duration: defaultDuration = 5000,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const addToast = useCallback(
    (options: ToastOptions | string): string => {
      toastIdCounter += 1;
      const id = `toast-${Date.now()}-${toastIdCounter}`;
      const normalizedOptions: ToastOptions =
        typeof options === 'string' ? { description: options } : options;

      const itemDuration = normalizedOptions.duration ?? defaultDuration;

      const newItem: ToastItem = {
        id,
        variant: normalizedOptions.variant ?? 'info',
        title: normalizedOptions.title,
        description: normalizedOptions.description,
        duration: itemDuration,
      };

      setToasts((prev) => [...prev, newItem]);

      if (itemDuration > 0 && Number.isFinite(itemDuration)) {
        const timer = setTimeout(() => {
          removeToast(id);
        }, itemDuration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [defaultDuration, removeToast]
  );

  const info = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'variant' | 'description'>) => {
      return addToast({ ...options, description: message, variant: 'info' });
    },
    [addToast]
  );

  const success = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'variant' | 'description'>) => {
      return addToast({ ...options, description: message, variant: 'success' });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'variant' | 'description'>) => {
      return addToast({ ...options, description: message, variant: 'warning' });
    },
    [addToast]
  );

  const danger = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'variant' | 'description'>) => {
      return addToast({ ...options, description: message, variant: 'danger' });
    },
    [addToast]
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const positionClass = positionClassMap[position] || styles.topRight;
  const containerClasses = [styles.container, positionClass].filter(Boolean).join(' ');

  const toastListContent = (
    <div className={containerClasses} data-testid="toast-container">
      {toasts.map((toastItem) => (
        <Toast
          key={toastItem.id}
          id={toastItem.id}
          variant={toastItem.variant}
          title={toastItem.title}
          description={toastItem.description}
          onClose={() => removeToast(toastItem.id)}
        />
      ))}
    </div>
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        position,
        addToast,
        removeToast,
        clearToasts,
        info,
        success,
        warning,
        danger,
      }}
    >
      {children}
      {typeof document !== 'undefined' ? createPortal(toastListContent, document.body) : toastListContent}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

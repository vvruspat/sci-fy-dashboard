import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, iconRight, error, hint, className, ...props }, ref) => {
    return (
      <div className={clsx(styles.wrapper, error && styles.hasError, className)}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputWrap}>
          {icon && <span className={styles.iconLeft}>{icon}</span>}
          <input
            ref={ref}
            className={clsx(styles.input, icon && styles.withIconLeft, iconRight && styles.withIconRight)}
            {...props}
          />
          {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
          <div className={styles.glow} />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

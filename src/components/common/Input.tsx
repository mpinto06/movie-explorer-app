import React from 'react';
import { clsx } from 'clsx';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className={styles.inputContainer}>
        {label && (
          <label className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            styles.inputField,
            error && styles.errorField,
            className
          )}
          {...props}
        />
        {error && (
          <p className={styles.errorMessage}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

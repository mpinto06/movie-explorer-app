import React from 'react';
import { clsx } from 'clsx';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        styles.skeleton,
        className
      )}
    />
  );
};

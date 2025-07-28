"use client";

import { useInView } from 'react-intersection-observer';
import styles from './Animations.module.css';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  triggerOnce?: boolean;
}

export default function ScrollAnimationWrapper({ children, delay = 0, className, triggerOnce = true }: ScrollAnimationWrapperProps) {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`${styles.hidden} ${inView ? styles.visible : ''} ${className || ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
} 
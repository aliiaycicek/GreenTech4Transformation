"use client";

import { useEffect } from 'react';
import './ripple.css';

interface RippleElement extends HTMLElement {
  _rippleBound?: boolean;
}

export const useRipple = (selectors: string[]) => {
  useEffect(() => {
    const createRipple = (e: MouseEvent) => {
      const el = e.currentTarget;

      // Ensure the target is an HTMLElement
      if (!(el instanceof HTMLElement)) return;

      // Only for left clicks
      if (e.button !== 0) return;

      const rect = el.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';

      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      el.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    const rippleElements = document.querySelectorAll<RippleElement>(selectors.join(', '));

    rippleElements.forEach(el => {
      // Prevent double binding
      if (!el._rippleBound) {
        el.addEventListener('click', createRipple as EventListener);
        el._rippleBound = true;
      }
    });

    return () => {
      // Cleanup
      rippleElements.forEach(el => {
        if (el._rippleBound) {
          el.removeEventListener('click', createRipple as EventListener);
          el._rippleBound = false;
        }
      });
    };
  }, [selectors]);
}; 
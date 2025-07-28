"use client";

import { useEffect } from 'react';
import './ripple.css';

interface RippleElement extends HTMLElement {
  _rippleBound?: boolean;
}

export const useRipple = (selectors: string[]) => {
  useEffect(() => {
    const rippleElements = document.querySelectorAll(selectors.join(', '));

    const createRipple = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;

      // Sadece sol tık
      if ((e as MouseEvent).button !== 0) return;

      const rect = el.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';

      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

      el.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    rippleElements.forEach(el => {
      const rippleEl = el as RippleElement;
      // Çift eklenmeyi önle
      if (!rippleEl._rippleBound) {
          rippleEl.addEventListener('click', createRipple as EventListener);
          rippleEl._rippleBound = true;
      }
    });

    return () => {
      // Cleanup
      rippleElements.forEach(el => {
        const rippleEl = el as RippleElement;
        if (rippleEl._rippleBound) {
            rippleEl.removeEventListener('click', createRipple as EventListener);
            rippleEl._rippleBound = false;
        }
      });
    };
  }, [selectors]);
}; 
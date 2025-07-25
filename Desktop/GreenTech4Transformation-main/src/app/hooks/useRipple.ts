"use client";

import { useEffect } from 'react';
import './ripple.css';

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
      // Çift eklenmeyi önle
      if (!(el as any)._rippleBound) {
          el.addEventListener('click', createRipple as EventListener);
          (el as any)._rippleBound = true;
      }
    });

    return () => {
      // Cleanup
      rippleElements.forEach(el => {
        if ((el as any)._rippleBound) {
            el.removeEventListener('click', createRipple as EventListener);
            (el as any)._rippleBound = false;
        }
      });
    };
  }, [selectors]);
}; 
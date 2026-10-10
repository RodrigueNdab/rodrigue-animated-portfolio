'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  stagger?: number;
}

/**
 * Subtle scroll-triggered reveal. Descendants marked with `data-reveal` fade and
 * rise once as the container enters the viewport. Content is fully visible when
 * the user prefers reduced motion.
 */
export default function Reveal({
  children,
  className,
  as: Tag = 'div',
  stagger = 0.07,
}: RevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (reduced || !root) return;
      const items = root.querySelectorAll('[data-reveal]');
      if (!items.length) return;
      gsap.from(items, {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: EASE.outCubic,
        stagger,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: root, start: 'top 88%', once: true },
      });
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  return (
    <Tag ref={rootRef} className={className}>
      {children}
    </Tag>
  );
}

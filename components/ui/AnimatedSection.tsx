'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('section-hidden');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.remove('section-hidden');
              el.classList.add('section-visible');
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const directionClass =
    direction === 'left'
      ? 'translate-x-[-40px]'
      : direction === 'right'
      ? 'translate-x-[40px]'
      : 'translate-y-[40px]';

  return (
    <div
      ref={ref}
      className={`${className} ${directionClass}`}
      style={{ transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}
    >
      {children}
    </div>
  );
}

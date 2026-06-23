'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StepProps } from '../InviteExperience';
import { NavButtons } from './StepMeet';

/* Comic panels grid layout */
const ComicPanelGrid = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:
        'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      zIndex: 3,
    }}
  />
);

export default function StepHero({ onNext, onPrev }: StepProps) {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Cenário"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,10,26,0.72)' }}
        />
        {/* Red gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(192,57,43,0.25) 0%, transparent 65%)' }}
        />
        {/* Halftone */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      <ComicPanelGrid />

      {/* Speed lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{ zIndex: 4 }}
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i * 360) / 20;
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1="200" y1="380"
              x2={200 + Math.cos(rad) * 600}
              y2={380 + Math.sin(rad) * 600}
              stroke="white"
              strokeWidth={i % 4 === 0 ? '1.5' : '0.4'}
            />
          );
        })}
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-20 z-10">
        <div className="flex flex-col items-center text-center gap-2">
          {/* Spider icon */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl mb-2"
          >
            🕷️
          </motion.div>

          {/* Line 1 - from left */}
          <motion.div
            initial={{ x: '-120%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(2.8rem, 13vw, 4rem)',
                color: 'white',
                lineHeight: 0.9,
                textShadow: '3px 3px 0px rgba(0,0,0,0.7)',
                display: 'block',
              }}
            >
              NENHUM HERÓI
            </span>
          </motion.div>

          {/* Line 2 - from right */}
          <motion.div
            initial={{ x: '120%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(2.8rem, 13vw, 4rem)',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 0.9,
                textShadow: '3px 3px 0px rgba(0,0,0,0.7)',
                display: 'block',
              }}
            >
              VENCE A MISSÃO
            </span>
          </motion.div>

          {/* Line 3 - slam from left with color */}
          <motion.div
            initial={{ x: '-130%', skewX: -15, opacity: 0 }}
            animate={{ x: 0, skewX: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(3.5rem, 16vw, 5rem)',
                lineHeight: 0.9,
                background: 'linear-gradient(135deg, #E53935, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.8))',
                display: 'block',
              }}
            >
              SOZINHO.
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #C0392B, #FFD700, #1A237E)', zIndex: 10 }}
      />

      <NavButtons onNext={onNext} onPrev={onPrev} />
    </div>
  );
}

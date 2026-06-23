'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

// ⬇️ ALTERE ESTA DATA PARA A DATA REAL DA FESTA
const PARTY_DATE = new Date('2026-07-19T15:00:00-03:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = PARTY_DATE.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      setTimeout(() => {
        setPrev(value);
        setFlip(false);
      }, 300);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="countdown-digit relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(26,35,126,0.4) 0%, rgba(192,57,43,0.3) 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)',
          }}
        />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={flip ? 'flip' : 'stable'}
            initial={{ rotateX: flip ? 90 : 0, opacity: flip ? 0 : 1 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-4xl md:text-5xl font-display text-white"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>

        {/* Center line (flip effect visual) */}
        <div
          className="absolute inset-x-0 top-1/2 h-px pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.4)', zIndex: 5 }}
        />
      </div>
      <span className="text-white/50 text-xs uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const isPast = PARTY_DATE < new Date();

  useEffect(() => {
    if (isPast) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [isPast]);

  return (
    <section
      id="countdown"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A1A 0%, #0D0D20 50%, #0A0A1A 100%)',
      }}
    >
      {/* Decorative web */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="80" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="200" stroke="white" strokeWidth="0.5" fill="none" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="200"
                y1="200"
                x2={200 + Math.cos(angle) * 200}
                y2={200 + Math.sin(angle) * 200}
                stroke="white"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 max-w-sm mx-auto">
        <AnimatedSection className="text-center mb-12">
          <div
            className="text-spider-red-bright text-sm font-bold tracking-widest uppercase mb-3"
          >
            A missão começa em
          </div>
          <h2
            className="text-4xl md:text-5xl font-display text-gradient-hero mb-2"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
          >
            FALTAM APENAS...
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200} className="flex justify-center">
          {isPast ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-white text-2xl font-bold">É hoje! Vamos nessa!</p>
            </motion.div>
          ) : (
            <div className="flex items-start gap-4">
              <CountdownUnit value={timeLeft.days} label="Dias" />
              <div className="text-white/40 text-4xl font-display mt-6" style={{ fontFamily: 'var(--font-bebas)' }}>:</div>
              <CountdownUnit value={timeLeft.hours} label="Horas" />
              <div className="text-white/40 text-4xl font-display mt-6" style={{ fontFamily: 'var(--font-bebas)' }}>:</div>
              <CountdownUnit value={timeLeft.minutes} label="Min" />
            </div>
          )}
        </AnimatedSection>

        <AnimatedSection delay={400} className="text-center mt-10">
          <p className="text-white/40 text-sm">
            ⚡ Atualizado em tempo real
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

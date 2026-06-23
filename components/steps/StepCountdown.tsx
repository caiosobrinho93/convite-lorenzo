'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepProps } from '../InviteExperience';
import { NavButtons } from './StepMeet';

// ⬇️ ALTERE PARA A DATA REAL DA FESTA
const PARTY_DATE = new Date('2026-07-19T15:00:00-03:00');

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(): TimeLeft {
  const diff = PARTY_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Digit box — Marvel card style */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 72,
          height: 80,
          background: 'linear-gradient(160deg, #1a0008 0%, #0D0D2B 100%)',
          border: '1px solid rgba(229,57,53,0.35)',
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          boxShadow: '0 8px 30px rgba(0,0,0,0.6), inset 0 0 30px rgba(229,57,53,0.07)',
        }}
      >
        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(229,57,53,0.04) 3px, rgba(229,57,53,0.04) 4px)',
          }}
        />
        {/* Halftone */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(229,57,53,0.06) 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }}
        />
        {/* Center separator */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{ top: '50%', height: 1, background: 'rgba(0,0,0,0.6)' }}
        />
        {/* Flip number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={str}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: '2.8rem',
                color: 'white',
                textShadow: '0 0 20px rgba(229,57,53,0.6)',
                lineHeight: 1,
              }}
            >
              {str}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span
        className="uppercase tracking-widest text-white/40"
        style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.6rem', letterSpacing: '0.25em' }}
      >
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: '2.5rem',
        color: '#E53935',
        marginBottom: 20,
        lineHeight: 1,
      }}
    >
      :
    </motion.span>
  );
}

export default function StepCountdown({ onNext, onPrev }: StepProps) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());
  const past = PARTY_DATE < new Date();

  useEffect(() => {
    if (past) return;
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [past]);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #08081A 0%, #120008 100%)' }}
    >
      {/* Halftone background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(229,57,53,0.08) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Speed lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {Array.from({ length: 18 }).map((_, i) => {
          const a = (i * 360) / 18;
          const r = (a * Math.PI) / 180;
          return (
            <line key={i} x1="200" y1="380"
              x2={200 + Math.cos(r) * 500}
              y2={380 + Math.sin(r) * 500}
              stroke="#E53935" strokeWidth={i % 3 === 0 ? '1' : '0.4'}
            />
          );
        })}
      </svg>

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
          zIndex: 20,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-6 px-5 max-w-sm w-full">
        {/* Badge */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: '#E53935', boxShadow: '0 0 10px #E53935' }}
          />
          <span
            className="text-white/50 text-xs uppercase tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.7rem', letterSpacing: '0.28em' }}
          >
            MISSÃO COMEÇA EM
          </span>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: '#E53935', boxShadow: '0 0 10px #E53935' }}
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ x: '-100%', skewX: -15 }}
          animate={{ x: 0, skewX: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(3rem, 14vw, 4.5rem)',
              color: 'white',
              lineHeight: 0.88,
              textShadow: '3px 3px 0px #C0392B',
              display: 'block',
            }}
          >
            QUASE LÁ...
          </span>
        </motion.div>

        {/* Countdown digits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          {past ? (
            <div className="text-center">
              <div className="text-6xl mb-3">🎉</div>
              <p
                className="text-white"
                style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem' }}
              >
                É HOJE!
              </p>
            </div>
          ) : (
            <>
              <Digit value={time.days} label="Dias" />
              <Colon />
              <Digit value={time.hours} label="Horas" />
              <Colon />
              <Digit value={time.minutes} label="Min" />
            </>
          )}
        </motion.div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            height: 2,
            width: '80%',
            background: 'linear-gradient(90deg, transparent, #E53935, #FFD700, transparent)',
            transformOrigin: 'center',
          }}
        />

        <p
          className="text-white/30 text-xs uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.2em', fontSize: '0.65rem' }}
        >
          ⚡ Atualizado em tempo real
        </p>
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

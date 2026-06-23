'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  familia: string;
}

const sequence = [
  { text: '⚠️ MISSÃO ESPECIAL', delay: 0, size: 'text-4xl md:text-6xl', color: 'text-gradient-red' },
  { text: 'Olá!', delay: 2000, size: 'text-5xl md:text-7xl', color: 'text-white' },
  {
    text: 'Você foi escolhido para\numa missão muito importante.',
    delay: 3800,
    size: 'text-2xl md:text-3xl',
    color: 'text-gradient-blue',
  },
];

// Inline SVG web background
const WebBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-10"
    viewBox="0 0 400 800"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
  >
    {/* Radial web lines from top-right */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 180) / 11 - 90;
      const rad = (angle * Math.PI) / 180;
      return (
        <line
          key={i}
          x1="400"
          y1="0"
          x2={400 + Math.cos(rad) * 600}
          y2={Math.sin(rad) * 600}
          stroke="white"
          strokeWidth="0.5"
        />
      );
    })}
    {/* Concentric arcs */}
    {[100, 200, 300, 400, 500].map((r) => (
      <path
        key={r}
        d={`M ${400 - r} 0 Q 400 ${r} ${400 + r} 0`}
        stroke="white"
        strokeWidth="0.5"
        fill="none"
      />
    ))}
    {/* Bottom-left web */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 90) / 7;
      const rad = (angle * Math.PI) / 180;
      return (
        <line
          key={`bl-${i}`}
          x1="0"
          y1="800"
          x2={Math.cos(rad) * 400}
          y2={800 - Math.sin(rad) * 400}
          stroke="white"
          strokeWidth="0.5"
        />
      );
    })}
  </svg>
);

export default function HeroSection({ familia }: HeroSectionProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    sequence.forEach((item, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, item.delay + 500);
    });

    setTimeout(() => {
      setShowButton(true);
    }, 6000);
  }, []);

  const scrollToStory = () => {
    const el = document.getElementById('story');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0A0A1A 0%, #0D0D2B 40%, #1A0A0A 100%)',
      }}
    >
      {/* Animated background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 20%, rgba(192,57,43,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(26,35,126,0.2) 0%, transparent 60%)',
        }}
      />

      {/* Web SVG background */}
      <WebBackground />

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm mx-auto gap-6">
        {/* Spider logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'backOut' }}
          className="mb-4"
        >
          <svg
            width="80"
            height="60"
            viewBox="0 0 80 60"
            fill="none"
            className="drop-shadow-[0_0_20px_rgba(229,57,53,0.8)]"
          >
            {/* Spider body */}
            <ellipse cx="40" cy="30" rx="10" ry="14" fill="#C0392B" />
            <ellipse cx="40" cy="22" rx="8" ry="8" fill="#C0392B" />
            {/* Eyes */}
            <ellipse
              cx="37"
              cy="20"
              rx="3"
              ry="4"
              fill="white"
              transform="rotate(-15 37 20)"
            />
            <ellipse
              cx="43"
              cy="20"
              rx="3"
              ry="4"
              fill="white"
              transform="rotate(15 43 20)"
            />
            {/* Legs */}
            <line x1="30" y1="28" x2="10" y2="18" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="30" y1="32" x2="8" y2="28" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="30" y1="36" x2="10" y2="42" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="50" y1="28" x2="70" y2="18" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="50" y1="32" x2="72" y2="28" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="50" y1="36" x2="70" y2="42" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </motion.div>

        {/* Animated text sequence */}
        <div className="min-h-[200px] flex flex-col items-center justify-center gap-4">
          <AnimatePresence mode="popLayout">
            {sequence.slice(0, currentStep + 1).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`font-display tracking-wider whitespace-pre-line ${item.size} ${item.color}`}
                style={{ fontFamily: i === 0 ? 'var(--font-bebas)' : 'var(--font-inter)', textShadow: '0 0 30px rgba(0,0,0,0.8)' }}
              >
                {item.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Greeting */}
        {currentStep >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-spider-gold text-lg font-semibold"
          >
            {familia} 🕷️
          </motion.p>
        )}

        {/* CTA Button */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'backOut' }}
              onClick={scrollToStory}
              className="btn-mission mt-4 px-10 py-4 rounded-full text-white font-bold text-lg tracking-widest uppercase shadow-glow-red"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.3rem', letterSpacing: '0.15em' }}
            >
              ACEITAR MISSÃO
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-1 mt-6 text-white/40 animate-bounce-gentle"
          >
            <span className="text-xs tracking-widest uppercase">Role para baixo</span>
            <ChevronDown size={16} />
          </motion.div>
        )}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0A0A1A)',
        }}
      />
    </section>
  );
}

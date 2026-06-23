'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import { StepProps } from '../InviteExperience';

/* ─── HALFTONE DOT BACKGROUND ────────────────────────────── */
const HalftoneLayer = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
      backgroundSize: '18px 18px',
      mixBlendMode: 'overlay',
    }}
  />
);

/* ─── SPEED LINES (radiating from center) ───────────────── */
const SpeedLines = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
    viewBox="0 0 400 800"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
  >
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      const x2 = 200 + Math.cos(rad) * 600;
      const y2 = 400 + Math.sin(rad) * 600;
      return (
        <line
          key={i}
          x1="200" y1="400"
          x2={x2} y2={y2}
          stroke="white"
          strokeWidth={i % 3 === 0 ? '1.2' : '0.5'}
        />
      );
    })}
  </svg>
);

/* ─── CHROMATIC TEXT ─────────────────────────────────────── */
const ChromaticText = ({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div className={`relative ${className ?? ''}`} style={style}>
    {/* Cyan offset */}
    <span
      className="absolute inset-0 select-none"
      style={{ color: '#00FFFF', transform: 'translate(-2px, 1px)', opacity: 0.7 }}
      aria-hidden
    >
      {text}
    </span>
    {/* Magenta offset */}
    <span
      className="absolute inset-0 select-none"
      style={{ color: '#FF00FF', transform: 'translate(2px, -1px)', opacity: 0.5 }}
      aria-hidden
    >
      {text}
    </span>
    {/* Main text */}
    <span className="relative">{text}</span>
  </div>
);

/* ─── GLITCH KEYFRAME ─────────────────────────────────────── */
const GLITCH_FRAMES = [
  { x: 0, skew: 0, opacity: 1 },
  { x: -4, skew: -2, opacity: 0.9 },
  { x: 6, skew: 1, opacity: 1 },
  { x: -2, skew: 3, opacity: 0.95 },
  { x: 0, skew: 0, opacity: 1 },
];

/* ─── SCAN LINE EFFECT ───────────────────────────────────── */
const ScanLines = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:
        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
      zIndex: 20,
    }}
  />
);

/* ─── CLASSIFIED STAMP ───────────────────────────────────── */
const ClassifiedStamp = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ scale: 2, opacity: 0, rotate: -25 }}
        animate={{ scale: 1, opacity: 1, rotate: -15 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-8 right-6 z-30"
      >
        <div
          className="px-3 py-1 rounded border-2 text-xs font-black tracking-[0.25em] uppercase"
          style={{
            borderColor: '#E53935',
            color: '#E53935',
            fontFamily: 'var(--font-bebas)',
            fontSize: '0.85rem',
            letterSpacing: '0.3em',
            opacity: 0.85,
            transform: 'rotate(-15deg)',
          }}
        >
          CONFIDENCIAL
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─── DIAGONAL COLOR BLOCKS ──────────────────────────────── */
const DiagonalBlocks = ({ step }: { step: number }) => (
  <>
    {/* Red diagonal top-left */}
    <motion.div
      initial={{ x: '-100%', skewX: 0 }}
      animate={step >= 0 ? { x: '-20%', skewX: -12 } : { x: '-100%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -top-10 left-0 w-2/3 h-40 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #C0392B 0%, #E53935 100%)', opacity: 0.9, zIndex: 1 }}
    />
    {/* Blue diagonal bottom-right */}
    <motion.div
      initial={{ x: '100%', skewX: 0 }}
      animate={step >= 1 ? { x: '20%', skewX: -12 } : { x: '100%' }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -bottom-10 right-0 w-2/3 h-32 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #1A237E 0%, #283593 100%)', opacity: 0.9, zIndex: 1 }}
    />
    {/* Gold accent line */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={step >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
      style={{ transformOrigin: 'left center', height: 3, background: '#FFD700', zIndex: 2 }}
      className="absolute left-0 right-0 top-40 pointer-events-none"
    />
  </>
);

/* ─── MAIN STEP ───────────────────────────────────────────── */
type Phase = 'black' | 'flash' | 'alert' | 'mis1' | 'mis2' | 'agent' | 'button';

export default function StepMission({ familia, onNext }: StepProps) {
  const [phase, setPhase] = useState<Phase>('black');
  const [glitching, setGlitching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seq: [Phase, number][] = [
      ['flash', 200],
      ['alert', 700],
      ['mis1', 1400],
      ['mis2', 2000],
      ['agent', 2700],
      ['button', 4200],
    ];

    let timeout: ReturnType<typeof setTimeout>;
    seq.forEach(([p, delay]) => {
      timeout = setTimeout(() => setPhase(p), delay);
    });

    // Glitch at 3.2s
    setTimeout(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 600);
    }, 3200);

    return () => clearTimeout(timeout);
  }, []);

  // Screen shake on flash
  const shake = phase === 'flash';

  const blockStep =
    phase === 'black' ? -1
    : phase === 'flash' ? 0
    : phase === 'alert' ? 1
    : 2;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        background:
          phase === 'black' || phase === 'flash'
            ? '#000'
            : 'linear-gradient(160deg, #08081A 0%, #0C0015 50%, #130005 100%)',
      }}
    >
      {/* Scan lines */}
      {phase !== 'black' && <ScanLines />}

      {/* Spider-Verse BG */}
      <AnimatePresence>
        {phase !== 'black' && phase !== 'flash' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
            style={{ zIndex: 0 }}
          >
            <img
              src="/images/spiderverse-bg.png"
              alt=""
              className="w-full h-full object-cover"
              style={{ opacity: 0.18, mixBlendMode: 'screen' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Halftone */}
      {phase !== 'black' && <HalftoneLayer />}

      {/* Speed lines */}
      {phase !== 'black' && phase !== 'flash' && <SpeedLines />}

      {/* Diagonal color blocks */}
      <DiagonalBlocks step={blockStep} />

      {/* Flash burst */}
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.7, 1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.6, 1] }}
            className="absolute inset-0 bg-white"
            style={{ zIndex: 50 }}
          />
        )}
      </AnimatePresence>

      {/* Classified stamp */}
      <ClassifiedStamp visible={phase !== 'black' && phase !== 'flash'} />

      {/* ─── CONTENT AREA ──────────────────────────────────── */}
      <motion.div
        animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col items-start px-5 w-full max-w-sm gap-0"
        style={{ paddingTop: '40px' }}
      >

        {/* ALERT BAR */}
        <div className="h-6 flex items-center mb-3">
          <motion.div
            initial={{ x: '-110%', opacity: 0 }}
            animate={
              (phase === 'alert' || phase === 'mis1' || phase === 'mis2' || phase === 'agent' || phase === 'button')
                ? { x: 0, opacity: 1 }
                : { x: '-110%', opacity: 0 }
            }
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: 8, repeatType: 'loop' }}
              className="w-3 h-3 rounded-full"
              style={{ background: '#E53935', boxShadow: '0 0 10px #E53935' }}
            />
            <span
              className="text-white font-black uppercase tracking-[0.3em] text-xs"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.3em', fontSize: '0.7rem' }}
            >
              ⚠ ALERTA DE MISSÃO ATIVA
            </span>
          </motion.div>
        </div>

        {/* MISSÃO — sai da esquerda */}
        <div className="overflow-visible w-full min-h-[5rem] flex items-center">
          <motion.div
            initial={{ x: '-120%', skewX: -20, opacity: 0 }}
            animate={
              (phase === 'mis1' || phase === 'mis2' || phase === 'agent' || phase === 'button')
                ? { x: 0, skewX: 0, opacity: 1 }
                : { x: '-120%', skewX: -20, opacity: 0 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <ChromaticText
              text="MISSÃO"
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(4.2rem, 18vw, 5.5rem)',
                color: 'white',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                textShadow: '4px 4px 0px #C0392B, 8px 8px 0px rgba(0,0,0,0.5)',
              }}
            />
          </motion.div>
        </div>

        {/* ESPECIAL — sai da direita */}
        <div className="overflow-visible w-full min-h-[5rem] flex items-center justify-end">
          <motion.div
            initial={{ x: '120%', skewX: 20, opacity: 0 }}
            animate={
              (phase === 'mis2' || phase === 'agent' || phase === 'button')
                ? { x: 0, skewX: 0, opacity: 1 }
                : { x: '120%', skewX: 20, opacity: 0 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="self-end"
          >
            <div
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(4.2rem, 18vw, 5.5rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #E53935 0%, #FF6B6B 60%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.6))',
              }}
            >
              ESPECIAL
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-8 flex items-center">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              (phase === 'agent' || phase === 'button')
                ? { scaleX: 1, opacity: 1 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: 2, background: 'linear-gradient(90deg, #FFD700, transparent)', width: '100%', transformOrigin: 'left' }}
          />
        </div>

        {/* AGENTE SELECIONADO */}
        <div className="min-h-[85px] w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              (phase === 'agent' || phase === 'button')
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-1"
          >
            <span
              className="text-white/50 text-xs uppercase tracking-[0.25em]"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              Agente Selecionado:
            </span>
            <motion.div
              animate={glitching ? {
                x: GLITCH_FRAMES.map(f => f.x),
                skewX: GLITCH_FRAMES.map(f => f.skew),
                opacity: GLITCH_FRAMES.map(f => f.opacity),
              } : {}}
              transition={{ duration: 0.1 }}
            >
              <ChromaticText
                text={familia.toUpperCase()}
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(1.6rem, 7vw, 2.2rem)',
                  color: '#FFD700',
                  letterSpacing: '0.05em',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.8)',
                }}
              />
            </motion.div>
            <p className="text-white/40 text-xs mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
              Sua presença é essencial para esta missão.
			</p>
          </motion.div>
        </div>

        {/* BOTÃO */}
        <div className="w-full min-h-[96px] mt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={phase === 'button' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={onNext}
              className="relative overflow-hidden w-full py-5 flex items-center justify-between px-6 group"
              style={{
                background: 'linear-gradient(135deg, #C0392B 0%, #E53935 100%)',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)',
                boxShadow: '0 0 40px rgba(229,57,53,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              {/* Shine sweep */}
              <motion.div
                initial={{ x: '-200%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', width: '50%' }}
              />
              <span
                className="text-white font-black tracking-widest"
                style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', letterSpacing: '0.15em' }}
              >
                ACEITAR MISSÃO
              </span>
              <span className="text-white text-2xl">▶</span>
            </motion.button>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={phase === 'button' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/25 text-[10px] text-center mt-3 uppercase tracking-widest"
            >
              Deslize para avançar entre as cenas
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom edge accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #C0392B, #FFD700, #1A237E)', zIndex: 10 }}
      />

      {/* Corner web - top left */}
      <svg
        className="absolute top-0 left-0 pointer-events-none opacity-20"
        width="100" height="100"
        viewBox="0 0 100 100" fill="none"
        style={{ zIndex: 5 }}
      >
        {[15, 35, 55, 75, 95].map(d => (
          <line key={d} x1="0" y1={d} x2={d} y2="0" stroke="white" strokeWidth="0.8" />
        ))}
      </svg>
    </div>
  );
}

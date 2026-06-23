'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { StepProps } from '../InviteExperience';

/* ─── UNIVERSAL NAV BUTTONS ──────────────────────────────── */
export function NavButtons({
  onNext,
  onPrev,
  nextLabel = 'AVANÇAR',
}: {
  onNext: () => void;
  onPrev?: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-5 z-20">
      {/* Back */}
      {onPrev ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onPrev}
          className="flex items-center gap-1 text-white/40 text-xs uppercase tracking-widest transition-colors hover:text-white/70"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.15em' }}
        >
          <ChevronRight size={14} className="rotate-180" />
          Voltar
        </motion.button>
      ) : (
        <div />
      )}

      {/* Next — Marvel-style clipped button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="relative overflow-hidden flex items-center gap-2 px-6 py-3 text-white font-black uppercase"
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: '1rem',
          letterSpacing: '0.15em',
          background: 'linear-gradient(135deg, #C0392B, #E53935)',
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 12px 100%)',
          boxShadow: '0 4px 20px rgba(229,57,53,0.45)',
        }}
      >
        {/* Shine */}
        <motion.div
          initial={{ x: '-200%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            width: '40%',
          }}
        />
        {nextLabel}
        <ChevronRight size={14} />
      </motion.button>
    </div>
  );
}

/* ─── STEP 1 — "Esse é o Lorenzo" ───────────────────────── */

/* Comic-style text overlay for photo steps */
function ComicOverlay({
  topLabel,
  mainText,
  highlight,
  sub,
}: {
  topLabel?: string;
  mainText: string;
  highlight?: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-1"
    >
      {topLabel && (
        <span
          className="text-spider-red-bright text-xs uppercase tracking-[0.3em] font-black"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.28em' }}
        >
          {topLabel}
        </span>
      )}

      {/* Main text with stroke effect */}
      <div className="relative">
        {/* Outline layer */}
        <span
          aria-hidden
          className="absolute select-none"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3.8rem, 18vw, 5.5rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.01em',
            color: 'transparent',
            WebkitTextStroke: '6px rgba(0,0,0,0.8)',
          }}
        >
          {mainText}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3.8rem, 18vw, 5.5rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.01em',
            color: 'white',
            textShadow: '3px 3px 0px #C0392B',
            display: 'block',
          }}
        >
          {mainText}
        </span>
      </div>

      {highlight && (
        <motion.div
          initial={{ x: '-100%', skewX: -15 }}
          animate={{ x: 0, skewX: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2.8rem, 14vw, 4rem)',
              lineHeight: 0.9,
              background: 'linear-gradient(135deg, #E53935, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
              filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.7))',
            }}
          >
            {highlight}
          </span>
        </motion.div>
      )}

      {sub && (
        <p className="text-white/60 text-sm font-light mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}

/* Bottom panel strip (comic panel divider) */
const ComicPanelBottom = () => (
  <>
    {/* Halftone dots row */}
    <div
      className="absolute bottom-[72px] left-0 right-0 h-8 pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, transparent, rgba(10,10,26,0.95))',
        zIndex: 5,
      }}
    />
    <div
      className="absolute bottom-0 left-0 right-0 h-[72px] pointer-events-none"
      style={{ background: '#0A0A1A', zIndex: 5 }}
    />
    {/* Color accent line */}
    <div
      className="absolute left-0 right-0 pointer-events-none"
      style={{
        bottom: 71,
        height: 3,
        background: 'linear-gradient(90deg, #E53935 0%, #FFD700 50%, #1A237E 100%)',
        zIndex: 6,
      }}
    />
  </>
);

export function ComicPhotoPanel({ src, alt, tag }: { src: string; alt: string; tag?: string }) {
  return (
    <div
      className="relative flex items-center justify-center pointer-events-none z-10 w-[220px] h-[260px] sm:w-[270px] sm:h-[330px] mx-auto"
      style={{ transform: 'rotate(-2deg)' }}
    >
      {/* Shadow layer */}
      <div
        className="absolute inset-0 bg-black/60 translate-x-2.5 translate-y-3 z-0"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)',
        }}
      />
      
      {/* Main card */}
      <div
        className="absolute inset-0 border-4 border-white bg-spider-dark z-10 flex flex-col justify-between overflow-hidden shadow-2xl"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)',
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top animate-fade-in"
            priority
            sizes="(max-width: 640px) 220px, 270px"
          />
          {/* Halftone texture overlay */}
          <div
            className="absolute inset-0 opacity-15 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
          />
          {/* Diagonal slice gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>
      
      {/* Corner dynamic sticker tag */}
      {tag && (
        <div className="absolute -top-3 -left-3 z-20" style={{ transform: 'rotate(-6deg)' }}>
          <div
            className="bg-spider-gold text-black font-black uppercase text-[9px] sm:text-[10px] tracking-widest px-3 py-1 border-2 border-black shadow-lg"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {tag}
          </div>
        </div>
      )}
    </div>
  );
}

export default function StepMeet({ onNext, onPrev }: StepProps) {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Background elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #0A0A1F 0%, #05001A 100%)',
          zIndex: 0,
        }}
      />
      
      {/* Centered Premium comic panel wrapper */}
      <div className="flex-1 flex items-center justify-center p-4 pb-[170px]">
        <ComicPhotoPanel
          src="/images/lorenzo-2.jpg"
          alt="Lorenzo sorrindo"
          tag="HERÓI DO DIA"
        />
      </div>

      {/* Comic panel bottom */}
      <ComicPanelBottom />

      {/* Text in bottom panel */}
      <div className="absolute left-5 right-5 z-10" style={{ bottom: 80 }}>
        <ComicOverlay
          topLabel="// APRESENTAÇÃO //"
          mainText="ESSE É O"
          highlight="LORENZO."
          sub="Nosso pequeno grande herói que está muito animado para essa aventura! 🕷️"
        />
      </div>

      <NavButtons onNext={onNext} onPrev={onPrev} />
    </div>
  );
}

export { ComicOverlay, ComicPanelBottom };

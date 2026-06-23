'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StepProps } from '../InviteExperience';
import { NavButtons, ComicPanelBottom, ComicPhotoPanel, SpiderWebBG } from './StepMeet';

export default function StepPersonality({ onNext, onPrev }: StepProps) {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Background elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          zIndex: 2,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, #180507 0%, #060512 70%, #030308 100%)',
          zIndex: 0,
        }}
      />

      <SpiderWebBG />

      {/* Centered Premium comic panel wrapper */}
      <div className="flex-1 flex items-center justify-center p-4 pb-[170px]" style={{ zIndex: 10 }}>
        <ComicPhotoPanel
          src="/images/lorenzo-3.jpg"
          alt="Lorenzo brincando"
          tag="FÃ NÚMERO 1"
        />
      </div>

      <ComicPanelBottom />

      <div className="absolute left-5 right-5 z-10" style={{ bottom: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2"
        >
          <span
            className="text-spider-red-bright text-xs uppercase tracking-[0.28em] font-black"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            // SOBRE O LORENZO //
          </span>

          <p className="text-white/80 text-base font-light" style={{ fontFamily: 'var(--font-inter)' }}>
            Ele ama brincar, correr, dar muitas risadas<br />e é o fã número 1 do...
          </p>

          {/* Spider-Man text slamming in */}
          <motion.div
            initial={{ x: '-120%', skewX: -20 }}
            animate={{ x: 0, skewX: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(3rem, 14vw, 4.5rem)',
                lineHeight: 0.88,
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.5)',
                display: 'block',
              }}
              aria-hidden
            >
              HOMEM-ARANHA!
            </span>
          </motion.div>
          <motion.div
            initial={{ x: '-120%', skewX: -20 }}
            animate={{ x: 0, skewX: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="-mt-12"
          >
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(3rem, 14vw, 4.5rem)',
                lineHeight: 0.88,
                background: 'linear-gradient(135deg, #E53935 0%, #FF6B6B 60%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.8))',
                display: 'block',
              }}
            >
              HOMEM-ARANHA!
            </span>
          </motion.div>

          <p className="text-white/50 text-xs mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
            🕷️ Com grandes poderes vêm grandes comemorações!
          </p>
        </motion.div>
      </div>

      <NavButtons onNext={onNext} onPrev={onPrev} />
    </div>
  );
}

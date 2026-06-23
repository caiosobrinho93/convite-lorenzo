'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StepProps } from '../InviteExperience';
import { NavButtons, ComicPanelBottom, ComicPhotoPanel, SpiderWebBG } from './StepMeet';

export default function StepChosen({ onNext, onPrev, familia }: StepProps) {
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
          src="/images/lorenzo-6.jpg"
          alt="Lorenzo joia"
          tag="AGENTE SELECIONADO"
        />
      </div>

      {/* "AGENTE SELECIONADO" diagonal banner */}
      <div
        className="absolute top-12 -left-8 z-10 flex items-center justify-center pointer-events-none"
        style={{ transform: 'rotate(-12deg)' }}
      >
        <div
          className="px-16 py-2 text-xs font-black uppercase tracking-widest text-white"
          style={{
            background: 'linear-gradient(90deg, #C0392B, #E53935)',
            fontFamily: 'var(--font-bebas)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          ⚡ AGENTE SELECIONADO
        </div>
      </div>

      <ComicPanelBottom />

      <div className="absolute left-5 right-5 z-10" style={{ bottom: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-1"
        >
          <span
            className="text-spider-gold text-xs uppercase tracking-[0.28em] font-black"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            // CONVOCAÇÃO ATIVA //
          </span>

          <p className="text-white/80 text-xl font-light" style={{ fontFamily: 'var(--font-inter)' }}>
            E por isso,
          </p>

          {/* VOCÊ FOI slamming left */}
          <motion.div
            initial={{ x: '-120%', skewX: -18 }}
            animate={{ x: 0, skewX: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(3rem, 14vw, 4.5rem)',
                lineHeight: 0.88,
                color: 'white',
                textShadow: '3px 3px 0px #C0392B',
                display: 'block',
              }}
            >
              VOCÊ FOI
            </span>
          </motion.div>

          {/* CONVOCADO slamming right */}
          <motion.div
            initial={{ x: '120%', skewX: 18 }}
            animate={{ x: 0, skewX: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="self-end"
          >
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(3rem, 14vw, 4.5rem)',
                lineHeight: 0.88,
                background: 'linear-gradient(135deg, #E53935, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.7))',
                display: 'block',
              }}
            >
              CONVOCADO!
            </span>
          </motion.div>

          {familia && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-spider-gold text-sm font-semibold mt-1"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              👊 {familia}, prepare o seu traje de combate!
            </motion.p>
          )}
        </motion.div>
      </div>

      <NavButtons onNext={onNext} onPrev={onPrev} />
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StepProps } from '../InviteExperience';
import { NavButtons, ComicOverlay, ComicPanelBottom, ComicPhotoPanel, SpiderWebBG } from './StepMeet';

export default function StepAge({ onNext, onPrev }: StepProps) {
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
          src="/images/lorenzo-5.jpg"
          alt="Lorenzo"
          tag="LEVEL UP!"
        />
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
            className="text-spider-blue-bright text-xs uppercase tracking-[0.28em] font-black"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            // NOVA FASE //
          </span>

          <p className="text-white/80 text-xl font-light" style={{ fontFamily: 'var(--font-inter)' }}>
            E ele está completando...
          </p>

          {/* BIG 6 */}
          <div className="flex items-end gap-2 leading-none">
            <span
              className="relative"
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(7rem, 32vw, 10rem)',
                lineHeight: 0.85,
                color: 'transparent',
                WebkitTextStroke: '3px #E53935',
              }}
            >
              {/* Fill */}
              <span
                className="absolute inset-0"
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(7rem, 32vw, 10rem)',
                  lineHeight: 0.85,
                  background: 'linear-gradient(135deg, #E53935 0%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.7))',
                }}
                aria-hidden
              >
                6
              </span>
              6
            </span>
            <motion.span
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(2.5rem, 11vw, 3.5rem)',
                lineHeight: 0.9,
                color: 'white',
                textShadow: '2px 2px 0px #C0392B',
                paddingBottom: '0.4rem',
              }}
            >
              ANOS!
            </motion.span>
          </div>

          <p className="text-spider-gold text-sm font-semibold">🎂 E quer celebrar esse novo nível de poder com você!</p>
        </motion.div>
      </div>

      <NavButtons onNext={onNext} onPrev={onPrev} />
    </div>
  );
}

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import SpiderParticles from '@/components/ui/SpiderParticles';
import WebCorners from '@/components/ui/WebCorners';
import Confetti, { ConfettiHandle } from '@/components/ui/Confetti';

// Steps
import StepMission from './steps/StepMission';
import StepMeet from './steps/StepMeet';
import StepAge from './steps/StepAge';
import StepPersonality from './steps/StepPersonality';
import StepHero from './steps/StepHero';
import StepChosen from './steps/StepChosen';
import StepHeroCards from './steps/StepHeroCards';
import StepCountdown from './steps/StepCountdown';
import StepInvite from './steps/StepInvite';
import StepRSVP from './steps/StepRSVP';

export interface StepProps {
  familia: string;
  onNext: () => void;
  onPrev?: () => void;
  token?: string;
  criancas?: string[];
  jaConfirmado?: boolean;
  confirmadosAnteriores?: string[];
  confettiRef?: React.RefObject<ConfettiHandle | null>;
}

interface InviteExperienceProps {
  token: string;
  familia: string;
  criancas: string[];
  jaConfirmado: boolean;
  confirmadosAnteriores: string[];
}

// Slide transition variants
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function InviteExperience({
  token,
  familia,
  criancas,
  jaConfirmado,
  confirmadosAnteriores,
}: InviteExperienceProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const confettiRef = useRef<ConfettiHandle>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const TOTAL_STEPS = 10;

  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [step]);

  const goPrev = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 55; // minimum px to trigger swipe

    if (diffX > minSwipeDistance) {
      // Swiped Left -> Go Next (only if not on the first mission step or the final RSVP step)
      if (step > 0 && step < TOTAL_STEPS - 1) {
        goNext();
      }
    } else if (diffX < -minSwipeDistance) {
      // Swiped Right -> Go Prev (only if not on the mission/intro step)
      if (step > 0) {
        goPrev();
      }
    }
  };

  const stepProps: StepProps = {
    familia,
    onNext: goNext,
    onPrev: goPrev,
    token,
    criancas,
    jaConfirmado,
    confirmadosAnteriores,
    confettiRef,
  };

  const steps = [
    <StepMission key={0} {...stepProps} />,
    <StepMeet key={1} {...stepProps} />,
    <StepAge key={2} {...stepProps} />,
    <StepPersonality key={3} {...stepProps} />,
    <StepHero key={4} {...stepProps} />,
    <StepChosen key={5} {...stepProps} />,
    <StepHeroCards key={6} {...stepProps} />,
    <StepCountdown key={7} {...stepProps} />,
    <StepInvite key={8} {...stepProps} />,
    <StepRSVP key={9} {...stepProps} />,
  ];

  // Progress dots (show from step 1 onward, hide on RSVP)
  const showDots = step > 0 && step < TOTAL_STEPS - 1;

  return (
    <div
      className="relative w-full h-[100dvh] overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A0A1A 0%, #0D0D2B 100%)' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Global decorations */}
      <SpiderParticles />
      <WebCorners />
      <Confetti ref={confettiRef} />

      {/* Slide area */}
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 2 }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      {showDots && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-1.5 z-10">
          {Array.from({ length: TOTAL_STEPS - 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === step - 1 ? 20 : 6,
                height: 6,
                background:
                  i === step - 1
                    ? '#E53935'
                    : i < step - 1
                    ? 'rgba(229,57,53,0.4)'
                    : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
      )}

      {/* Swipe hint — only on step 1 */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-20 left-0 right-0 flex justify-center z-10"
        >
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <ChevronLeft size={14} />
            <span>deslize ou use os botões</span>
            <ChevronRight size={14} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

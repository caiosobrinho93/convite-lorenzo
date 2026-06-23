'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Heart, Award, ArrowRight, RefreshCw } from 'lucide-react';
import { StepProps } from '../InviteExperience';
import { NavButtons, ComicPanelBottom } from './StepMeet';

interface CardData {
  name: string;
  title: string;
  power: number;
  speed: number;
  fun: number;
  special: string;
  avatarEmoji: string;
  avatarColor: string;
}

export default function StepHeroCards({ onNext, onPrev, criancas = [], familia }: StepProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Generate cards based on children. If no children, create one for the family.
  const cards: CardData[] = criancas.length > 0 
    ? criancas.map((child, i) => {
        // Deterministic stats based on name length
        const base = child.length * 7;
        const power = 85 + (base % 15);
        const speed = 80 + ((base + 3) % 20);
        const fun = 90 + ((base + 5) % 10);
        
        const badges = ['SUPER AMIGO', 'AGENTE DE COMBATE', 'HERÓI DA DIVERSÃO', 'ATIRADOR DE TEIA', 'MALA DE CHOQUE'];
        const title = badges[base % badges.length];

        const emojis = ['🦸‍♂️', '🦸‍♀️', '⚡', '🕷️', '🔥'];
        const avatarEmoji = emojis[base % emojis.length];

        const colors = [
          'from-red-600 to-indigo-900', // Spider classic
          'from-cyan-500 to-blue-900',  // Future spider
          'from-amber-500 to-red-900',  // Iron spider
          'from-purple-600 to-slate-900', // Prowler vibe
        ];
        const avatarColor = colors[base % colors.length];

        return {
          name: child,
          title,
          power,
          speed,
          fun,
          special: 'Super abraço e ataque de cócegas',
          avatarEmoji,
          avatarColor,
        };
      })
    : [
        {
          name: familia || 'Convidado Especial',
          title: 'HERÓI CONVIDADO',
          power: 99,
          speed: 95,
          fun: 100,
          special: 'Presença VIP de altíssimo impacto',
          avatarEmoji: '🦸‍♂️',
          avatarColor: 'from-red-600 to-indigo-900',
        }
      ];

  const currentCard = cards[activeIndex];
  const isFlipped = flippedIndex === activeIndex;

  const handleFlip = () => {
    setFlippedIndex(isFlipped ? null : activeIndex);
  };

  const handleNextCard = () => {
    setFlippedIndex(null);
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A0A1F 0%, #100015 50%, #05001A 100%)' }}
    >
      {/* Comic Halftone dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(229,57,53,0.06) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Speed lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1="200" y1="360"
              x2={200 + Math.cos(rad) * 600}
              y2={360 + Math.sin(rad) * 600}
              stroke="#E53935"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      <div className="relative z-10 w-full max-w-sm px-5 flex flex-col items-center gap-4">
        {/* Title */}
        <motion.div
          initial={{ x: '-110%', skewX: -15 }}
          animate={{ x: 0, skewX: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span
            className="text-spider-red-bright text-xs font-black uppercase tracking-[0.25em]"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.65rem' }}
          >
            // INVENTÁRIO DE EQUIPE //
          </span>
          <span
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2.3rem, 10vw, 3.2rem)',
              color: 'white',
              lineHeight: 0.9,
              textShadow: '3px 3px 0px #C0392B',
              display: 'block',
            }}
          >
            SEU CARD DE COMBATE
          </span>
        </motion.div>

        {/* 3D Card Container */}
        <div className="relative w-[280px] h-[390px] flex items-center justify-center my-2" style={{ perspective: 1200 }}>
          <motion.div
            onClick={handleFlip}
            className="relative w-full h-full cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* FRONT SIDE */}
            <div
              className="absolute inset-0 w-full h-full flex flex-col p-4 justify-between"
              style={{
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(155deg, #1A0D22 0%, #0A0A1F 100%)',
                border: '2px solid rgba(229,57,53,0.4)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 30px rgba(229,57,53,0.15)',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              }}
            >
              {/* Scanlines & Halftone overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px), radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                  backgroundSize: '100% 4px, 12px 12px'
                }}
              />

              {/* Card Header */}
              <div className="flex justify-between items-start border-b border-spider-red-bright/20 pb-2 z-10">
                <div>
                  <span className="text-[10px] text-spider-gold font-bold uppercase tracking-widest leading-none block">
                    {currentCard.title}
                  </span>
                  <h3 className="text-white text-lg font-black tracking-wide leading-tight mt-0.5">
                    {currentCard.name.toUpperCase()}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-spider-red/20 border border-spider-red-bright/40 text-xs font-bold text-white">
                  6★
                </div>
              </div>

              {/* Card Character Art (Placeholder with Silhouette) */}
              <div className="relative flex-1 my-3 flex items-center justify-center overflow-hidden border border-white/5 bg-black/40"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
              >
                {/* Holographic glowing background */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${currentCard.avatarColor} opacity-40 animate-pulse`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />

                {/* Character Silhouette / Vibe */}
                <div className="text-7xl drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] z-10 select-none animate-bounce-gentle">
                  {currentCard.avatarEmoji}
                </div>

                <div className="absolute bottom-2 left-2 right-2 text-center bg-black/60 py-1 px-2 border border-white/10 backdrop-blur-sm z-10">
                  <p className="text-[9px] text-white/50 uppercase tracking-widest">Sincronizando imagem...</p>
                </div>
              </div>

              {/* Card Footer / Short teaser */}
              <div className="flex flex-col gap-1 z-10 border-t border-spider-red-bright/20 pt-2 text-center">
                <p className="text-spider-gold text-[10px] uppercase font-bold tracking-widest animate-pulse">
                  TOQUE PARA DETALHES ↺
                </p>
              </div>
            </div>

            {/* BACK SIDE */}
            <div
              className="absolute inset-0 w-full h-full flex flex-col p-4 justify-between"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(155deg, #0D0D2B 0%, #1A0010 100%)',
                border: '2px solid rgba(255,215,0,0.4)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 30px rgba(255,215,0,0.1)',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              }}
            >
              {/* Back Header */}
              <div className="flex justify-between items-center border-b border-spider-gold/20 pb-2">
                <span className="text-[10px] text-spider-gold font-bold tracking-widest uppercase">
                  ATRIBUTOS DE MISSÃO
                </span>
                <Shield size={14} className="text-spider-gold" />
              </div>

              {/* Stats Rows */}
              <div className="flex-1 my-3 flex flex-col justify-center gap-3">
                {/* Stat 1: Poder */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white/80">
                    <span className="flex items-center gap-1"><Zap size={12} className="text-spider-gold" /> PODER</span>
                    <span>{currentCard.power}/100</span>
                  </div>
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-spider-gold"
                      initial={{ width: 0 }}
                      animate={isFlipped ? { width: `${currentCard.power}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Stat 2: Velocidade */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white/80">
                    <span className="flex items-center gap-1"><Zap size={12} className="text-cyan-400" /> VELOCIDADE</span>
                    <span>{currentCard.speed}/100</span>
                  </div>
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={isFlipped ? { width: `${currentCard.speed}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>

                {/* Stat 3: Diversão */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white/80">
                    <span className="flex items-center gap-1"><Heart size={12} className="text-pink-500" /> DIVERSÃO</span>
                    <span>{currentCard.fun}/100</span>
                  </div>
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={isFlipped ? { width: `${currentCard.fun}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </div>
                </div>

                {/* Special move */}
                <div className="mt-1 bg-black/30 p-2 border border-white/5 rounded">
                  <p className="text-[9px] text-spider-gold font-bold uppercase tracking-wider">Habilidade Especial:</p>
                  <p className="text-[11px] text-white/70 italic mt-0.5 leading-snug">{currentCard.special}</p>
                </div>
              </div>

              {/* Back Footer */}
              <div className="border-t border-spider-gold/20 pt-2 text-center">
                <p className="text-[10px] text-spider-gold/75 font-semibold">
                  VOLTAR AO DESTAQUE ↺
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Card info notification */}
        <p className="text-white/40 text-[10px] text-center max-w-[260px] leading-snug">
          💡 Este card oficial colecionável será <span className="text-spider-gold font-bold">impresso</span> e entregue a você na festa ao confirmar sua presença!
        </p>

        {/* Card Switcher for multiple kids */}
        {cards.length > 1 && (
          <button
            onClick={handleNextCard}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-[11px] text-spider-gold font-bold uppercase tracking-widest transition-all"
            style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
          >
            <RefreshCw size={10} />
            <span>Ver próximo card ({activeIndex + 1}/{cards.length})</span>
          </button>
        )}
      </div>

      <ComicPanelBottom />
      <NavButtons onNext={onNext} onPrev={onPrev} />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
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
  photo: string;
}

const getCardStyle = (index: number, total: number, activeIndex: number) => {
  const isActive = index === activeIndex;
  if (isActive) {
    return { rotate: 0, x: 0, y: -25, zIndex: 50 };
  }
  const diff = index - activeIndex;
  const spacing = total > 2 ? 80 : 95; // wider spacing for larger cards
  const offset = diff < 0 ? -22 : 22;
  const x = diff * spacing + offset;
  const rotate = diff * 8;
  const distance = Math.abs(diff);
  const zIndex = 30 - distance;
  const y = distance * 12;
  
  return { rotate, x, y, zIndex };
};

function HeroCard({
  card,
  index,
  total,
  onClick,
  activeIndex,
  entranceDone,
}: {
  card: CardData;
  index: number;
  total: number;
  onClick: () => void;
  activeIndex: number;
  entranceDone: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const isActive = index === activeIndex;

  const style = getCardStyle(index, total, activeIndex);

  return (
    <motion.div
      onClick={() => {
        if (!isActive) {
          onClick();
          setFlipped(false); // reset flip when selecting
        } else {
          setFlipped(!flipped);
        }
      }}
      initial={{ y: 350, opacity: 0, scale: 0.5 }}
      animate={{
        x: style.x,
        y: style.y,
        opacity: 1,
        rotate: style.rotate,
        scale: isActive ? 1.08 : 0.82,
        zIndex: style.zIndex,
      }}
      transition={{
        type: 'spring',
        stiffness: 110,
        damping: 16,
        delay: entranceDone ? 0 : 0.2 + index * 0.12,
      }}
      className="absolute cursor-pointer w-[235px] h-[330px]"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* FRONT (FUT GOLD PREMIUM WITH 85% PHOTO HEIGHT) */}
        <div
          className="absolute inset-0 w-full h-full p-[3px]"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #CFB53B 0%, #B71C1C 50%, #CFB53B 100%)',
            boxShadow: isActive
              ? '0 0 25px rgba(255,215,0,0.65), 0 0 45px rgba(229,57,53,0.4), 0 15px 35px rgba(0,0,0,0.85)'
              : '0 15px 35px rgba(0,0,0,0.7)',
            clipPath: 'polygon(0 12%, 50% 0, 100% 12%, 100% 88%, 50% 100%, 0 88%)',
            transition: 'box-shadow 0.3s ease-in-out',
          }}
        >
          {/* Inner container */}
          <div
            className="w-full h-full flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #1A0D22 0%, #0A0A1F 100%)',
              clipPath: 'polygon(0 12%, 50% 0, 100% 12%, 100% 88%, 50% 100%, 0 88%)',
            }}
          >
            {/* Holographic grid grid scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.15]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px), radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '100% 4px, 10px 10px'
              }}
            />

            {/* Photo Section: 100% Width and 85% Height */}
            <div className="relative w-full h-[85%] overflow-hidden bg-black border-b border-[#CFB53B]/20">
              <img
                src={card.photo}
                alt={card.name}
                className="w-full h-full object-cover object-top"
              />
              {/* Fade merge gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-transparent to-transparent z-10" />
            </div>

            {/* Name Section: Remaining 15% Height */}
            <div className="h-[15%] w-full flex items-center justify-center bg-black/35 pb-2.5">
              <h3
                className="text-spider-gold font-black tracking-widest leading-none truncate px-1 text-center uppercase"
                style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.25rem', textShadow: '1px 1px 0px rgba(0,0,0,0.85)' }}
              >
                {card.name}
              </h3>
            </div>
          </div>
        </div>

        {/* BACK (FUT SHIELD DESIGN - STATS VIEW) */}
        <div
          className="absolute inset-0 w-full h-full p-[3px]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #FFD700 0%, #B71C1C 50%, #FFD700 100%)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
            clipPath: 'polygon(0 12%, 50% 0, 100% 12%, 100% 88%, 50% 100%, 0 88%)',
          }}
        >
          {/* Inner container */}
          <div
            className="w-full h-full flex flex-col p-3.5 justify-between relative"
            style={{
              background: 'linear-gradient(160deg, #0D0D2B 0%, #1A0010 100%)',
              clipPath: 'polygon(0 12%, 50% 0, 100% 12%, 100% 88%, 50% 100%, 0 88%)',
            }}
          >
            {/* Header: padded for pointed top */}
            <div className="flex justify-between items-center border-b border-spider-gold/20 pb-1 pt-3.5 px-1">
              <span className="text-[8px] text-spider-gold font-black tracking-widest uppercase" style={{ fontFamily: 'var(--font-bebas)' }}>
                ATRIBUTOS DE COMBATE
              </span>
              <Shield size={10} className="text-spider-gold" />
            </div>

            {/* Stats list */}
            <div className="flex-1 my-3 flex flex-col justify-center gap-3 px-1.5">
              {/* Power */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[9px] font-bold text-white/80">
                  <span className="flex items-center gap-0.5"><Zap size={9} className="text-spider-gold" /> PODER</span>
                  <span>{card.power}/100</span>
                </div>
                <div className="h-1 bg-black/45 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-red-500 to-spider-gold" style={{ width: `${card.power}%` }} />
                </div>
              </div>

              {/* Speed */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[9px] font-bold text-white/80">
                  <span className="flex items-center gap-0.5"><Zap size={9} className="text-cyan-400" /> VELOCIDADE</span>
                  <span>{card.speed}/100</span>
                </div>
                <div className="h-1 bg-black/45 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${card.speed}%` }} />
                </div>
              </div>

              {/* Fun */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[9px] font-bold text-white/80">
                  <span className="flex items-center gap-0.5"><Heart size={9} className="text-pink-500" /> DIVERSÃO</span>
                  <span>{card.fun}/100</span>
                </div>
                <div className="h-1 bg-black/45 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500" style={{ width: `${card.fun}%` }} />
                </div>
              </div>

              {/* Special Ability */}
              <div className="bg-black/35 p-1.5 border border-white/5 rounded mt-1">
                <p className="text-[7.5px] text-spider-gold font-bold uppercase tracking-wider">Habilidade Especial:</p>
                <p className="text-[9.5px] text-white/70 italic leading-snug truncate">{card.special}</p>
              </div>
            </div>

            {/* Back footer */}
            <div className="border-t border-spider-gold/25 pt-1 pb-3.5 text-center">
              <span className="text-[7.5px] text-spider-gold/75 font-bold uppercase tracking-wider">
                VOLTAR ↺
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StepHeroCards({ onNext, onPrev, criancas = [], familia }: StepProps) {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [entranceDone, setEntranceDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setEntranceDone(true);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const photos = [
    '/images/lorenzo-1.jpg',
    '/images/lorenzo-2.jpg',
    '/images/lorenzo-3.jpg',
    '/images/lorenzo-4.jpg',
    '/images/lorenzo-5.jpg',
    '/images/lorenzo-6.jpg',
  ];

  // Generate cards based on children. If no children, create one for the family.
  const cards: CardData[] = criancas.length > 0 
    ? criancas.map((child, i) => {
        const base = child.length * 7 + i;
        const power = 85 + (base % 15);
        const speed = 80 + ((base + 3) % 20);
        const fun = 90 + ((base + 5) % 10);
        
        const badges = ['SUPER AMIGO', 'AGENTE DE COMBATE', 'HERÓI DA DIVERSÃO', 'ATIRADOR DE TEIA', 'MALA DE CHOQUE'];
        const title = badges[base % badges.length];

        const emojis = ['🦸‍♂️', '🦸‍♀️', '⚡', '🕷️', '🔥'];
        const avatarEmoji = emojis[base % emojis.length];

        const colors = [
          'from-red-600 to-indigo-900',
          'from-cyan-500 to-blue-900',
          'from-amber-500 to-red-900',
          'from-purple-600 to-slate-900',
        ];
        const avatarColor = colors[base % colors.length];
        const photo = photos[base % photos.length];

        return {
          name: child,
          title,
          power,
          speed,
          fun,
          special: 'Super abraço e teias de teias',
          avatarEmoji,
          avatarColor,
          photo,
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
          photo: '/images/lorenzo-hero.jpg',
        }
      ];

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

      <div className="relative z-10 w-full max-w-sm px-5 flex flex-col items-center gap-2">
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

        {/* 3D Card fanned container - size increased to support 235x330 cards */}
        <div className="relative w-full h-[360px] flex items-center justify-center my-3">
          {/* Left Arrow Button */}
          {cards.length > 1 && (
            <button
              onClick={() => {
                setActiveCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
                if (navigator.vibrate) navigator.vibrate(30);
              }}
              className="absolute left-0 z-30 w-10 h-10 rounded-full bg-black/75 border border-spider-gold/50 flex items-center justify-center text-spider-gold shadow-lg active:scale-90 transition-transform cursor-pointer"
              style={{ filter: 'drop-shadow(0 0 5px rgba(207,181,59,0.3))' }}
              aria-label="Card anterior"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Right Arrow Button */}
          {cards.length > 1 && (
            <button
              onClick={() => {
                setActiveCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
                if (navigator.vibrate) navigator.vibrate(30);
              }}
              className="absolute right-0 z-30 w-10 h-10 rounded-full bg-black/75 border border-spider-gold/50 flex items-center justify-center text-spider-gold shadow-lg active:scale-90 transition-transform cursor-pointer"
              style={{ filter: 'drop-shadow(0 0 5px rgba(207,181,59,0.3))' }}
              aria-label="Próximo card"
            >
              <ChevronRight size={20} />
            </button>
          )}

          <div className="relative w-[320px] h-full flex items-center justify-center">
            {cards.map((card, index) => {
              return (
                <HeroCard
                  key={index}
                  card={card}
                  index={index}
                  total={cards.length}
                  onClick={() => setActiveCardIndex(index)}
                  activeIndex={activeCardIndex}
                  entranceDone={entranceDone}
                />
              );
            })}
          </div>
        </div>

        {/* Card info notification without printing mention */}
        <p className="text-white/40 text-[9px] text-center max-w-[260px] leading-snug mt-1">
          💡 Toque na carta selecionada para ver seus atributos de missão e habilidades secretas!
        </p>

        {/* Card Switcher dots for multiple kids */}
        {cards.length > 1 && (
          <div className="flex gap-1.5 mt-2 z-20">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveCardIndex(i)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  background: activeCardIndex === i ? '#FFD700' : 'rgba(255,255,255,0.25)',
                  transform: activeCardIndex === i ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      <ComicPanelBottom />
      <NavButtons onNext={onNext} onPrev={onPrev} />
    </div>
  );
}

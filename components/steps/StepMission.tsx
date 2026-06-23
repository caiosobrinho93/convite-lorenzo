'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StepProps } from '../InviteExperience';

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

type Phase = 'off' | 'scanning' | 'scan_done' | 'biometry_fadeout' | 'typing' | 'fade_console' | 'delay_portal' | 'reveal_cards' | 'ready';

const getIntroCardStyle = (index: number, total: number, activeIndex: number) => {
  const isActive = index === activeIndex;
  if (isActive) {
    return { rotate: 0, x: 0, y: -20, zIndex: 50 };
  }
  
  const diff = index - activeIndex;
  const spacing = total > 2 ? 65 : 80;
  const offset = diff < 0 ? -18 : 18;
  const x = diff * spacing + offset;
  const rotate = diff * 8;
  const distance = Math.abs(diff);
  const zIndex = 30 - distance;
  const y = distance * 10;
  
  return { rotate, x, y, zIndex };
};

/* ─── MARVEL BATTLEFIELD GLOW BACKGROUND ─────────────────── */
function BattlefieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let embers: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedX: number;
      speedY: number;
      color: string;
      wiggle: number;
      wiggleSpeed: number;
    }> = [];

    const initEmbers = () => {
      embers = [];
      const count = 60;
      const colors = [
        'rgba(229, 57, 53, ',   // Red
        'rgba(244, 81, 30, ',   // Deep Orange
        'rgba(255, 179, 0, ',   // Gold
        'rgba(255, 235, 59, ',  // Bright Yellow
      ];
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.8 + 0.8;
        const colorBase = colors[Math.floor(Math.random() * colors.length)];

        embers.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 100,
          size,
          opacity: Math.random() * 0.7 + 0.3,
          speedX: (Math.random() - 0.3) * 0.6,
          speedY: -(Math.random() * 1.2 + 0.6),
          color: colorBase,
          wiggle: Math.random() * Math.PI * 2,
          wiggleSpeed: Math.random() * 0.04 + 0.01,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initEmbers();
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = '#060309';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grad1 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.8, 0,
        canvas.width * 0.2, canvas.height * 0.8, canvas.width * 0.8
      );
      grad1.addColorStop(0, 'rgba(183, 28, 28, 0.18)');
      grad1.addColorStop(0.5, 'rgba(40, 10, 15, 0.08)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grad2 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.2, 0,
        canvas.width * 0.8, canvas.height * 0.2, canvas.width * 0.8
      );
      grad2.addColorStop(0, 'rgba(48, 63, 159, 0.12)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      embers.forEach(ember => {
        ember.wiggle += ember.wiggleSpeed;
        ember.x += ember.speedX + Math.sin(ember.wiggle) * 0.25;
        ember.y += ember.speedY;

        ctx.save();
        ctx.shadowBlur = ember.size * 2.5;
        ctx.shadowColor = ember.color.includes('255, 179') || ember.color.includes('255, 235') ? '#FFD700' : '#E53935';
        ctx.fillStyle = `${ember.color}${ember.opacity})`;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (ember.y < -20 || ember.x < -20 || ember.x > canvas.width + 20) {
          ember.y = canvas.height + Math.random() * 40;
          ember.x = Math.random() * canvas.width;
          ember.opacity = Math.random() * 0.7 + 0.3;
        }

        ember.opacity += (Math.random() - 0.5) * 0.05;
        if (ember.opacity < 0.15) ember.opacity = 0.15;
        if (ember.opacity > 0.9) ember.opacity = 0.9;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

export default function StepMission({ familia, criancas = [], onNext }: StepProps) {
  const kidsToRender = criancas.length > 0 ? criancas : ['LUCAS', 'MELISSA', 'GUSTAVO'];

  const [phase, setPhase] = useState<Phase>('off');
  const [scanPercentage, setScanPercentage] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(() => {
    return Math.floor(kidsToRender.length / 2);
  });
  const [entranceDone, setEntranceDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isScanning = phase === 'scanning';
  const isScanDone = phase === 'scan_done';

  // Bio-sensor boot action
  const startBoot = () => {
    if (navigator.vibrate) navigator.vibrate([100, 30, 100]);
    setPhase('scanning');
  };

  // Scanning simulation (0% to 100%)
  useEffect(() => {
    if (phase !== 'scanning') return;
    setScanPercentage(0);
    const duration = 1600; // 1.6s scanning time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const percent = Math.min(Math.round((currentStep / steps) * 100), 100);
      setScanPercentage(percent);

      if (percent === 100) {
        clearInterval(interval);
        if (navigator.vibrate) navigator.vibrate([150, 80, 150]);
        setTimeout(() => {
          setPhase('scan_done');
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [phase]);

  // Transition from scan_done to biometry_fadeout
  useEffect(() => {
    if (phase === 'scan_done') {
      const t = setTimeout(() => {
        setPhase('biometry_fadeout');
      }, 2000); // show success green check for 2.0s
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Transition from biometry_fadeout to typing
  useEffect(() => {
    if (phase === 'biometry_fadeout') {
      const t = setTimeout(() => {
        setPhase('typing');
      }, 600); // wait for 600ms exit fadeout of biometry
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Cards generation - Dynamic or Simulated family of 3 children
  const photos = [
    '/images/lorenzo-1.jpg',
    '/images/lorenzo-2.jpg',
    '/images/lorenzo-3.jpg',
    '/images/lorenzo-4.jpg',
    '/images/lorenzo-5.jpg',
    '/images/lorenzo-6.jpg',
  ];

  const cards = kidsToRender.map((child, i) => {
    const base = child.length * 7 + i;
    const badges = ['SUPER AMIGO', 'HERÓI DA DIVERSÃO', 'AGENTE DE COMBATE', 'ATIRADOR DE TEIA', 'MALA DE CHOQUE'];
    const title = badges[base % badges.length];
    const photo = photos[base % photos.length];
    return {
      name: child.toUpperCase(),
      title,
      photo,
    };
  });

  const displayName = criancas.length > 0
    ? (criancas.length === 1 ? criancas[0] : criancas.join(' & '))
    : familia;

  const subText = criancas.length > 0
    ? (criancas.length === 1 ? 'Você foi selecionado para esta missão.' : 'Vocês foram selecionados para esta missão.')
    : 'Sua presença é essencial para esta missão.';

  // Terminal typewriter sequence
  useEffect(() => {
    if (phase !== 'typing') return;

    const lines = [
      '[SISTEMA] INICIANDO DIAGNÓSTICO DO MULTIVERSO...',
      '[OK] LINK SEGURO DE CONEXÃO: ESTABELECIDO',
      '[AVISO] FLUXO ENERGÉTICO VARIÁVEL DETECTADO',
      '[SISTEMA] VERIFICANDO CREDENCIAIS DO GEST...',
      '[OK] SUCESSO: AGENTES CONFIRMADOS E AUTENTICADOS!',
      '[SISTEMA] CONFIGURANDO DIRETRIZES DA MISSÃO...'
    ];

    let timers: NodeJS.Timeout[] = [];
    setTerminalLines([]);

    lines.forEach((line, idx) => {
      const t = setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
        if (navigator.vibrate) navigator.vibrate(25);

        if (idx === lines.length - 1) {
          const autoTransition = setTimeout(() => {
            setPhase('fade_console');
          }, 2100); // Wait 2.1s (1s longer) after typing finishes
          timers.push(autoTransition);
        }
      }, idx * 500 + 600);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Transition from fade_console to delay_portal (0.6s wait)
  useEffect(() => {
    if (phase === 'fade_console') {
      const t = setTimeout(() => {
        setPhase('delay_portal');
      }, 600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Transition from delay_portal to reveal_cards (portal & cards activate)
  useEffect(() => {
    if (phase === 'delay_portal') {
      const t = setTimeout(() => {
        setPhase('reveal_cards');
        if (navigator.vibrate) navigator.vibrate([150, 80, 200]);
      }, 600); // exactly 0.6 seconds wait
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Transition from reveal_cards to ready
  useEffect(() => {
    if (phase === 'reveal_cards') {
      const t = setTimeout(() => {
        setPhase('ready');
      }, 1900);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Set entranceDone when ready phase is reached
  useEffect(() => {
    if (phase === 'ready') {
      setEntranceDone(true);
    }
  }, [phase]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center bg-black"
    >
      {/* ─── BACKGROUNDS ─── */}

      {/* Cyber Grid & Intro BG (Only shown on initial phases) */}
      <AnimatePresence>
        {(phase === 'off' || phase === 'scanning' || phase === 'scan_done' || phase === 'biometry_fadeout' || phase === 'typing' || phase === 'fade_console') && (
          <motion.div
            key="cyber-intro-bg"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {/* Background Image (Teia Vermelha) */}
            <img
              src="/images/intro-bg.png"
              alt=""
              className="w-full h-full object-cover"
              style={{
                opacity: (phase === 'off' || phase === 'scanning' || phase === 'scan_done') ? 0.25 : 0.08,
                transition: 'opacity 1s ease-in-out',
              }}
            />

            {/* Cyber Grid Lines */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'linear-gradient(rgba(229,57,53,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(229,57,53,0.15) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Halftone Dot Overlay */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                mixBlendMode: 'overlay',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marvel Battlefield Background (Embers/Smoke active on reveal_cards & ready) */}
      {(phase === 'reveal_cards' || phase === 'ready') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <BattlefieldBackground />
        </motion.div>
      )}

      {/* CRT Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
          zIndex: 25,
        }}
      />

      {/* ─── SCREEN 1 & 2: BIO-SENSOR / SCANNING (UNIFIED, CENTERED & SOLID SPACING) ─── */}
      <AnimatePresence>
        {(phase === 'off' || phase === 'scanning' || phase === 'scan_done') && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center select-none w-full px-6"
          >
            {/* Expanded glowing aura that brightens the background on scan */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={(isScanning || isScanDone) ? {
                scale: 3.5,
                opacity: isScanDone ? [0.35, 0.55, 0.45] : [0, 0.45, 0.35],
              } : {
                scale: 0.6,
                opacity: 0,
              }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className={`absolute rounded-full pointer-events-none ${isScanDone ? 'bg-[radial-gradient(circle,_rgba(52,211,153,0.25)_0%,_rgba(250,204,21,0.1)_45%,_transparent_70%)]' : 'bg-[radial-gradient(circle,_rgba(255,215,0,0.25)_0%,_rgba(229,57,53,0.1)_45%,_transparent_70%)]'}`}
              style={{
                width: '140px',
                height: '140px',
                zIndex: 0,
                left: 'calc(50% - 70px)',
                top: 'calc(50% - 138px)',
              }}
            />

            {/* Glowing Biometric Button Wrapper - Centered perfectly with Margin Bottom for Spacing */}
            <div className="relative flex items-center justify-center z-10 w-full mb-14">
              <motion.div
                animate={isScanning ? {
                  scale: 1.85,
                  boxShadow: [
                    '0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(229,57,53,0.3)',
                    '0 0 60px rgba(255,215,0,0.7), 0 0 100px rgba(229,57,53,0.5)',
                    '0 0 45px rgba(255,215,0,0.5), 0 0 80px rgba(229,57,53,0.4)'
                  ],
                  borderColor: 'rgba(255,215,0,0.75)',
                } : isScanDone ? {
                  scale: 1.85,
                  boxShadow: '0 0 50px rgba(52,211,153,0.75), 0 0 100px rgba(250,204,21,0.55)',
                  borderColor: 'rgb(52,211,153)',
                } : {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 15px rgba(229,57,53,0.25)',
                    '0 0 40px rgba(229,57,53,0.6)',
                    '0 0 15px rgba(229,57,53,0.25)'
                  ],
                  borderColor: 'rgba(229,57,53,0.4)',
                }}
                transition={isScanning ? {
                  type: 'spring',
                  stiffness: 70,
                  damping: 14,
                  boxShadow: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
                } : isScanDone ? {
                  type: 'spring',
                  stiffness: 70,
                  damping: 14,
                } : {
                  scale: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                  boxShadow: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
                }}
                onClick={startBoot}
                className="w-28 h-28 rounded-full border-2 flex items-center justify-center cursor-pointer bg-black/90 relative overflow-hidden mx-auto"
              >
                {/* Glowing Spider logo in center */}
                <motion.img
                  src="/images/intro-bg.png"
                  alt="Logo"
                  animate={isScanning ? {
                    scale: 1.15,
                    filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.85))'
                  } : isScanDone ? {
                    scale: 1.15,
                    filter: 'drop-shadow(0 0 15px rgba(52,211,153,0.95))'
                  } : {
                    scale: 1,
                    filter: 'drop-shadow(0 0 8px rgba(229,57,53,0.5))'
                  }}
                  transition={{ type: 'spring', stiffness: 80, damping: 14 }}
                  className="w-16 h-16 object-contain z-10"
                />

                {/* Ping animation ring (visible only when OFF) */}
                {(!isScanning && !isScanDone) && (
                  <div className="absolute inset-0 rounded-full border border-spider-red-bright/20 animate-ping opacity-40 z-0" />
                )}
              </motion.div>

              {/* Water Ripple Waves (Looping continuously during scan) */}
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  {[0, 1, 2, 3].map((idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.35, opacity: 0.9 }}
                      animate={{
                        scale: 3.8,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1.8,
                        ease: [0.1, 0.45, 0.1, 1],
                        repeat: Infinity,
                        delay: idx * 0.45,
                      }}
                      className="absolute rounded-full border-2 border-spider-gold/45 bg-gradient-to-r from-spider-red/8 to-spider-gold/12"
                      style={{
                        width: '120px',
                        height: '120px',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Swapping Info text */}
            <div className="h-[85px] w-full flex items-center justify-center pt-2">
              <AnimatePresence mode="wait">
                {phase === 'off' ? (
                  <motion.div
                    key="text-off"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1 w-full"
                  >
                    <span className="text-spider-red-bright text-[9px] uppercase font-bold tracking-[0.25em] animate-pulse block">
                      // AUTENTICAÇÃO REQUERIDA //
                    </span>
                    <h1 className="text-white text-md font-black tracking-widest uppercase" style={{ fontFamily: 'var(--font-bebas)' }}>
                      Acesso Restrito
                    </h1>
                    <p className="text-white/40 text-[9px] max-w-[220px] leading-normal mx-auto">
                      Toque no sensor biométrico acima para validar a sua credencial de herói.
                    </p>
                  </motion.div>
                ) : phase === 'scan_done' ? (
                  <motion.div
                    key="text-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1 w-full"
                  >
                    <span className="text-emerald-400 text-[9px] uppercase font-bold tracking-[0.25em] block">
                      ✓ IMPRESSÃO DIGITAL VERIFICADA ✓
                    </span>
                    <h1 className="text-spider-gold text-md font-black tracking-widest uppercase" style={{ fontFamily: 'var(--font-bebas)', textShadow: '0 0 10px rgba(250,204,21,0.4)' }}>
                      Acesso Liberado!
                    </h1>
                    <p className="text-emerald-400/60 text-[9px] font-mono max-w-[220px] leading-normal mx-auto animate-pulse">
                      Carregando terminal de segurança...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="text-scan"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1 w-full"
                  >
                    <span className="text-spider-gold text-[10px] font-mono uppercase tracking-[0.25em] block animate-pulse">
                      // ANALISANDO IMPRESSÃO DIGITAL //
                    </span>
                    <div className="text-white text-md font-mono font-bold tracking-widest uppercase">
                      AUTENTICANDO: <span className="text-spider-red-bright">{scanPercentage}%</span>
                    </div>
                    <p className="text-white/40 text-[9px] font-mono max-w-[220px] leading-normal mx-auto">
                      Decodificando chaves de acesso e assinaturas biométricas...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SCREEN 3: OS-STYLE REALISTIC TERMINAL ─── */}
      <AnimatePresence>
        {(phase === 'typing' || phase === 'fade_console') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: phase === 'fade_console' ? 0 : 1, scale: phase === 'fade_console' ? 0.95 : 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-start max-w-sm mx-auto px-6 py-12 select-none"
          >
            {/* OS-Style Terminal Window Chrome */}
            <div className="w-full mt-6 rounded-lg border border-white/10 overflow-hidden bg-black/85 shadow-[0_15px_35px_rgba(0,0,0,0.85),_0_0_25px_rgba(229,57,53,0.05)] font-mono">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#120F16] border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E] block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29] block" />
                </div>
                <span className="text-[9px] text-white/35 font-bold uppercase tracking-wider">MULTIVERSE_DECODE.SH</span>
                <div className="w-10" />
              </div>

              {/* Terminal Body */}
              <div className="p-4 space-y-2 min-h-[160px] text-left">
                {terminalLines.map((line, idx) => {
                  let colorClass = 'text-white/60';
                  if (line.includes('[OK]') || line.includes('CONFIRMADOS') || line.includes('AUTENTICADOS')) {
                    colorClass = 'text-spider-gold font-bold';
                  } else if (line.includes('[SISTEMA]') || line.includes('DIAGNÓSTICO')) {
                    colorClass = 'text-cyan-400';
                  } else if (line.includes('[AVISO]')) {
                    colorClass = 'text-[#FFBD2E]';
                  }
                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`text-[9px] leading-relaxed ${colorClass}`}
                    >
                      {line}
                    </motion.p>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SCREEN 4: CARDS REVEAL (DEEP MARVEL BATTLEFIELD + PORTAL) ─── */}
      {(phase === 'reveal_cards' || phase === 'ready') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65 }}
          className="relative z-10 flex flex-col items-center justify-between h-full w-full max-w-sm px-6 py-12 select-none"
        >
          {/* Header */}
          <div className="text-center pt-2">
            <span
              className="text-spider-red-bright text-[9px] font-black uppercase tracking-[0.25em] block"
              style={{ letterSpacing: '0.28em' }}
            >
              ★ AGENTE CONVOCADO ★
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(1.5rem, 7vw, 2.2rem)',
                color: 'white',
                lineHeight: 1,
                marginTop: '2px',
                textShadow: '2px 2px 0px rgba(0,0,0,0.8)',
              }}
            >
              CREDENCIAL MULTIVERSAL
            </h2>
          </div>

          {/* Cards fan container - adjusted for clickable card swap layout */}
          <div className="relative w-full h-[310px] flex items-center justify-center my-1">
            {/* Left Arrow Button */}
            {cards.length > 1 && (
              <button
                onClick={() => {
                  setActiveCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
                  if (navigator.vibrate) navigator.vibrate(30);
                }}
                className="absolute left-0 z-30 w-9 h-9 rounded-full bg-black/75 border border-spider-gold/50 flex items-center justify-center text-spider-gold shadow-lg active:scale-90 transition-transform cursor-pointer"
                style={{ filter: 'drop-shadow(0 0 5px rgba(207,181,59,0.3))' }}
                aria-label="Card anterior"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            {/* Right Arrow Button */}
            {cards.length > 1 && (
              <button
                onClick={() => {
                  setActiveCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
                  if (navigator.vibrate) navigator.vibrate(30);
                }}
                className="absolute right-0 z-30 w-9 h-9 rounded-full bg-black/75 border border-spider-gold/50 flex items-center justify-center text-spider-gold shadow-lg active:scale-90 transition-transform cursor-pointer"
                style={{ filter: 'drop-shadow(0 0 5px rgba(207,181,59,0.3))' }}
                aria-label="Próximo card"
              >
                <ChevronRight size={18} />
              </button>
            )}
            
            {/* Multiverse Sparking Portal (Doctor Strange Style) */}
            <div className="absolute w-[310px] h-[310px] flex items-center justify-center pointer-events-none z-0">
              {/* Outer sparking fire ring */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                className="absolute w-full h-full"
                viewBox="0 0 200 200"
              >
                <defs>
                  <linearGradient id="portalGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="30%" stopColor="#FF8C00" />
                    <stop offset="70%" stopColor="#FF4500" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  stroke="url(#portalGold)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="12 6 4 8 20 5"
                  className="opacity-95"
                  style={{ filter: 'drop-shadow(0 0 8px #FF8C00)' }}
                />
              </motion.svg>

              {/* Inner counter-rotating spark ring */}
              <motion.svg
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                className="absolute w-[94%] h-[94%]"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  stroke="url(#portalGold)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="2 15 8 10 5 18"
                  className="opacity-90"
                  style={{ filter: 'drop-shadow(0 0 12px #FF4500)' }}
                />
              </motion.svg>

              {/* Glowing plasma backdrop */}
              <motion.div
                animate={{
                  scale: [0.97, 1.03, 0.97],
                  opacity: [0.35, 0.5, 0.35],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-[82%] h-[82%] rounded-full bg-[radial-gradient(circle,_rgba(255,140,0,0.22)_0%,_rgba(229,57,53,0.12)_50%,_transparent_75%)]"
                style={{
                  boxShadow: '0 0 40px rgba(255,140,0,0.25), inset 0 0 30px rgba(229,57,53,0.15)',
                  filter: 'blur(4px)',
                }}
              />
              
              {/* Sparks particles */}
              <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '4s' }}>
                <div className="absolute top-4 left-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700]" />
                <div className="absolute bottom-6 left-1/3 w-1 h-1 rounded-full bg-[#FF4500] shadow-[0_0_6px_#FF4500]" />
              </div>
              <div className="absolute w-[90%] h-[90%] animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
                <div className="absolute top-12 right-1/4 w-1 h-1 rounded-full bg-[#FF8C00] shadow-[0_0_6px_#FF8C00]" />
                <div className="absolute bottom-12 left-1/4 w-1.5 h-1.5 rounded-full bg-[#FFF] shadow-[0_0_10px_#FFD700]" />
              </div>
            </div>

            {/* Clickable Card Fan Deck of 3 Children */}
            <div className="relative w-[260px] h-full flex items-center justify-center z-10">
              {cards.map((card, index) => {
                const isActive = activeCardIndex === index;
                const style = getIntroCardStyle(index, cards.length, activeCardIndex);

                return (
                  <motion.div
                    key={index}
                    initial={{ y: 400, opacity: 0, scale: 0.4, rotate: 0, x: 0 }}
                    animate={{
                      y: style.y,
                      opacity: 1,
                      scale: isActive ? 1.08 : 0.82,
                      rotate: style.rotate,
                      x: style.x,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 110,
                      damping: 16,
                      delay: entranceDone ? 0 : 0.3 + index * 0.15, // Staggered only on entrance!
                    }}
                    onClick={() => setActiveCardIndex(index)}
                    className="absolute cursor-pointer w-[180px] h-[250px]"
                    style={{
                      zIndex: style.zIndex,
                      perspective: 1000,
                    }}
                  >
                    {/* Card Outer Shell - Style C: Gold Premium Metal Border (3px thick) */}
                    <div
                      className="w-full h-full p-[3px] justify-between"
                      style={{
                        background: 'linear-gradient(135deg, #CFB53B 0%, #B71C1C 50%, #CFB53B 100%)',
                        boxShadow: isActive
                          ? '0 0 25px rgba(255,215,0,0.65), 0 0 45px rgba(229,57,53,0.4), 0 10px 30px rgba(0,0,0,0.85)'
                          : '0 15px 35px rgba(0,0,0,0.8)',
                        clipPath: 'polygon(0 12%, 50% 0, 100% 12%, 100% 88%, 50% 100%, 0 88%)',
                        transition: 'box-shadow 0.3s ease-in-out',
                      }}
                    >
                      {/* Card Inner Container */}
                      <div
                        className="w-full h-full flex flex-col justify-between relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(160deg, #15151A 0%, #08080C 100%)',
                          clipPath: 'polygon(0 12%, 50% 0, 100% 12%, 100% 88%, 50% 100%, 0 88%)',
                        }}
                      >
                        {/* Carbon fiber subtle pattern background */}
                        <div
                          className="absolute inset-0 opacity-[0.05] pointer-events-none"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, #FFF 0px, #FFF 1px, transparent 1px, transparent 4px)',
                            backgroundSize: '4px 4px',
                          }}
                        />

                        {/* Image section: 100% width and 85% height of inner container */}
                        <div className="relative w-full h-[85%] overflow-hidden bg-black border-b border-[#CFB53B]/20">
                          <img
                            src={card.photo}
                            alt={card.name}
                            className="w-full h-full object-cover object-top"
                          />
                          {/* Dark overlay at bottom of photo to merge */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent z-10" />
                        </div>

                        {/* Info Name section: 15% height of inner container */}
                        <div className="h-[15%] w-full flex items-center justify-center bg-black/35 pb-2.5">
                          <h3
                            className="text-spider-gold font-black tracking-widest leading-none truncate px-1 text-center uppercase"
                            style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.05rem', textShadow: '1px 1px 0px rgba(0,0,0,0.85)' }}
                          >
                            {card.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Subtext */}
          <div className="text-center max-w-[260px] mx-auto pt-2">
            <ChromaticText
              text={displayName.toUpperCase()}
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(1.5rem, 6.5vw, 2.2rem)',
                color: '#FFD700',
                letterSpacing: '0.04em',
                lineHeight: 1,
                textShadow: '2px 2px 0px #C0392B, 4px 4px 0px rgba(0,0,0,0.6)',
              }}
            />
            <p className="text-white/60 text-[11px] leading-normal font-light pt-1.5" style={{ fontFamily: 'var(--font-inter)' }}>
              {subText}
            </p>
          </div>

          {/* Accept Button fade-in */}
          <div className="w-full min-h-[85px] flex flex-col items-center justify-end">
            <AnimatePresence>
              {phase === 'ready' && (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={onNext}
                    className="relative overflow-hidden w-full py-4.5 flex items-center justify-between px-6 group cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #C0392B 0%, #E53935 100%)',
                      clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)',
                      boxShadow: '0 0 40px rgba(229,57,53,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                  >
                    <motion.div
                      initial={{ x: '-200%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', width: '50%' }}
                    />
                    <span
                      className="text-white font-black tracking-widest"
                      style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.3rem', letterSpacing: '0.12em' }}
                    >
                      ACEITAR MISSÃO
                    </span>
                    <span className="text-white text-xl">▶</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Bottom edge color ribbon */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #C0392B, #FFD700, #1A237E)', zIndex: 10 }}
      />
    </div>
  );
}

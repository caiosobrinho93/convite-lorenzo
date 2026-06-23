'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, Loader2, Heart, MessageSquare, ChevronRight, Check } from 'lucide-react';
import { StepProps } from '../InviteExperience';

/* ─── SPECTACULAR SUCCESS VIEW ────────────────────────────────────── */
function SuccessView({ familia, confirmados }: { familia: string; confirmados: string[] }) {
  // Simple custom barcode generator using vertical stripes
  const barcodePattern = [2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 2, 4, 1, 3, 2, 1, 4, 2];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center w-full max-w-sm px-2 gap-5"
    >
      {/* VIP Credential Pass */}
      <div
        className="w-full relative overflow-hidden p-6 flex flex-col justify-between"
        style={{
          background: 'linear-gradient(155deg, #120A2C 0%, #060616 100%)',
          border: '2px solid rgba(255, 215, 0, 0.55)',
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
          boxShadow: '0 25px 60px rgba(0,0,0,0.85), inset 0 0 35px rgba(255, 215, 0, 0.08)',
        }}
      >
        {/* Hologram overlay grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,215,0,0.05) 3px, rgba(255,215,0,0.05) 6px), radial-gradient(circle, rgba(255,215,0,0.05) 1px, transparent 1px)',
            backgroundSize: '100% 6px, 16px 16px',
          }}
        />

        {/* Outer glowing checkmark badge */}
        <div className="flex flex-col items-center text-center mt-2 mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-spider-gold to-amber-600 shadow-lg mb-3"
            style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)' }}
          >
            <Check size={28} className="text-black stroke-[3.5]" />
          </motion.div>

          <span
            className="text-spider-gold text-[10px] font-black uppercase tracking-[0.3em] block"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.3em' }}
          >
            ★ CREDENCIAL ATIVA ★
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2.4rem, 9vw, 3rem)',
              color: 'white',
              lineHeight: 1,
              marginTop: '4px',
            }}
          >
            PASSE DE EMBARQUE
          </h2>
        </div>

        {/* Clean pass details */}
        <div className="space-y-4 pt-4 border-t border-spider-gold/20 flex-1">
          {/* Guest Name */}
          <div className="text-center">
            <span className="text-white/40 text-[9px] uppercase tracking-widest block" style={{ fontFamily: 'var(--font-bebas)' }}>
              EQUIPE CONVOCADA
            </span>
            <span
              className="text-white text-2xl font-black block mt-0.5"
              style={{
                fontFamily: 'var(--font-bebas)',
                letterSpacing: '0.05em',
                textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
              }}
            >
              {familia.toUpperCase()}
            </span>
          </div>

          {/* Sub-agents confirmed */}
          {confirmados.length > 0 && (
            <div className="text-center">
              <span className="text-white/30 text-[8px] uppercase tracking-widest block" style={{ fontFamily: 'var(--font-bebas)' }}>
                AGENTES OFICIAIS
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center mt-1.5">
                {confirmados.map(n => (
                  <span
                    key={n}
                    className="px-2.5 py-0.5 text-[11px] font-semibold text-white bg-white/5 border border-white/10"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))' }}
                  >
                    🦸 {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Futuristic Barcode section */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col items-center gap-2">
          {/* Barcode drawing */}
          <div className="flex items-stretch justify-center h-10 w-44 bg-white/5 px-2 py-1.5 rounded">
            {barcodePattern.map((width, idx) => (
              <div
                key={idx}
                className="bg-spider-gold/75"
                style={{
                  width: width,
                  marginRight: idx % 3 === 0 ? '3px' : '1px',
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] text-spider-gold/50 tracking-[0.25em]">
            LORENZO-6-2026
          </span>
        </div>
      </div>

      {/* Screenshot note */}
      <p className="text-white/40 text-[10px] text-center max-w-[250px] leading-relaxed">
        📸 Tire um print deste cartão credencial para apresentar na entrada secreta do aniversário!
      </p>

      {/* Heart footer */}
      <div className="flex items-center gap-1 mt-1 text-white/30 text-xs">
        <Heart size={12} className="text-spider-red-bright fill-current" />
        <span>O Lorenzo mal pode esperar por você!</span>
        <Heart size={12} className="text-spider-red-bright fill-current" />
      </div>
    </motion.div>
  );
}

/* ─── MAIN STEP ─────────────────────────────────────────────────────── */
export default function StepRSVP({
  token,
  familia,
  criancas = [],
  jaConfirmado,
  confirmadosAnteriores = [],
  onPrev,
  confettiRef,
}: StepProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(confirmadosAnteriores));
  const [observacao, setObservacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [finalConfirmados, setFinalConfirmados] = useState<string[]>(confirmadosAnteriores);
  const [error, setError] = useState('');
  const [showObs, setShowObs] = useState(false);

  // States: 'form' | 'explosive-web' | 'explosive-slam' | 'success'
  const [rsvpState, setRsvpState] = useState<'form' | 'explosive-web' | 'explosive-slam' | 'success'>(
    jaConfirmado ? 'success' : 'form'
  );

  const toggle = (n: string) => setSelected(p => {
    const next = new Set(p);
    next.has(n) ? next.delete(n) : next.add(n);
    return next;
  });

  const confirm = async () => {
    if (selected.size === 0 && criancas.length > 0) {
      setError('Selecione pelo menos uma pessoa.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/confirmar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, confirmados: Array.from(selected), observacao }),
      });
      if (!res.ok) throw new Error();
      setFinalConfirmados(Array.from(selected));
      
      // Step 1: Shoot webs
      setRsvpState('explosive-web');
      if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);

      // Step 2: Badge slam and explosion after 700ms
      setTimeout(() => {
        setRsvpState('explosive-slam');
        confettiRef?.current?.fire();
        if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);
      }, 700);

      // Step 3: Fade in final success pass after 2400ms
      setTimeout(() => {
        setRsvpState('success');
      }, 2400);

    } catch {
      setError('Ops! Algo deu errado. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #08081A 0%, #0C0020 100%)' }}
    >
      {/* Halftone BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          zIndex: 2,
        }}
      />

      <div className="relative z-10 w-full max-w-sm px-4 flex flex-col gap-3 items-center">
        <AnimatePresence mode="wait">
          {/* ─── STATE 1: FORM ───────────────────────────── */}
          {rsvpState === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col gap-3"
            >
              {/* Header */}
              <motion.div
                initial={{ x: '-110%', skewX: -15 }}
                animate={{ x: 0, skewX: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="text-spider-red-bright text-xs uppercase tracking-[0.25em]"
                  style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.65rem', letterSpacing: '0.25em' }}
                >
                  // CONFIRMAÇÃO DE PRESENÇA //
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 'clamp(2.5rem, 11vw, 3.5rem)',
                    color: 'white',
                    lineHeight: 0.88,
                    textShadow: '3px 3px 0px #C0392B',
                    display: 'block',
                  }}
                >
                  CONFIRMAR PRESENÇA
                </span>
                <p className="text-white/50 text-sm mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
                  Olá, <span className="text-white font-semibold">{familia}</span>! 👋 Confirme quem estará presente nesta grande missão especial.
                </p>
              </motion.div>

              {/* Checkboxes */}
              {criancas.length > 0 && (
                <div
                  className="p-4 relative overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(229,57,53,0.15)',
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                  }}
                >
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: 0,
                      height: 0,
                      borderStyle: 'solid',
                      borderWidth: '0 24px 24px 0',
                      borderColor: 'transparent rgba(229,57,53,0.4) transparent transparent',
                    }}
                  />
                  <div className="flex items-center gap-1.5 mb-2">
                    <Users size={12} style={{ color: '#FFD700' }} />
                    <span
                      className="text-white/40 text-[9px] uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.55rem', letterSpacing: '0.22em' }}
                    >
                      Confirmar presença de:
                    </span>
                  </div>
                  {criancas.map(c => {
                    const on = selected.has(c);
                    return (
                      <motion.button
                        key={c}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggle(c)}
                        className="flex items-center gap-3 p-2.5 w-full text-left mb-2 last:mb-0"
                        style={{
                          background: on ? 'rgba(229,57,53,0.12)' : 'rgba(255,255,255,0.02)',
                          border: on ? '1px solid rgba(229,57,53,0.4)' : '1px solid rgba(255,255,255,0.05)',
                          clipPath: on ? 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div
                          className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                          style={{
                            background: on ? 'linear-gradient(135deg, #C0392B, #E53935)' : 'rgba(255,255,255,0.07)',
                            border: on ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                            clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))',
                          }}
                        >
                          {on && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white text-xs font-bold">✓</motion.span>}
                        </div>
                        <span className="text-white text-sm font-medium flex-1">{c}</span>
                        {on && (
                          <motion.span initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} className="text-lg">🦸</motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Observation */}
              <button
                onClick={() => setShowObs(p => !p)}
                className="flex items-center gap-2 text-white/35 text-xs self-start px-1 transition-colors hover:text-white/60"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <MessageSquare size={11} />
                {showObs ? 'Esconder observação' : '+ Observação'}
                <ChevronRight size={11} className={`transition-transform ${showObs ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {showObs && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <textarea
                      value={observacao}
                      onChange={e => setObservacao(e.target.value)}
                      placeholder="Alguma restrição alimentar ou observação?"
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white/80 text-sm placeholder-white/20 resize-none outline-none transition-colors"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                        fontFamily: 'var(--font-inter)',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-spider-red-light text-xs text-center"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  ⚠️ {error}
                </motion.p>
              )}

              {/* Submit CTA */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={confirm}
                disabled={loading}
                className="relative overflow-hidden w-full py-4 flex items-center justify-center gap-2 text-white font-black uppercase disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #C0392B 0%, #E53935 100%)',
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  boxShadow: '0 0 40px rgba(229,57,53,0.4)',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.12em',
                }}
              >
                <motion.div
                  initial={{ x: '-200%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2.5 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', width: '40%' }}
                />
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" />Confirmando...</>
                ) : (
                  <><Shield size={16} />CONFIRMAR PRESENÇA NA MISSÃO</>
                )}
              </motion.button>

              <p
                className="text-white/25 text-[10px] text-center uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.6rem', letterSpacing: '0.2em' }}
              >
                🕷️ Festa simples, cheia de carinho e diversão!
              </p>
            </motion.div>
          )}

          {/* ─── STATE 2: EXPLOSIVE WEB ────────────────────── */}
          {rsvpState === 'explosive-web' && (
            <motion.div
              key="explosive-web"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black flex items-center justify-center z-50 pointer-events-none"
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="none">
                {/* Top left web line */}
                <motion.path d="M0 0 L200 400" stroke="#E53935" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }} />
                {/* Top right web line */}
                <motion.path d="M400 0 L200 400" stroke="#1A237E" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }} />
                {/* Bottom left web line */}
                <motion.path d="M0 800 L200 400" stroke="#1A237E" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }} />
                {/* Bottom right web line */}
                <motion.path d="M400 800 L200 400" stroke="#E53935" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }} />
              </svg>
              
              <motion.div
                initial={{ scale: 0.1, rotate: -30, opacity: 0 }}
                animate={{ scale: [0.1, 1.5, 1.1], rotate: [-30, 20, 12], opacity: 1 }}
                transition={{ duration: 0.4, ease: 'backOut' }}
                className="absolute z-10"
              >
                <span
                  className="text-7xl font-black text-spider-gold uppercase italic block"
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    textShadow: '6px 6px 0 #E53935, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
                    letterSpacing: '0.05em',
                  }}
                >
                  THWIP!
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* ─── STATE 3: EXPLOSIVE SLAM ───────────────────── */}
          {rsvpState === 'explosive-slam' && (
            <motion.div
              key="explosive-slam"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex flex-col items-center justify-center z-50 p-6 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, #2A000A 0%, #080816 100%)',
              }}
            >
              {/* Screen shaking effect layer */}
              <motion.div
                animate={{ x: [0, -12, 12, -9, 9, -5, 5, 0], y: [0, 9, -9, 6, -6, 4, -4, 0] }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Radial scan lines */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #E53935 0px, #E53935 2px, transparent 2px, transparent 10px)' }} />

                {/* Sparks particle explosion */}
                {Array.from({ length: 40 }).map((_, i) => {
                  const angle = (i * 360) / 40 + Math.random() * 10;
                  const dist = 140 + Math.random() * 160;
                  const x = Math.cos((angle * Math.PI) / 180) * dist;
                  const y = Math.sin((angle * Math.PI) / 180) * dist;
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: Math.random() * 7 + 4,
                        height: Math.random() * 7 + 4,
                        background: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#E53935' : '#00FFFF',
                        boxShadow: i % 3 === 0 ? '0 0 12px #FFD700' : i % 3 === 1 ? '0 0 12px #E53935' : '0 0 12px #00FFFF',
                      }}
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{ x, y, scale: 0, opacity: 0 }}
                      transition={{ duration: 0.85, ease: [0.1, 0.8, 0.25, 1] }}
                    />
                  );
                })}

                {/* Shield Badge Slam */}
                <motion.div
                  initial={{ scale: 5, opacity: 0, rotate: -45 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.22, ease: 'easeIn' }}
                  className="w-32 h-32 flex items-center justify-center relative bg-gradient-to-br from-spider-red to-indigo-950 border-4 border-spider-gold"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    boxShadow: '0 0 40px rgba(229,57,53,0.8), 0 0 80px rgba(255,215,0,0.3)',
                  }}
                >
                  <Shield size={54} className="text-spider-gold drop-shadow-[0_0_12px_#FFD700]" />
                </motion.div>

                {/* Giant BAM text */}
                <motion.div
                  initial={{ scale: 0.1, rotate: 20, opacity: 0 }}
                  animate={{ scale: [0.1, 1.4, 1], rotate: [20, -8, -4], opacity: 1 }}
                  transition={{ delay: 0.22, duration: 0.28, ease: 'backOut' }}
                  className="absolute mt-36"
                >
                  <span
                    className="text-5xl font-black text-white uppercase italic block"
                    style={{
                      fontFamily: 'var(--font-bebas)',
                      textShadow: '5px 5px 0 #E53935, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
                      letterSpacing: '0.05em',
                    }}
                  >
                    CONFIRMADO!
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* ─── STATE 4: SUCCESS CARD ─────────────────────── */}
          {rsvpState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex justify-center"
            >
              <SuccessView familia={familia} confirmados={finalConfirmados} />
            </motion.div>
          )}
        </AnimatePresence>

        {rsvpState === 'form' && onPrev && (
          <button
            onClick={onPrev}
            className="text-white/25 text-xs flex items-center gap-1 mt-1 hover:text-white/50 transition-colors"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em', fontSize: '0.7rem' }}
          >
            ← VOLTAR
          </button>
        )}
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #C0392B, #FFD700, #1A237E)', zIndex: 10 }}
      />
    </div>
  );
}

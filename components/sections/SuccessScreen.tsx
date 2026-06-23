'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Heart } from 'lucide-react';

interface SuccessScreenProps {
  familia: string;
  confirmados: string[];
}

export default function SuccessScreen({ familia, confirmados }: SuccessScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="success-overlay"
    >
      {/* Animated web background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 400 800"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {[60, 120, 180, 240, 300, 360, 420].map((r) => (
            <circle
              key={r}
              cx="200"
              cy="400"
              r={r}
              stroke="#E53935"
              strokeWidth="0.8"
              fill="none"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="200"
                y1="400"
                x2={200 + Math.cos(angle) * 500}
                y2={400 + Math.sin(angle) * 500}
                stroke="#E53935"
                strokeWidth="0.6"
              />
            );
          })}
        </motion.svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-sm mx-auto gap-6">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'backOut' }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #C0392B, #E53935)',
              boxShadow: '0 0 60px rgba(229,57,53,0.6)',
            }}
          >
            <CheckCircle2 size={48} className="text-white" />
          </div>
        </motion.div>

        {/* Spider emoji */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-6xl"
        >
          🕷️
        </motion.div>

        {/* Main text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-3"
        >
          <h1
            className="text-5xl text-gradient-hero font-display"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
          >
            MISSÃO ACEITA!
          </h1>
          <p className="text-white/80 text-lg font-light leading-relaxed">
            Agora o Lorenzo está esperando você na
            <span className="text-spider-gold font-semibold"> equipe de heróis</span>.
          </p>
        </motion.div>

        {/* Who confirmed */}
        {confirmados.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="w-full"
          >
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p className="text-white/50 text-xs uppercase tracking-widest mb-3">
                Heróis confirmados
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {confirmados.map((nome) => (
                  <span
                    key={nome}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(192,57,43,0.4), rgba(26,35,126,0.4))',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    🦸 {nome}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Warm message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center gap-2 text-white/40 text-sm"
        >
          <Heart size={14} className="text-spider-red-bright" fill="currentColor" />
          <span>O Lorenzo mal pode esperar para te ver!</span>
          <Heart size={14} className="text-spider-red-bright" fill="currentColor" />
        </motion.div>

        {/* Family name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-spider-gold/60 text-sm font-medium"
        >
          {familia} — Missão confirmada ✓
        </motion.div>
      </div>
    </motion.div>
  );
}

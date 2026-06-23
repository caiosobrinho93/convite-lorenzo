'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Cake, ExternalLink } from 'lucide-react';
import { StepProps } from '../InviteExperience';
import { NavButtons } from './StepMeet';

// ⬇️ ALTERE PARA OS DADOS REAIS DA FESTA
const PARTY_INFO = {
  data: 'Domingo, 19 de Julho de 2026',
  horario: '15h00',
  local: 'Casa do Lorenzo',
  endereco: 'Rua das Teias, 42 — Bairro Aracnídeo',
  mapsUrl: 'https://maps.google.com',
};

const items = [
  { icon: Calendar, label: 'Data', value: PARTY_INFO.data, color: '#E53935' },
  { icon: Clock, label: 'Horário', value: PARTY_INFO.horario, color: '#FFD700' },
  { icon: MapPin, label: 'Local', value: PARTY_INFO.local, color: '#5C6BC0' },
  { icon: Cake, label: 'Endereço', value: PARTY_INFO.endereco, color: '#4CAF50' },
];

export default function StepInvite({ onNext, onPrev }: StepProps) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #08081A 0%, #0C0020 100%)' }}
    >
      {/* Halftone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(192,57,43,0.08) 0%, transparent 65%)' }}
      />
      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          zIndex: 5,
        }}
      />

      <div className="relative z-10 w-full max-w-sm px-4 flex flex-col gap-3">
        {/* Header */}
        <motion.div
          initial={{ x: '-110%', skewX: -15 }}
          animate={{ x: 0, skewX: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-xs uppercase tracking-[0.3em] text-spider-red-bright"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.25em', fontSize: '0.7rem' }}
          >
            // COORDENADAS //
          </span>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(3rem, 14vw, 4.5rem)',
                color: 'white',
                lineHeight: 0.88,
                textShadow: '3px 3px 0px #C0392B',
                display: 'block',
              }}
            >
              FICHA DO EVENTO
            </span>
          </div>
        </motion.div>

        {/* Card — Marvel clipped corners */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(20,0,30,0.95) 0%, rgba(8,8,26,0.95) 100%)',
            border: '1px solid rgba(229,57,53,0.25)',
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7), inset 0 0 40px rgba(229,57,53,0.05)',
          }}
        >
          {/* Red corner accent */}
          <div
            className="absolute top-0 right-0 pointer-events-none"
            style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 40px 40px 0',
              borderColor: 'transparent #E53935 transparent transparent',
              opacity: 0.7,
            }}
          />

          {/* Inner halftone */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(229,57,53,0.04) 1px, transparent 1px)',
              backgroundSize: '10px 10px',
            }}
          />

          <div className="relative p-4">
            {/* Birthday badge */}
            <div
              className="flex items-center gap-3 mb-4 pb-4"
              style={{ borderBottom: '1px solid rgba(229,57,53,0.2)' }}
            >
              <div
                className="w-11 h-11 flex-shrink-0 flex items-center justify-center text-xl"
                style={{
                  background: 'linear-gradient(135deg, #C0392B, #E53935)',
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                }}
              >
                🕷️
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.55rem' }}>
                  Aniversário de
                </p>
                <p className="text-white font-bold text-base leading-tight">Lorenzo Costa Viana</p>
                <p className="text-spider-gold text-xs font-semibold">6 anos 🎂</p>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-3">
              {items.map(({ icon: Icon, label, value, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="p-2 flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                      border: `1px solid ${color}33`,
                      clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                    }}
                  >
                    <Icon size={13} style={{ color }} />
                  </div>
                  <div>
                    <p
                      className="text-white/30 text-[9px] uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.55rem', letterSpacing: '0.2em' }}
                    >
                      {label}
                    </p>
                    <p className="text-white text-sm font-semibold leading-snug">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Maps CTA */}
            <motion.a
              href={PARTY_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex items-center justify-between px-4 py-3 w-full text-white text-sm font-bold uppercase tracking-wider transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #1A237E, #283593)',
                border: '1px solid rgba(92,107,192,0.3)',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                fontFamily: 'var(--font-bebas)',
                letterSpacing: '0.15em',
              }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: '#FFD700' }} />
                <span>VER LOCALIZAÇÃO</span>
              </div>
              <ExternalLink size={12} className="opacity-60" />
            </motion.a>
          </div>
        </motion.div>

        <p
          className="text-white/30 text-[10px] text-center uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.65rem', letterSpacing: '0.2em' }}
        >
          🎈 Uma comemoração intimista e cheia de diversão!
        </p>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #C0392B, #FFD700, #1A237E)', zIndex: 10 }}
      />

      <NavButtons onNext={onNext} onPrev={onPrev} />
    </div>
  );
}

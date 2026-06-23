'use client';

import { Calendar, Clock, MapPin, Cake, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

// ⬇️ ALTERE ESTAS INFORMAÇÕES PARA OS DADOS REAIS DA FESTA
const PARTY_INFO = {
  data: 'Domingo, 19 de Julho de 2026',
  horario: '15h00',
  local: 'Casa do Lorenzo',
  endereco: 'Rua das Teias, 42 — Bairro Aracnídeo',
  mapsUrl: 'https://maps.google.com',
};

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
}

function InfoItem({ icon: Icon, label, value, delay }: InfoItemProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="flex items-start gap-4 py-4 border-b border-white/8 last:border-0">
        <div
          className="p-2.5 rounded-xl flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(192,57,43,0.3), rgba(26,35,126,0.3))',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Icon size={18} className="text-spider-gold" />
        </div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">{label}</p>
          <p className="text-white font-semibold text-base leading-snug">{value}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function InviteCard() {
  return (
    <section
      id="convite"
      className="relative py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A1A 0%, #100A1F 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(192,57,43,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-sm mx-auto">
        <AnimatedSection className="text-center mb-8">
          <span
            className="text-spider-red-bright text-sm font-bold tracking-widest uppercase block mb-3"
          >
            📋 Detalhes da Missão
          </span>
          <h2
            className="text-5xl font-display text-gradient-hero"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
          >
            O CONVITE
          </h2>
        </AnimatedSection>

        {/* Main invite card */}
        <AnimatedSection delay={150}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="invite-card rounded-3xl p-6 relative overflow-hidden"
          >
            {/* Card decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-10">
              <svg viewBox="0 0 160 160" fill="none">
                {[40, 80, 120].map((r) => (
                  <circle key={r} cx="160" cy="0" r={r} stroke="white" strokeWidth="0.8" fill="none" />
                ))}
              </svg>
            </div>

            {/* Birthday badge */}
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: 'linear-gradient(135deg, #C0392B, #E53935)' }}
              >
                🕷️
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest">Aniversário de</p>
                <h3 className="text-white font-bold text-lg leading-tight">
                  Lorenzo Costa Viana
                </h3>
                <p className="text-spider-gold text-sm font-semibold">6 anos 🎂</p>
              </div>
            </div>

            {/* Info items */}
            <div className="space-y-1">
              <InfoItem
                icon={Calendar}
                label="Data"
                value={PARTY_INFO.data}
                delay={200}
              />
              <InfoItem
                icon={Clock}
                label="Horário"
                value={PARTY_INFO.horario}
                delay={300}
              />
              <InfoItem
                icon={MapPin}
                label="Local"
                value={PARTY_INFO.local}
                delay={400}
              />
              <InfoItem
                icon={Cake}
                label="Endereço"
                value={PARTY_INFO.endereco}
                delay={500}
              />
            </div>

            {/* Maps button */}
            <AnimatedSection delay={600}>
              <a
                href={PARTY_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #283593, #3949AB)',
                  boxShadow: '0 8px 24px rgba(26,35,126,0.4)',
                }}
              >
                <MapPin size={16} />
                VER LOCALIZAÇÃO
                <ExternalLink size={14} className="opacity-60" />
              </a>
            </AnimatedSection>
          </motion.div>
        </AnimatedSection>

        {/* Warm message */}
        <AnimatedSection delay={700} className="text-center mt-8">
          <p className="text-white/50 text-sm leading-relaxed">
            🏠 Festa simples, familiar e aconchegante.<br />
            Feita com muito amor pelo Lorenzo!
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

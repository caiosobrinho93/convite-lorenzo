'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Loader2, Shield } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SuccessScreen from './SuccessScreen';
import Confetti, { ConfettiHandle } from '@/components/ui/Confetti';

interface RSVPSectionProps {
  token: string;
  familia: string;
  criancas: string[];
  jaConfirmado: boolean;
  confirmadosAnteriores: string[];
}

export default function RSVPSection({
  token,
  familia,
  criancas,
  jaConfirmado,
  confirmadosAnteriores,
}: RSVPSectionProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(confirmadosAnteriores)
  );
  const [observacao, setObservacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(jaConfirmado);
  const [finalConfirmados, setFinalConfirmados] = useState<string[]>(confirmadosAnteriores);
  const [error, setError] = useState('');

  const confettiRef = useRef<ConfettiHandle>(null);

  const toggleCrianca = (nome: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(nome)) next.delete(nome);
      else next.add(nome);
      return next;
    });
  };

  const handleConfirm = async () => {
    if (selected.size === 0 && criancas.length > 0) {
      setError('Selecione pelo menos uma pessoa para confirmar.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/confirmar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          confirmados: Array.from(selected),
          observacao,
        }),
      });

      if (!res.ok) throw new Error('Erro ao confirmar');

      // Trigger effects
      setFinalConfirmados(Array.from(selected));
      confettiRef.current?.fire();

      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 400]);
      }

      setTimeout(() => {
        setSuccess(true);
      }, 800);
    } catch {
      setError('Ops! Algo deu errado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Confetti canvas (always mounted) */}
      <Confetti ref={confettiRef} />

      {/* Success overlay */}
      {success && (
        <SuccessScreen familia={familia} confirmados={finalConfirmados} />
      )}

      <section
        id="rsvp"
        className="relative min-h-screen py-20 px-4 overflow-hidden flex flex-col justify-center"
        style={{
          background: 'linear-gradient(180deg, #0A0A1A 0%, #0F0008 50%, #0A0A1A 100%)',
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(192,57,43,0.12) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-sm mx-auto w-full">
          {/* Header */}
          <AnimatedSection className="text-center mb-10">
            <div className="text-spider-red-bright text-sm font-bold tracking-widest uppercase mb-3">
              ⚡ Confirmação de Presença
            </div>
            <h2
              className="text-5xl font-display text-gradient-hero mb-4"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
            >
              ENTRAR PARA A EQUIPE
            </h2>
            <p className="text-white/60 text-base">
              Olá, <span className="text-white font-semibold">{familia}</span>! 👋<br />
              Selecione quem vai na missão:
            </p>
          </AnimatedSection>

          {/* Children checkboxes */}
          {criancas.length > 0 ? (
            <AnimatedSection delay={150}>
              <div
                className="rounded-3xl p-5 mb-5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users size={16} className="text-spider-gold" />
                  <span className="text-white/60 text-xs uppercase tracking-widest">
                    Quem vai comparecer
                  </span>
                </div>

                <div className="space-y-3">
                  {criancas.map((crianca) => {
                    const isChecked = selected.has(crianca);
                    return (
                      <motion.button
                        key={crianca}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleCrianca(crianca)}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200"
                        style={{
                          background: isChecked
                            ? 'linear-gradient(135deg, rgba(192,57,43,0.25), rgba(26,35,126,0.25))'
                            : 'rgba(255,255,255,0.03)',
                          border: isChecked
                            ? '1px solid rgba(229,57,53,0.4)'
                            : '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        {/* Custom checkbox */}
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                          style={{
                            background: isChecked
                              ? 'linear-gradient(135deg, #C0392B, #E53935)'
                              : 'rgba(255,255,255,0.06)',
                            border: isChecked
                              ? 'none'
                              : '2px solid rgba(255,255,255,0.2)',
                          }}
                        >
                          {isChecked && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-white text-xs font-bold"
                            >
                              ✓
                            </motion.span>
                          )}
                        </div>

                        <div className="flex-1">
                          <span className="text-white font-semibold">{crianca}</span>
                        </div>

                        {isChecked && (
                          <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-spider-gold text-xl"
                          >
                            🦸
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection delay={150} className="mb-5">
              <div
                className="rounded-3xl p-5 text-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="text-white/60">Confirme sua presença abaixo 👇</p>
              </div>
            </AnimatedSection>
          )}

          {/* Observation input */}
          <AnimatedSection delay={300}>
            <div
              className="rounded-3xl p-5 mb-5"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={16} className="text-spider-blue-bright" />
                <span className="text-white/60 text-xs uppercase tracking-widest">
                  Observação (opcional)
                </span>
              </div>
              <textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                placeholder="Alguma alergia? Algo que devo saber? Escreva aqui..."
                rows={3}
                className="w-full bg-transparent text-white/80 text-sm placeholder-white/20 resize-none outline-none"
                style={{ lineHeight: '1.6' }}
              />
            </div>
          </AnimatedSection>

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-spider-red-light text-sm text-center mb-4"
            >
              ⚠️ {error}
            </motion.p>
          )}

          {/* CTA Button */}
          <AnimatedSection delay={400}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirm}
              disabled={loading}
              className="btn-mission w-full py-5 rounded-2xl text-white font-bold uppercase tracking-widest text-base flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.1rem', letterSpacing: '0.15em' }}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Confirmando...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  ENTRAR PARA A EQUIPE DE HERÓIS
                </>
              )}
            </motion.button>
          </AnimatedSection>

          {/* Footer note */}
          <AnimatedSection delay={500} className="text-center mt-8">
            <p className="text-white/30 text-xs leading-relaxed">
              🕷️ Festa em casa, simples e cheio de amor.<br />
              O Lorenzo está ansioso para te ver!
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

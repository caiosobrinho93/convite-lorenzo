'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  CheckCircle2,
  Clock,
  Baby,
  RefreshCw,
  Lock,
  LogOut,
  Filter,
  Eye,
  EyeOff,
} from 'lucide-react';
import { GuestRecord } from '@/lib/types';

type FilterType = 'todos' | 'confirmados' | 'pendentes';

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-4 flex flex-col gap-2"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: color }}
      >
        <Icon size={18} className="text-white" />
      </div>
      <div className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-bebas)' }}>
        {value}
      </div>
      <div className="text-white/50 text-xs uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

export default function AdminPage() {
  const [senha, setSenha] = useState('');
  const [inputSenha, setInputSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [autenticado, setAutenticado] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [data, setData] = useState<GuestRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [filter, setFilter] = useState<FilterType>('todos');

  const fetchData = useCallback(async () => {
    if (!senha) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/convidados?senha=${senha}`);
      if (res.ok) {
        const json = await res.json();
        setData(json.data ?? []);
        setLastUpdate(new Date());
      }
    } catch {
      console.error('Erro ao buscar dados');
    } finally {
      setLoading(false);
    }
  }, [senha]);

  useEffect(() => {
    if (!autenticado) return;
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [autenticado, fetchData]);

  const handleLogin = () => {
    if (inputSenha.trim()) {
      setSenha(inputSenha.trim());
      setAutenticado(true);
      setLoginError('');
    } else {
      setLoginError('Digite a senha.');
    }
  };

  const filteredData = data.filter((g) => {
    if (filter === 'confirmados') return g.confirmado;
    if (filter === 'pendentes') return !g.confirmado;
    return true;
  });

  const totalConvidados = data.length;
  const totalConfirmados = data.filter((g) => g.confirmado).length;
  const totalPendentes = totalConvidados - totalConfirmados;
  const totalCriancasConfirmadas = data.reduce(
    (acc, g) => acc + (g.confirmados?.length ?? 0),
    0
  );

  // Login screen
  if (!autenticado) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(160deg, #0A0A1A 0%, #100520 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🕷️</div>
            <h1
              className="text-4xl text-gradient-hero font-display"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
            >
              ÁREA SECRETA
            </h1>
            <p className="text-white/50 text-sm mt-2">Dashboard do Aniversário do Lorenzo</p>
          </div>

          <div
            className="rounded-3xl p-6"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Lock size={16} className="text-spider-gold" />
              <span className="text-white/60 text-xs uppercase tracking-widest">Senha de acesso</span>
            </div>

            <div className="relative mb-4">
              <input
                type={showSenha ? 'text' : 'password'}
                value={inputSenha}
                onChange={(e) => setInputSenha(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Digite a senha..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-white/20 outline-none focus:border-spider-red/50 transition-colors pr-12"
              />
              <button
                onClick={() => setShowSenha((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showSenha ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {loginError && (
              <p className="text-spider-red-light text-sm mb-3">{loginError}</p>
            )}

            <button
              onClick={handleLogin}
              className="btn-mission w-full py-4 rounded-2xl text-white font-bold uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.12em' }}
            >
              ENTRAR
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #0A0A1A 0%, #100520 100%)' }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 py-4"
        style={{
          background: 'rgba(10,10,26,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1
              className="text-2xl text-gradient-hero font-display"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
            >
              🕷️ DASHBOARD LORENZO
            </h1>
            {lastUpdate && (
              <p className="text-white/30 text-xs">
                Atualizado: {lastUpdate.toLocaleTimeString('pt-BR')}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 rounded-xl text-white/50 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={() => setAutenticado(false)}
              className="p-2 rounded-xl text-white/50 hover:text-spider-red-light transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={Users} label="Total" value={totalConvidados} color="rgba(92,107,192,0.4)" />
          <StatCard icon={CheckCircle2} label="Confirmados" value={totalConfirmados} color="rgba(56,142,60,0.4)" />
          <StatCard icon={Clock} label="Pendentes" value={totalPendentes} color="rgba(245,124,0,0.4)" />
          <StatCard icon={Baby} label="Crianças" value={totalCriancasConfirmadas} color="rgba(192,57,43,0.4)" />
        </div>

        {/* Progress bar */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex justify-between mb-2">
            <span className="text-white/60 text-sm">Progresso de confirmações</span>
            <span className="text-white font-semibold text-sm">
              {totalConvidados > 0 ? Math.round((totalConfirmados / totalConvidados) * 100) : 0}%
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: totalConvidados > 0 ? `${(totalConfirmados / totalConvidados) * 100}%` : '0%',
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #C0392B, #E53935)' }}
            />
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['todos', 'confirmados', 'pendentes'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-1 py-2 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-200"
              style={{
                background: filter === f ? 'linear-gradient(135deg, #C0392B, #E53935)' : 'rgba(255,255,255,0.04)',
                border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.08)',
                color: filter === f ? 'white' : 'rgba(255,255,255,0.5)',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Guest list */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredData.map((guest, i) => (
              <motion.div
                key={guest.token}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-4"
                style={{
                  background: guest.confirmado
                    ? 'rgba(56,142,60,0.08)'
                    : 'rgba(255,255,255,0.03)',
                  border: guest.confirmado
                    ? '1px solid rgba(56,142,60,0.2)'
                    : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-sm font-semibold ${
                          guest.confirmado ? 'text-green-400' : 'text-white'
                        }`}
                      >
                        {guest.familia}
                      </span>
                    </div>

                    {/* All children */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(guest.criancas ?? []).map((c) => {
                        const confirmado = (guest.confirmados ?? []).includes(c);
                        return (
                          <span
                            key={c}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: confirmado
                                ? 'rgba(56,142,60,0.2)'
                                : 'rgba(255,255,255,0.06)',
                              color: confirmado ? '#81C784' : 'rgba(255,255,255,0.4)',
                              border: confirmado ? '1px solid rgba(129,199,132,0.3)' : '1px solid rgba(255,255,255,0.08)',
                            }}
                          >
                            {confirmado ? '✓' : '○'} {c}
                          </span>
                        );
                      })}
                    </div>

                    {guest.data_confirmacao && (
                      <p className="text-white/30 text-xs">
                        Confirmado em:{' '}
                        {new Date(guest.data_confirmacao).toLocaleString('pt-BR')}
                      </p>
                    )}
                    {guest.observacao && (
                      <p className="text-yellow-400/60 text-xs mt-1 italic">
                        📝 {guest.observacao}
                      </p>
                    )}
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      guest.confirmado ? 'text-green-400' : 'text-white/20'
                    }`}
                    style={{
                      background: guest.confirmado
                        ? 'rgba(56,142,60,0.2)'
                        : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    {guest.confirmado ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredData.length === 0 && (
            <div className="text-center py-12 text-white/30">
              <Filter size={32} className="mx-auto mb-3 opacity-50" />
              <p>Nenhum convidado nesta categoria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { ArrowRight, Binary, BrainCircuit, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const levels = [
  { size: 3, label: 'Warm-up', tone: 'cyan' },
  { size: 4, label: 'Easy', tone: 'cyan' },
  { size: 5, label: 'Standard', tone: 'cyan' },
  { size: 6, label: 'Advanced', tone: 'amber' },
  { size: 7, label: 'Expert', tone: 'amber' },
  { size: 8, label: 'Extreme', tone: 'amber' }
] as const;

export function HomePage() {
  const { player } = useAuth();

  return (
    <div className="mx-auto max-w-5xl py-6 sm:py-10">
      <section className="text-left sm:text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300">
          <Sparkles size={15} className="text-amber-300" aria-hidden="true" /> Ready, {player?.name}?
        </div>
        <h1 className="mt-5 text-4xl font-black tracking-[-0.035em] text-white sm:text-5xl">Choose your grid</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          Each bit has a positional value. Match every decimal target as quickly as you can.
        </p>
      </section>

      <section aria-label="Grid sizes" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
        {levels.map((level, index) => (
          <Link
            key={level.size}
            to={`/play/${level.size}`}
            className={`group relative min-h-40 overflow-hidden rounded-3xl border p-5 text-left transition duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 ${level.tone === 'cyan' ? 'border-cyan-300/15 bg-cyan-300/[0.04] hover:border-cyan-300/40' : 'border-amber-300/15 bg-amber-300/[0.04] hover:border-amber-300/40'}`}
          >
            <span className="absolute right-3 top-2 font-mono text-6xl font-black text-white/[0.035] transition group-hover:text-white/[0.07]" aria-hidden="true">{index + 1}</span>
            <span className={`font-mono text-xs uppercase tracking-[0.18em] ${level.tone === 'cyan' ? 'text-cyan-300' : 'text-amber-300'}`}>{level.label}</span>
            <span className="mt-5 block text-3xl font-black tracking-tight text-white">{level.size} × {level.size}</span>
            <span className="mt-5 flex items-center justify-between text-sm font-medium text-slate-400 transition group-hover:text-white">
              {level.size * level.size} bits <ArrowRight aria-hidden="true" size={18} />
            </span>
          </Link>
        ))}
      </section>

      <div className="mt-8 grid gap-3 rounded-3xl border border-white/10 bg-slate-900/60 p-5 text-left sm:grid-cols-2 sm:p-6">
        <div className="flex gap-3">
          <Binary className="mt-0.5 shrink-0 text-cyan-300" size={21} aria-hidden="true" />
          <p className="text-sm leading-6 text-slate-400"><strong className="text-slate-200">Read left to right.</strong> Each position is worth twice the one after it.</p>
        </div>
        <div className="flex gap-3">
          <BrainCircuit className="mt-0.5 shrink-0 text-amber-300" size={21} aria-hidden="true" />
          <p className="text-sm leading-6 text-slate-400"><strong className="text-slate-200">Watch both axes.</strong> Every flip changes one row and one column.</p>
        </div>
      </div>
    </div>
  );
}

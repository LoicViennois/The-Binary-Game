import { Medal, Trophy } from 'lucide-react';
import { formatTime } from '../lib/game';
import { getBestScores } from '../lib/storage';

export function HighScores({ game, refreshKey = 0 }: { game: number; refreshKey?: number }) {
  const scores = getBestScores(game);
  void refreshKey;

  return (
    <section aria-labelledby="high-scores-title" className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300">{game} × {game}</p>
          <h2 id="high-scores-title" className="mt-1 text-lg font-bold text-white">High scores</h2>
        </div>
        <Trophy aria-hidden="true" className="text-amber-300" size={24} />
      </div>

      {scores.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-700 px-4 py-7 text-center text-sm leading-6 text-slate-400">
          No score yet. Be the first to crack this grid.
        </p>
      ) : (
        <ol className="mt-5 space-y-2">
          {scores.map((score, index) => (
            <li key={score.id} className="grid grid-cols-[2rem_1fr_auto] items-center gap-2 rounded-xl border border-transparent px-2 py-2.5 transition hover:border-slate-700 hover:bg-slate-800/60">
              <span className={`grid h-7 w-7 place-items-center rounded-lg font-mono text-xs font-bold ${index < 3 ? 'bg-amber-300/10 text-amber-300' : 'text-slate-500'}`}>
                {index < 3 ? <Medal size={16} aria-label={`Rank ${index + 1}`} /> : index + 1}
              </span>
              <span className="min-w-0 truncate text-sm font-medium text-slate-200">{score.user.name}</span>
              <span className="font-mono text-sm tabular-nums text-cyan-300">{formatTime(score.time)}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

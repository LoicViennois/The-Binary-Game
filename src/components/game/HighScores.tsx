import { Trophy, Medal, Award } from 'lucide-react';
import { HighScore } from '../../types';
import { formatTime } from '../../utils/game';

interface HighScoresProps {
  scores: HighScore[];
  gameSize: number;
}

export function HighScores({ scores, gameSize }: HighScoresProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold text-xs"
          title="1st Place"
        >
          <Trophy className="h-3.5 w-3.5" />
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs"
          title="2nd Place"
        >
          <Medal className="h-3.5 w-3.5" />
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700/20 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold text-xs"
          title="3rd Place"
        >
          <Award className="h-3.5 w-3.5" />
        </span>
      );
    }
    return <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500">#{rank}</span>;
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-sm border border-stone-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
            <Trophy className="h-4 w-4" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Leaderboard</h3>
        </div>
        <span className="rounded-md bg-stone-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">
          {gameSize} &times; {gameSize}
        </span>
      </div>

      {scores.length === 0 ? (
        <div className="py-8 text-center text-sm text-slate-400 dark:text-slate-500">
          <p>No high scores yet.</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Be the first to finish!</p>
        </div>
      ) : (
        <div className="mt-3 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="py-2 pl-1 w-10">Rank</th>
                <th className="py-2 px-2">Time</th>
                <th className="py-2 pr-1 text-right">Player</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50 dark:divide-slate-800/60">
              {scores.map((score, idx) => (
                <tr key={score.id ?? idx} className="hover:bg-stone-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-2.5 pl-1">
                    <div className="flex items-center">{getRankBadge(idx + 1)}</div>
                  </td>
                  <td className="py-2.5 px-2 font-mono font-medium text-slate-800 dark:text-slate-200">
                    {formatTime(score.time)}
                  </td>
                  <td className="py-2.5 pr-1 text-right font-medium text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                    {score.user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

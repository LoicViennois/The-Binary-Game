import { Timer as TimerIcon } from 'lucide-react';
import { formatTime } from '../../utils/game';

interface TimerDisplayProps {
  timeMs: number;
  isWinningTime?: boolean;
}

export function TimerDisplay({ timeMs, isWinningTime = false }: TimerDisplayProps) {
  const formatted = formatTime(timeMs);

  return (
    <div
      className={`
        inline-flex items-center gap-2.5 rounded-2xl px-5 py-2.5 shadow-sm border font-mono transition-all
        ${
          isWinningTime
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 shadow-emerald-500/10 scale-102'
            : 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 text-slate-800 dark:text-slate-100'
        }
      `}
    >
      <TimerIcon
        className={`h-5 w-5 ${
          isWinningTime ? 'text-emerald-600 dark:text-emerald-400 animate-pulse' : 'text-slate-400 dark:text-slate-500'
        }`}
      />
      <span className="text-2xl sm:text-3xl font-bold tracking-tight">{formatted}</span>
    </div>
  );
}

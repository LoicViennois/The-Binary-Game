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
            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-emerald-500/10 scale-102'
            : 'bg-white border-stone-200 text-slate-800'
        }
      `}
    >
      <TimerIcon
        className={`h-5 w-5 ${isWinningTime ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}`}
      />
      <span className="text-2xl sm:text-3xl font-bold tracking-tight">{formatted}</span>
    </div>
  );
}

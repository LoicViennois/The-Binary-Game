import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Home, ArrowRight } from 'lucide-react';
import { formatTime } from '../../utils/game';

interface VictoryModalProps {
  isOpen: boolean;
  timeMs: number;
  size: number;
  onRestart: () => void;
  onHome: () => void;
  onNextSize?: () => void;
}

export function VictoryModal({
  isOpen,
  timeMs,
  size,
  onRestart,
  onHome,
  onNextSize,
}: VictoryModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-md">
          <Trophy className="h-9 w-9" />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">Puzzle Solved!</h2>
        <p className="mt-1 text-sm text-slate-500">
          You conquered the <span className="font-semibold text-slate-700">{size}&times;{size}</span> binary grid!
        </p>

        <div className="my-5 rounded-2xl bg-stone-50 p-4 border border-stone-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Completion Time
          </span>
          <div className="mt-1 font-mono text-3xl font-extrabold text-emerald-600">
            {formatTime(timeMs)}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={onRestart}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors active:scale-98"
          >
            <RotateCcw className="h-4 w-4" />
            Play Again
          </button>

          {size < 8 && onNextSize && (
            <button
              onClick={onNextSize}
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors active:scale-98"
            >
              <span>Play {size + 1}&times;{size + 1}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={onHome}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 font-medium text-slate-700 hover:bg-stone-50 transition-colors active:scale-98"
          >
            <Home className="h-4 w-4" />
            Back to Grid Selection
          </button>
        </div>
      </div>
    </div>
  );
}

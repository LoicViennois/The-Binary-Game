import { useNavigate } from 'react-router-dom';
import { Play, Grid3X3, Zap, Brain, Flame, Award, HelpCircle } from 'lucide-react';
import { GridSize } from '../types';

interface SizeOption {
  size: GridSize;
  title: string;
  difficulty: string;
  color: string;
  badgeBg: string;
  icon: typeof Play;
}

const SIZE_OPTIONS: SizeOption[] = [
  {
    size: 3,
    title: '3 \u00d7 3',
    difficulty: 'Beginner',
    color: 'border-emerald-200 dark:border-emerald-900/60 hover:border-emerald-400 dark:hover:border-emerald-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    icon: Play,
  },
  {
    size: 4,
    title: '4 \u00d7 4',
    difficulty: 'Easy',
    color: 'border-teal-200 dark:border-teal-900/60 hover:border-teal-400 dark:hover:border-teal-600 group-hover:text-teal-600 dark:group-hover:text-teal-400',
    badgeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300',
    icon: Zap,
  },
  {
    size: 5,
    title: '5 \u00d7 5',
    difficulty: 'Medium',
    color: 'border-blue-200 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600 group-hover:text-blue-600 dark:group-hover:text-blue-400',
    badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
    icon: Brain,
  },
  {
    size: 6,
    title: '6 \u00d7 6',
    difficulty: 'Hard',
    color: 'border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-400 dark:hover:border-indigo-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
    badgeBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300',
    icon: Flame,
  },
  {
    size: 7,
    title: '7 \u00d7 7',
    difficulty: 'Expert',
    color: 'border-purple-200 dark:border-purple-900/60 hover:border-purple-400 dark:hover:border-purple-600 group-hover:text-purple-600 dark:group-hover:text-purple-400',
    badgeBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
    icon: Award,
  },
  {
    size: 8,
    title: '8 \u00d7 8',
    difficulty: 'Master (1 Byte)',
    color: 'border-amber-200 dark:border-amber-900/60 hover:border-amber-400 dark:hover:border-amber-600 group-hover:text-amber-600 dark:group-hover:text-amber-400',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    icon: Grid3X3,
  },
];

export function HomePage() {
  const navigate = useNavigate();

  const handleSelectSize = (size: number) => {
    navigate(`/play/${size}`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Select Grid Size
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Choose your challenge level. Toggle the bits to reach the target decimal sums!
        </p>
      </div>

      {/* Grid Size Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {SIZE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.size}
              onClick={() => handleSelectSize(opt.size)}
              type="button"
              className={`
                group relative flex flex-col items-center justify-center rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-6
                shadow-xs border-2 ${opt.color}
                transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:translate-y-0
                cursor-pointer text-center
              `}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors group-hover:bg-slate-900 dark:group-hover:bg-indigo-600 group-hover:text-amber-300 dark:group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>

              <div className="mt-4 font-mono text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {opt.title}
              </div>

              <span
                className={`mt-2 inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${opt.badgeBg}`}
              >
                {opt.difficulty}
              </span>
            </button>
          );
        })}
      </div>

      {/* How to Play Card */}
      <div className="mt-10 rounded-2xl bg-stone-100/70 dark:bg-slate-900/60 p-5 sm:p-6 border border-stone-200/80 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <HelpCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2>How to Play</h2>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="rounded-xl bg-white dark:bg-slate-800/90 p-3.5 border border-stone-200/60 dark:border-slate-700/80 shadow-2xs">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">1. Binary Bits</span>
            Click any cell in the grid to flip it between <span className="font-mono font-bold text-slate-900 dark:text-white">0</span> and <span className="font-mono font-bold text-slate-900 dark:text-white">1</span>.
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-800/90 p-3.5 border border-stone-200/60 dark:border-slate-700/80 shadow-2xs">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">2. Decimal Totals</span>
            Bits are evaluated in binary from left to right (rows) and top to bottom (columns).
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-800/90 p-3.5 border border-stone-200/60 dark:border-slate-700/80 shadow-2xs">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">3. Match the Targets</span>
            Match every row and column target total (green badges) as quickly as possible to set a new record!
          </div>
        </div>
      </div>
    </div>
  );
}

import { Check, X } from 'lucide-react';
import { Cell } from './Cell';

interface GridProps {
  size: number;
  grid: number[][];
  rowTot: number[];
  colTot: number[];
  rowTarget: number[];
  colTarget: number[];
  stopped: boolean;
  success: boolean;
  onCellClick: (row: number, col: number) => void;
}

export function Grid({
  size,
  grid,
  rowTot,
  colTot,
  rowTarget,
  colTarget,
  stopped,
  success,
  onCellClick,
}: GridProps) {
  // Determine cell sizing based on grid dimensions for optimal responsiveness
  const getCellSizeClasses = () => {
    if (size <= 4) return 'h-13 w-13 sm:h-15 sm:w-15 text-2xl';
    if (size <= 6) return 'h-10 w-10 sm:h-12 sm:w-12 text-lg sm:text-xl';
    return 'h-8 w-8 sm:h-10 sm:w-10 text-sm sm:text-base';
  };

  const cellSizeClass = getCellSizeClasses();

  return (
    <div className="relative inline-block select-none rounded-2xl bg-stone-200/50 p-3 sm:p-5 shadow-sm border border-stone-300/80 backdrop-blur-xs">
      <div className="flex flex-col gap-2 sm:gap-2.5">
        {/* Rows */}
        {grid.map((row, rIdx) => {
          const isRowValid = (rowTot[rIdx] ?? 0) === (rowTarget[rIdx] ?? 0);
          return (
            <div key={rIdx} className="flex items-center gap-2 sm:gap-2.5">
              {/* Row Cells */}
              {row.map((val, cIdx) => (
                <div key={cIdx} className={cellSizeClass}>
                  <Cell
                    row={rIdx}
                    col={cIdx}
                    value={val}
                    disabled={stopped}
                    onClick={onCellClick}
                  />
                </div>
              ))}

              {/* Row Target Indicator */}
              <div
                title={`Target: ${rowTarget[rIdx]} (Current: ${rowTot[rIdx]})`}
                className={`
                  flex ${cellSizeClass} items-center justify-center rounded-xl font-mono font-bold
                  transition-all duration-200 shadow-xs border
                  ${
                    isRowValid
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/30 scale-102'
                      : 'bg-stone-100 text-slate-700 border-stone-300'
                  }
                `}
              >
                <span>{rowTarget[rIdx]}</span>
              </div>
            </div>
          );
        })}

        {/* Column Target Indicators Row */}
        <div className="flex items-center gap-2 sm:gap-2.5 pt-1 border-t border-stone-300">
          {colTarget.map((target, cIdx) => {
            const isColValid = (colTot[cIdx] ?? 0) === target;
            return (
              <div
                key={cIdx}
                title={`Target: ${target} (Current: ${colTot[cIdx]})`}
                className={`
                  flex ${cellSizeClass} items-center justify-center rounded-xl font-mono font-bold
                  transition-all duration-200 shadow-xs border
                  ${
                    isColValid
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/30 scale-102'
                      : 'bg-stone-100 text-slate-700 border-stone-300'
                  }
                `}
              >
                <span>{target}</span>
              </div>
            );
          })}

          {/* Empty spacer for bottom-right corner */}
          <div className={cellSizeClass} />
        </div>
      </div>

      {/* Overlay when game is stopped or completed */}
      {stopped && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in">
          {success ? (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/40 animate-in zoom-in-75 duration-200">
              <Check className="h-12 w-12 stroke-[3]" />
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-500 text-white shadow-xl shadow-rose-500/40 animate-in zoom-in-75 duration-200">
              <X className="h-12 w-12 stroke-[3]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

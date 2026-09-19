import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { calculateTotals, createEmptyGrid, createPuzzle, isSolved } from '../lib/game';
import type { GameStatus } from '../types';

interface GameBoardProps {
  size: number;
  status: GameStatus;
  onCompleted: () => void;
}

export function GameBoard({ size, status, onCompleted }: GameBoardProps) {
  const [puzzle] = useState(() => createPuzzle(size));
  const [grid, setGrid] = useState(() => createEmptyGrid(size));
  const totals = calculateTotals(grid);
  const locked = status !== 'playing';

  function toggleBit(row: number, column: number) {
    if (locked) return;

    const nextGrid = grid.map((values, rowIndex) =>
      values.map((value, columnIndex) =>
        rowIndex === row && columnIndex === column ? (value === 0 ? 1 : 0) : value
      )
    );
    setGrid(nextGrid);

    if (isSolved(calculateTotals(nextGrid), puzzle)) onCompleted();
  }

  const boardStyle = { gridTemplateColumns: `repeat(${size}, minmax(0, 1fr)) minmax(2.8rem, .72fr)` };

  return (
    <div className="relative">
      <div
        className="binary-board grid gap-1.5 sm:gap-2"
        style={boardStyle}
        role="grid"
        aria-label={`${size} by ${size} binary grid`}
      >
        {grid.flatMap((rowValues, row) => [
          ...rowValues.map((value, column) => (
            <button
              type="button"
              role="gridcell"
              key={`${row}-${column}`}
              className={`bit-cell ${value === 1 ? 'bit-cell-active' : ''}`}
              onClick={() => toggleBit(row, column)}
              disabled={locked}
              aria-label={`Row ${row + 1}, column ${column + 1}: ${value}`}
              aria-pressed={value === 1}
            >
              {value}
            </button>
          )),
          <div
            key={`row-target-${row}`}
            className={`target-cell ${totals.rows[row] === puzzle.rowTargets[row] ? 'target-cell-valid' : ''}`}
            aria-label={`Row ${row + 1} target: ${puzzle.rowTargets[row]}`}
          >
            {puzzle.rowTargets[row]}
          </div>
        ])}

        {puzzle.columnTargets.map((target, column) => (
          <div
            key={`column-target-${column}`}
            className={`target-cell ${totals.columns[column] === target ? 'target-cell-valid' : ''}`}
            aria-label={`Column ${column + 1} target: ${target}`}
          >
            {target}
          </div>
        ))}
        <div className="grid place-items-center font-mono text-xs text-slate-600" aria-hidden="true">DEC</div>
      </div>

      {locked && (
        <div className="absolute inset-0 grid place-items-center rounded-2xl bg-slate-950/62 backdrop-blur-[2px]">
          <div className={`grid h-24 w-24 place-items-center rounded-full border-2 ${status === 'won' ? 'border-emerald-300 bg-emerald-400/15 text-emerald-300' : 'border-rose-300 bg-rose-400/15 text-rose-300'}`}>
            {status === 'won' ? <Check size={48} strokeWidth={2.5} aria-label="Puzzle solved" /> : <X size={48} strokeWidth={2.5} aria-label="Game stopped" />}
          </div>
        </div>
      )}
    </div>
  );
}

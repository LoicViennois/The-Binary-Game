export interface Puzzle {
  solution: number[][];
  rowTargets: number[];
  columnTargets: number[];
}

export interface Totals {
  rows: number[];
  columns: number[];
}

function weightedTotal(values: number[]): number {
  return values.reduce((total, value, index) => total + value * 2 ** (values.length - index - 1), 0);
}

export function calculateTotals(grid: number[][]): Totals {
  const size = grid.length;
  const rows = grid.map(weightedTotal);
  const columns = Array.from({ length: size }, (_, column) =>
    weightedTotal(grid.map((row) => row[column] ?? 0))
  );
  return { rows, columns };
}

export function createEmptyGrid(size: number): number[][] {
  return Array.from({ length: size }, () => Array<number>(size).fill(0));
}

export function createPuzzle(size: number, random: () => number = Math.random): Puzzle {
  const solution = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Math.floor(random() * 2))
  );

  for (let row = 0; row < size; row += 1) {
    if (solution[row].every((value) => value === 0)) {
      solution[row][Math.floor(random() * size)] = 1;
    }
  }

  for (let column = 0; column < size; column += 1) {
    if (solution.every((row) => row[column] === 0)) {
      solution[Math.floor(random() * size)][column] = 1;
    }
  }

  const totals = calculateTotals(solution);
  return { solution, rowTargets: totals.rows, columnTargets: totals.columns };
}

export function isSolved(totals: Totals, puzzle: Puzzle): boolean {
  return (
    totals.rows.every((total, index) => total === puzzle.rowTargets[index]) &&
    totals.columns.every((total, index) => total === puzzle.columnTargets[index])
  );
}

export function formatTime(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60_000);
  const seconds = Math.floor((milliseconds % 60_000) / 1_000);
  const centiseconds = Math.floor((milliseconds % 1_000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds
    .toString()
    .padStart(2, '0')}`;
}

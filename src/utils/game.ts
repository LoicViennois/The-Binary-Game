export function formatTime(ms: number): string {
  if (ms < 0) ms = 0;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const hundredths = Math.floor((ms % 1000) / 10);

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}:${pad(hundredths)}`;
}

export function createZeroArray(size: number): number[] {
  return new Array(size).fill(0);
}

export function createZeroGrid(size: number): number[][] {
  return Array.from({ length: size }, () => createZeroArray(size));
}

export interface PuzzleTargets {
  rowTarget: number[];
  colTarget: number[];
}

export function generatePuzzleTargets(size: number): PuzzleTargets {
  let rowTarget: number[];
  let colTarget: number[];

  do {
    rowTarget = createZeroArray(size);
    colTarget = createZeroArray(size);

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const mul = Math.floor(Math.random() * 2);
        rowTarget[r] = (rowTarget[r] ?? 0) + mul * 2 ** (size - c - 1);
        colTarget[c] = (colTarget[c] ?? 0) + mul * 2 ** (size - r - 1);
      }
    }
  } while (rowTarget.includes(0) || colTarget.includes(0));

  return { rowTarget, colTarget };
}

export function calculateTotals(grid: number[][], size: number): { rowTot: number[]; colTot: number[] } {
  const rowTot = createZeroArray(size);
  const colTot = createZeroArray(size);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const val = grid[r]?.[c] ?? 0;
      if (val) {
        rowTot[r] = (rowTot[r] ?? 0) + 2 ** (size - c - 1);
        colTot[c] = (colTot[c] ?? 0) + 2 ** (size - r - 1);
      }
    }
  }

  return { rowTot, colTot };
}

export function areArraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

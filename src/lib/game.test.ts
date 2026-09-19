import { calculateTotals, createEmptyGrid, createPuzzle, formatTime, isSolved } from './game';
import { describe, expect, it } from 'vitest';

describe('binary game logic', () => {
  it('calculates row and column totals using binary place values', () => {
    expect(calculateTotals([[1, 0, 1], [0, 1, 1], [1, 1, 0]])).toEqual({ rows: [5, 3, 6], columns: [5, 3, 6] });
  });

  it('creates puzzles without zero-valued targets', () => {
    const puzzle = createPuzzle(3, () => 0);
    expect(puzzle.rowTargets.every((target) => target > 0)).toBe(true);
    expect(puzzle.columnTargets.every((target) => target > 0)).toBe(true);
  });

  it('recognises a solved puzzle', () => {
    const puzzle = createPuzzle(4, () => 0.9);
    expect(isSolved(calculateTotals(puzzle.solution), puzzle)).toBe(true);
    expect(isSolved(calculateTotals(createEmptyGrid(4)), puzzle)).toBe(false);
  });

  it('formats elapsed time to centiseconds', () => {
    expect(formatTime(65_430)).toBe('01:05.43');
  });
});

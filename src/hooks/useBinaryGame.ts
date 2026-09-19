import { useState, useCallback, useEffect } from 'react';
import {
  createZeroGrid,
  createZeroArray,
  generatePuzzleTargets,
  calculateTotals,
  areArraysEqual,
} from '../utils/game';

export interface UseBinaryGameOptions {
  size: number;
  onCompleted?: (winTime: number) => void;
}

export function useBinaryGame(size: number) {
  const [grid, setGrid] = useState<number[][]>(() => createZeroGrid(size));
  const [targets, setTargets] = useState(() => generatePuzzleTargets(size));
  const [rowTot, setRowTot] = useState<number[]>(() => createZeroArray(size));
  const [colTot, setColTot] = useState<number[]>(() => createZeroArray(size));
  const [isCompleted, setIsCompleted] = useState(false);

  const initGame = useCallback(() => {
    const newTargets = generatePuzzleTargets(size);
    const newGrid = createZeroGrid(size);
    const { rowTot: newRowTot, colTot: newColTot } = calculateTotals(newGrid, size);

    setGrid(newGrid);
    setTargets(newTargets);
    setRowTot(newRowTot);
    setColTot(newColTot);
    setIsCompleted(false);
  }, [size]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const toggleCell = useCallback(
    (row: number, col: number) => {
      if (isCompleted) return;

      setGrid((prevGrid) => {
        const nextGrid = prevGrid.map((rArr, rIdx) => {
          if (rIdx !== row) return rArr;
          return rArr.map((cellVal, cIdx) => (cIdx === col ? (cellVal ? 0 : 1) : cellVal));
        });

        const { rowTot: newRowTot, colTot: newColTot } = calculateTotals(nextGrid, size);
        setRowTot(newRowTot);
        setColTot(newColTot);

        const won =
          areArraysEqual(newRowTot, targets.rowTarget) &&
          areArraysEqual(newColTot, targets.colTarget);

        if (won) {
          setIsCompleted(true);
        }

        return nextGrid;
      });
    },
    [isCompleted, size, targets]
  );

  return {
    grid,
    rowTarget: targets.rowTarget,
    colTarget: targets.colTarget,
    rowTot,
    colTot,
    isCompleted,
    toggleCell,
    restart: initGame,
  };
}

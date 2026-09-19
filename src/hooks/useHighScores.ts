import { useState, useCallback, useMemo } from 'react';
import { HighScore, Player } from '../types';

const STORAGE_KEY = 'tb_high_scores';

function getStoredScores(): HighScore[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as HighScore[]) : [];
  } catch {
    return [];
  }
}

function saveStoredScores(scores: HighScore[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // ignore storage errors
  }
}

export function useHighScores(gameSize: number) {
  const [scores, setScores] = useState<HighScore[]>(() => getStoredScores());

  const addHighScore = useCallback((player: Player, time: number) => {
    const allScores = getStoredScores();
    const newScore: HighScore = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      game: gameSize,
      user: {
        uid: player.uid,
        name: player.name,
      },
      time,
    };
    allScores.push(newScore);
    saveStoredScores(allScores);
    setScores(allScores);
    return newScore;
  }, [gameSize]);

  const bestScores = useMemo(() => {
    const gameScores = scores.filter((s) => s.game === gameSize);
    const sorted = [...gameScores].sort((a, b) => a.time - b.time);

    const bestMap = new Map<string, HighScore>();
    for (const score of sorted) {
      const nameKey = score.user.name.toLowerCase();
      if (!bestMap.has(nameKey)) {
        bestMap.set(nameKey, score);
      }
    }

    return Array.from(bestMap.values()).slice(0, 10);
  }, [scores, gameSize]);

  return {
    bestScores,
    addHighScore,
  };
}

import type { HighScore, Player } from '../types';

const PLAYER_KEY = 'tb_user';
const SCORES_KEY = 'tb_high_scores';

function isPlayer(value: unknown): value is Player {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.uid === 'string' && typeof candidate.name === 'string';
}

function isHighScore(value: unknown): value is HighScore {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.game === 'number' &&
    typeof candidate.time === 'number' &&
    isPlayer(candidate.user)
  );
}

function readJson(key: string): unknown {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function loadPlayer(): Player | null {
  const value = readJson(PLAYER_KEY);
  return isPlayer(value) ? value : null;
}

export function storePlayer(player: Player): void {
  try {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
  } catch {
    // The game remains playable when storage is unavailable.
  }
}

export function removePlayer(): void {
  try {
    localStorage.removeItem(PLAYER_KEY);
  } catch {
    // The in-memory session is still cleared.
  }
}

function loadScores(): HighScore[] {
  const value = readJson(SCORES_KEY);
  return Array.isArray(value) ? value.filter(isHighScore) : [];
}

export function saveHighScore(game: number, player: Player, time: number): void {
  const score: HighScore = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    game,
    user: { uid: player.uid, name: player.name },
    time
  };

  try {
    localStorage.setItem(SCORES_KEY, JSON.stringify([...loadScores(), score]));
  } catch {
    // A storage failure should never interrupt a completed game.
  }
}

export function getBestScores(game: number): HighScore[] {
  const bestByPlayer = new Map<string, HighScore>();
  const sorted = loadScores()
    .filter((score) => score.game === game)
    .sort((left, right) => left.time - right.time);

  for (const score of sorted) {
    const key = score.user.name.toLocaleLowerCase();
    if (!bestByPlayer.has(key)) bestByPlayer.set(key, score);
  }

  return [...bestByPlayer.values()].slice(0, 10);
}

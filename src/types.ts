export interface User {
  uid: string;
  name: string;
}

export type Player = User;

export interface HighScore {
  id: string;
  game: number;
  user: User;
  time: number;
}

export type GameStatus = 'playing' | 'stopped' | 'won';

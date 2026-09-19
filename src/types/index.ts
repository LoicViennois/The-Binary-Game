export interface User {
  uid: string;
  name: string;
}

export type Player = User;

export interface HighScore {
  id?: string;
  game: number;
  user: User;
  time: number;
}

export type GridSize = 3 | 4 | 5 | 6 | 7 | 8;

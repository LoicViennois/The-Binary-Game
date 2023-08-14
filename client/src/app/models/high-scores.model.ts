import { User } from './user.model';

export interface HighScore {
  id?: string;
  game: number;
  user: User;
  time: number;
}

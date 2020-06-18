import { User } from './user.model'

export interface HighScore {
  game: number
  user: User
  time: number
}

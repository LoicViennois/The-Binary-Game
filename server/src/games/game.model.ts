import { User } from '../users/user.model'

export interface Game {
  player: User
  grid: number[][],
  rowValid: boolean[],
  colValid: boolean[]
}

export interface GameStart {
  player: User,
  size: number,
  event: string
}

export interface GameWin {
  player: User,
  time: number
}

export interface GameRequest {
  from: User,
  to: User,
  type: string
  accepted: boolean
}

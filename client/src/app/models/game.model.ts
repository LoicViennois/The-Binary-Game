import { Player } from './player.model'

export enum RequestType {
  request = 'request',
  response = 'response',
  stop = 'stop'
}

export enum EventType {
  start = 'start',
  restart = 'restart',
  end = 'end'
}

export interface Game {
  player: Player
  grid: number[][],
  rowValid: boolean[],
  colValid: boolean[]
}

export interface GameStart {
  player: Player,
  size: number,
  event: EventType
}

export interface GameWin {
  player: Player,
  time: number
}

export interface GameRequest {
  from: Player,
  to: Player,
  type: RequestType
  accepted: boolean
}

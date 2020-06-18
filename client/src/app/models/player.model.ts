import { User } from './user.model'

export interface Player extends User {
  playing: boolean
  inParty: boolean
  lastCheckin: number
}

export function createPlayer (user: User): Player {
  return {
    ...user,
    inParty: false,
    playing: false,
    lastCheckin: Date.now()
  }
}

export function getUser (player: Player): User {
  const { name, uid } = player
  return { name, uid }
}

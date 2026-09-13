import { User } from './user.model';

export interface Player extends User {}

export function createPlayer(user: User): Player {
  return {
    ...user
  };
}

export function getUser(player: Player): User {
  const { name, uid } = player;
  return { name, uid };
}

import { User } from './user.model'

export interface Message {
  sender: User,
  text: string,
  timestamp: number
}

import { User } from '../users/user.model'

export interface Message {
  sender: User,
  text: string
}

import { Server, Socket } from 'socket.io'
import { Message } from './message.model'

export class MessagesSocket {
  private static messages: Message[] = []
  private static readonly keep = 200

  static connect (io: Server, socket: Socket) {
    socket.on('message', (message: Message) => {
      console.log(`message: ${JSON.stringify({ sender: message.sender.name, text: message.text })}`)
      this.messages.unshift(message)
      io.emit('message', message)
      this.messages = this.messages.slice(0, this.keep)
    })

    socket.on('messages-all', () => {
      console.log('messages-all')
      socket.emit('messages-all', this.messages)
    })
  }
}

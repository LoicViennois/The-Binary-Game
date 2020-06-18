import { omit, remove } from 'lodash'
import { Server, Socket } from 'socket.io'

import { User } from './user.model'

export class UsersSocket {
  private static _users: User[] = []

  static connect (io: Server, socket: Socket) {
    socket.on('user-connect', (user: User) => {
      user.socketId = socket.id
      if (!this._users.some((u) => u.id === user.id)) {
        console.log(`user-connect: ${JSON.stringify(user)}`)
        this._users.push(user)
      }
      io.emit('users', this.users)
    })

    socket.on('user-disconnect', (user: User) => {
      console.log(`user-disconnect: ${JSON.stringify(user)}`)
      remove(this._users, (u) => u.id === user.id)
      io.emit('users', this.users)
    })

    socket.on('user-update', (user: User) => {
      user.socketId = socket.id
      console.log(`user-update: ${JSON.stringify(user)}`)
      let i = this._users.findIndex((u: User) => u.id === user.id)
      this._users[i] = user
      io.emit('users', this.users)
    })
  }

  static introduce (io: Server) {
    console.log('présentez-vous')
    io.emit('users-introduce')
  }

  static disconnect (io: Server, socket: Socket) {
    remove(this._users, (u) => u.socketId === socket.id)
    io.emit('users', this.users)
  }

  private static get users () {
    return this._users.map((u) => omit(u, 'socketId'))
  }

}

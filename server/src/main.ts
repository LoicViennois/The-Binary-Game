import * as compression from 'compression'
import * as express from 'express'
import * as helmet from 'helmet'
import * as socketIo from 'socket.io'
import { Server, Socket } from 'socket.io'

import { GamesSocket } from './games/games.socket'
import { MessagesSocket } from './messages/messages.socket'
import { UsersSocket } from './users/users.socket'

/**
 * Express
 */
let app = express()
app.set('port', process.env.PORT || 3000)

if (app.get('env') === 'production') {
  app.use(helmet())
  app.use(compression())
}

let server = app.listen(app.get('port'), '127.0.0.1', () => {
  console.log(`express app listening on port ${app.get('port')}`)
})

/**
 * Socket IO
 */
let io: Server = socketIo(server)

io.on('connection', (socket: Socket) => {
  console.log('client connected')

  GamesSocket.connect(io, socket)
  MessagesSocket.connect(io, socket)
  UsersSocket.connect(io, socket)
  UsersSocket.introduce(io)

  socket.on('disconnect', () => {
    UsersSocket.disconnect(io, socket)
    console.log('client disconnected')
  })
})

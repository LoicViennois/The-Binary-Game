import { Server, Socket } from 'socket.io'
import { Game, GameRequest, GameStart, GameWin } from './game.model'

export class GamesSocket {
  static connect (io: Server, socket: Socket) {
    socket.on('game', (game: Game) => {
      console.log(`game: ${JSON.stringify(game)}`)
      io.emit('game', game)
    })

    socket.on('game-start', (game: GameStart) => {
      console.log(`game-start: ${JSON.stringify(game)}`)
      io.emit('game-start', game)
    })

    socket.on('game-win', (game: GameWin) => {
      console.log(`game-win: ${JSON.stringify(game)}`)
      io.emit('game-win', game)
    })

    socket.on('game-request', (game: GameRequest) => {
      console.log(`game-request: ${JSON.stringify(game)}`)
      io.emit('game-request', game)
    })
  }

}

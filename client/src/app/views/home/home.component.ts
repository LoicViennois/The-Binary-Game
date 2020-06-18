import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { takeUntil } from 'rxjs/operators'

import { Unsubscribe } from '../../shared/unsubscribe'
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component'
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component'
import { MultiplayerService } from '../../services/multiplayer.service'
import { AuthService } from '../../services/auth.service'
import { GameRequest, RequestType } from '../../models/game.model'
import { Player } from '../../models/player.model'
import { DbService } from '../../services/db.service'


@Component({
  selector: 'bin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less', '../../shared/panels.less']
})
export class HomeComponent extends Unsubscribe implements OnInit {
  expandedLeft = false
  expandedRight = false

  @ViewChild(ConfirmModalComponent, { static: true }) confirmModal: ConfirmModalComponent
  @ViewChild(AlertModalComponent, { static: true }) alertModal: AlertModalComponent

  constructor (private multiplayerService: MultiplayerService,
               private authService: AuthService,
               private router: Router,
               private dbService: DbService) {
    super()
  }

  ngOnInit () {
    this.multiplayerService.gameStarting()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(size => {
        this.router.navigate(['/play', size]).then()
      })
    this.multiplayerService.requestReceived()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((request: GameRequest) => {
        this.answerRequest(request)
      })
    this.multiplayerService.responseReceived()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((request: GameRequest) => {
        if (request.accepted) {
          this.alertModal.open('Request accepted', `${request.to.name} accepted you request`).then(
            () => this.multiplayerService.playWith(request.to)
          )
        } else {
          this.alertModal.open('Request refused', `${request.to.name} refused you request`).then()
        }
      })
  }

  onPlayRequest (player: Player) {
    if (this.isOpponent(player)) {
      this.confirmModal.open('Stop playing', `Stop playing with ${player.name}?`).then(() => {
        this.multiplayerService.sendRequest(player, RequestType.stop)
        this.multiplayerService.playWith(null)
      })
    } else if (this.opponent !== null) {
      this.alertModal.open('Play request', `You already play with ${this.opponent.name}`).then()
    } else {
      this.confirmModal.open('Play request', `Send play request to ${player.name}?`).then(
        () => this.multiplayerService.sendRequest(player)
      )
    }
  }

  play (size: number) {
    if (this.opponent) {
      this.multiplayerService.startGame(size)
    }
    this.router.navigate(['/play', size]).then()
  }

  get connected (): boolean {
    return this.dbService.connected
  }

  private isOpponent (player: Player) {
    return this.opponent ? player.uid === this.opponent.uid : false
  }

  private get opponent (): Player {
    return this.multiplayerService.opponent
  }

  private answerRequest (request: GameRequest) {
    if (request.type === RequestType.stop) {
      this.multiplayerService.playWith(null)
    } else {
      request.type = RequestType.response
      this.confirmModal.open('Play request', `Accept play request from ${request.from.name}?`).then(
        () => { // Accepted
          request.accepted = true
          this.multiplayerService.answerRequest(request)
          this.multiplayerService.playWith(request.from)
        },
        () => { // Not accepted
          request.accepted = false
          this.multiplayerService.answerRequest(request)
        })
    }
  }
}

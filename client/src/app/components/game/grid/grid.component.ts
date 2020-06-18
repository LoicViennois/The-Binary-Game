import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core'
import { isEqual, range, times, zipWith } from 'lodash'
import { takeUntil } from 'rxjs/operators'
import { Unsubscribe } from '../../../shared/unsubscribe'
import { BoxComponent } from '../box/box.component'
import { GameService } from '../../../services/game.service'
import { MultiplayerService } from '../../../services/multiplayer.service'
import { AuthService } from '../../../services/auth.service'
import { zeros } from '../../../shared/utils'


@Component({
  selector: 'bin-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent extends Unsubscribe implements OnInit {
  range: number[] = []
  rowTot: number[] = []
  colTot: number[] = []
  rowTarget: number[] = []
  colTarget: number[] = []
  success = false
  opponentWin = false

  @Input() stopped: boolean
  @Input() size: number
  @ViewChildren(BoxComponent) boxes: QueryList<BoxComponent>
  @Output() completed = new EventEmitter<boolean>()

  private grid: number[][]

  constructor (private gameService: GameService,
               private multiplayerService: MultiplayerService,
               private authService: AuthService) {
    super()
  }

  ngOnInit () {
    this.range = range(this.size)
    this.multiplayerService.opponentWin()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.success = false
        this.opponentWin = true
      })
    this.init()
  }

  updateValue (row: number, col: number, value: number) {
    let mul = value ? 1 : -1

    this.rowTot[row] += mul * 2 ** (this.size - col - 1)
    this.colTot[col] += mul * 2 ** (this.size - row - 1)

    this.success = isEqual(this.rowTot, this.rowTarget) && isEqual(this.colTot, this.colTarget)
    if (this.success) {
      this.completed.emit(this.success)
    }

    this.grid[row][col] = value
    this.gameService.update({
      player: this.authService.player,
      grid: this.grid,
      rowValid: zipWith(this.rowTot, this.rowTarget, (a, b) => a === b),
      colValid: zipWith(this.colTot, this.colTarget, (a, b) => a === b),
    })
  }

  reset () {
    this.boxes.forEach(b => b.reset())
    this.init()
  }

  private init () {
    this.success = false
    this.opponentWin = false
    this.rowTot = zeros(this.size)
    this.colTot = zeros(this.size)

    this.grid = []
    times(this.size, () => {
      this.grid.push(zeros(this.size))
    })

    do {
      this.rowTarget = zeros(this.size)
      this.colTarget = zeros(this.size)
      this.seed()
    } while (this.rowTarget.includes(0) || this.colTarget.includes(0))
  }

  private seed () {
    for (let r of this.range) {
      for (let c of this.range) {
        let mul = Math.floor(Math.random() * 2)
        this.rowTarget[r] += mul * 2 ** (this.size - c - 1)
        this.colTarget[c] += mul * 2 ** (this.size - r - 1)
      }
    }
  }

}

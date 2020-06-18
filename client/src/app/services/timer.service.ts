import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class TimerService {
  time: BehaviorSubject<number>

  private _timer: NodeJS.Timer

  start () {
    if (this._timer != null) {
      this.stop()
    }
    const time0 = Date.now()
    this.time = new BehaviorSubject(time0)
    this._timer = setInterval(() => {
      this.time.next(Date.now() - time0)
    }, 10)
  }

  stop () {
    clearInterval(this._timer)
    this.time.complete()
  }
}

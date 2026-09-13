import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TimerService {
  time: BehaviorSubject<number>;

  private timer: NodeJS.Timer;

  start(): void {
    if (this.timer != null) {
      this.stop();
    }
    const time0 = Date.now();
    this.time = new BehaviorSubject(time0);
    this.timer = setInterval(() => {
      this.time.next(Date.now() - time0);
    }, 10);
  }

  stop(): void {
    clearInterval(this.timer);
    this.time.complete();
  }
}

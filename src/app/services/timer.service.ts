import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TimerService {
  time: BehaviorSubject<number>;

  private timer: ReturnType<typeof setInterval> | null = null;

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
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.time.complete();
  }
}

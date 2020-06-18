import { OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

export class Unsubscribe implements OnDestroy {
  protected unsubscribe = new Subject<void>()

  ngOnDestroy () {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}

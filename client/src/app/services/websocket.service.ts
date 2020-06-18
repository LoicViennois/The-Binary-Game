import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

// TODO: delete this file
@Injectable()
export class WebsocketService {

  constructor () {
  }

  connect<T> (event: string): Subject<T> {
    return new Subject<T>()
  }
}

import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

class Doc {
  set (a: any) {
  }

  update (a: any) {
  }
}

export class AngularFirestoreCollection<T> {
  async add (a: any) {
  }

  doc (a: any): Doc {
    return new Doc()
  }

  valueChanges (): Observable<T> {
    return new Observable<T>()
  }
}

@Injectable()
export class AngularFirestore {
  collection<T> (a: any, b?: any): AngularFirestoreCollection<T> {
    return new AngularFirestoreCollection()
  }
}

class Auth {
  signInAnonymously() {
    return 'xyz'
  }

  async signOut () {
  }
}

@Injectable()
export class AngularFireAuth {
  auth = new Auth()
}

class Obj {
  valueChanges (): Observable<any> {
    return new Observable<any>()
  }
}

@Injectable()
export class AngularFireDatabase {
  object (a: any): Obj {
    return new Obj()
  }
}

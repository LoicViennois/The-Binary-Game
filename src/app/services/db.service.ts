import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private afDb = inject(AngularFireDatabase);

  connected: boolean;

  constructor() {
    this.afDb.object<boolean>('.info/connected').valueChanges().subscribe((connected: boolean) => {
      this.connected = connected;
    });
  }
}

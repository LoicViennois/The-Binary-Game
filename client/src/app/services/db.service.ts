import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  connected: boolean;

  constructor(private afDb: AngularFireDatabase) {
    this.afDb.object('.info/connected').valueChanges().subscribe((connected: boolean) => {
      this.connected = connected;
    });
  }
}

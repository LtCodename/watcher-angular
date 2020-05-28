import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AddPanelService {

  constructor(private firestore: AngularFirestore) { }

  addNewDirector(name: string) {
    return this.firestore.collection('directors').add({
      name
    })
  }
}

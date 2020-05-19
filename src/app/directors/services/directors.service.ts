import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DirectorsService {

  constructor(private firestore: AngularFirestore ) { }

  getDirectors() {
    return this.firestore.collection('directors')
        .snapshotChanges()
        .pipe(map((data) => {
          return data.map((e) => ({
            id: e.payload.doc.id,
            // @ts-ignore
            ...e.payload.doc.data()
          }));
        }));
  }
}

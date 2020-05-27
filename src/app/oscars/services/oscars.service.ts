import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OscarsService {

  constructor(private firestore: AngularFirestore) { }

  getYears() {
    return this.firestore.collection('oscarYears')
      .snapshotChanges()
      .pipe(map(this.processSnapshot));
  }

  getMovies() {
    return this.firestore.collection('oscarMovies')
      .snapshotChanges()
      .pipe(map(this.processSnapshot));
  }

  private processSnapshot(data) {
    return data.map((e) => ({
      id: e.payload.doc.id,
      // @ts-ignore
      ...e.payload.doc.data()
    }));
  }
}

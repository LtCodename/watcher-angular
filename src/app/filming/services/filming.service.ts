import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FilmingService {


  constructor(private firestore: AngularFirestore) { }

  getFilming() {
    return this.firestore.collection('filming')
        .snapshotChanges()
        .pipe(map(this.processSnapshot));
  }

  getDirectors() {
    return this.firestore.collection('directors')
        .snapshotChanges()
        .pipe(map(this.processSnapshot));
  }

  private processSnapshot(data) {
    let finalResults = data.map((e) => ({
      id: e.payload.doc.id,
      // @ts-ignore
      ...e.payload.doc.data()
    })).sort((a:any, b: any) => {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    })

    return finalResults;
  }
}

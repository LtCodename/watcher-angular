import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmingService {

  filming$: Observable<any>;

  private filmingSubject: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore) {
    this.filming$ = this.filmingSubject.asObservable();

    this.getFilming().subscribe(data => {
      this.filmingSubject.next(data);
  });
   }

  getFilming() {
    return this.firestore.collection('filming')
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

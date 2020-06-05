import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OscarsService {

  oscarYears$: Observable<any>;
  oscarMovies$: Observable<any>;

  private oscarYearsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  private oscarMoviesSubject: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore) {
      this.oscarYears$ = this.oscarYearsSubject.asObservable();
      this.oscarMovies$ = this.oscarMoviesSubject.asObservable();

      this.getYears().subscribe(data => {
        this.oscarYearsSubject.next(data);
    });

    this.getMovies().subscribe(data => {
        this.oscarMoviesSubject.next(data);
    });
   }

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

  deleteYear(id: string) {
    return this.firestore.collection('oscarYears').doc(id).delete();
  }

  toggleWatchedOscars(id: string, watched: boolean) {
    return this.firestore.collection('oscarMovies').doc(id).update({ watched });
  }

  removeMovieFromOscars(id: string) {
    return this.firestore.collection('oscarMovies').doc(id).delete();
  }

  private processSnapshot(data) {
    return data.map((e) => ({
      id: e.payload.doc.id,
      // @ts-ignore
      ...e.payload.doc.data()
    }));
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { IFilmingMovie } from 'src/interface';

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

  updateYearInFilming(id: string, year: number, name: string) {
    return this.firestore.collection('filming').doc(id).update({ year, name });
  }

  releaseMovie(name: string, year: number, director: string, idToRemove: string ) {
    let addToDirectors = this.firestore.collection('movies').add({
      name,
      year,
      director
    })

    let removeFromFilming = this.firestore.collection('filming').doc(idToRemove).delete();

    return forkJoin([addToDirectors, removeFromFilming]);
  }

  removeMovieFromFilming(id: string) {
    return this.firestore.collection('filming').doc(id).delete();
  }

  private processSnapshot(data) {
    let finalResults = data.map((e) => ({
      id: e.payload.doc.id,
      // @ts-ignore
      ...e.payload.doc.data()
    })).sort((a: IFilmingMovie, b: IFilmingMovie) => {
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

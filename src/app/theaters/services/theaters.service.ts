import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ITheaterMovie } from 'src/interface';

@Injectable({
  providedIn: 'root'
})
export class TheatersService {

  movies$: Observable<any>;

  private moviesSubject: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore) { 
    this.movies$ = this.moviesSubject.asObservable();

    this.getMovies().subscribe(data => {
      this.moviesSubject.next(data);
    });
  }

  getMovies() {
    return this.firestore.collection('theaters')
        .snapshotChanges()
        .pipe(map(this.processSnapshot));
  }

  updateDataInTheaters(id: string, year: number, name: string, month: number) {
    return this.firestore.collection('theaters').doc(id).update({ year, name, month });
  }

  toggleWatchedTheaters(id: string, watched: boolean) {
    return this.firestore.collection('theaters').doc(id).update({ watched });
  }

  toggleFavoritesTheaters(id: string, bookmarked: boolean) {
    return this.firestore.collection('theaters').doc(id).update({ priority: bookmarked });
  }

  removeMovieFromTheatres(id: string) {
    return this.firestore.collection('theaters').doc(id).delete();
  }

  private processSnapshot(data) {
    let finalResults = data.map((e) => ({
      id: e.payload.doc.id,
      // @ts-ignore
      ...e.payload.doc.data()
    })).sort((a: ITheaterMovie, b: ITheaterMovie) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })

    return finalResults;
  }
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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

  private processSnapshot(data) {
    let finalResults = data.map((e) => ({
      id: e.payload.doc.id,
      // @ts-ignore
      ...e.payload.doc.data()
    })).sort((a:any, b: any) => {
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

import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { forkJoin, BehaviorSubject, Observable } from 'rxjs';
import { IDirector } from 'src/interface';

export const OMDbApiKey: string = '36827e98';

@Injectable({
    providedIn: 'root'
})
export class DirectorsService {

    directors$: Observable<IDirector[]>;
    movies$: Observable<any>;

    private directorsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
    private moviesSubject: BehaviorSubject<any> = new BehaviorSubject([]);

    constructor(private firestore: AngularFirestore, private  http: HttpClient ) {
        this.directors$ = this.directorsSubject.asObservable();
        this.movies$ = this.moviesSubject.asObservable();

        this.getDirectors().subscribe(data => {
            this.directorsSubject.next(data);
        });

        this.getMovies().subscribe(data => {
            this.moviesSubject.next(data);
        });
    }

    toggleBookmarkMovie(id: string, bookmarked: boolean) {
        return this.firestore.collection('movies').doc(id).update({ bookmarked });
    }

    deleteDirector(id: string) {
        return this.firestore.collection('directors').doc(id).delete();
    }
    
    updateYearInFilming(id: string, year: number, name: string) {
        return this.firestore.collection('filming').doc(id).update({ year, name });
    }

    updateDataInTheaters(id: string, year: number, name: string, month: number) {
        return this.firestore.collection('theaters').doc(id).update({ year, name, month });
    }

    toggleMovieWatchedStatus(id: string, watched: boolean) {
        return this.firestore.collection('movies').doc(id).update({ watched });
    }

    toggleWatchedOscars(id: string, watched: boolean) {
        return this.firestore.collection('oscarMovies').doc(id).update({ watched });
    }

    toggleWatchedTheaters(id: string, watched: boolean) {
        return this.firestore.collection('theaters').doc(id).update({ watched });
    }

    toggleFavoritesTheaters(id: string, bookmarked: boolean) {
        return this.firestore.collection('theaters').doc(id).update({ priority: bookmarked });
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

    removeMovieFromDirectors(id: string) {
        return this.firestore.collection('movies').doc(id).delete();
    }

    removeMovieFromOscars(id: string) {
        return this.firestore.collection('oscarMovies').doc(id).delete();
    }

    removeMovieFromTheatres(id: string) {
        return this.firestore.collection('theaters').doc(id).delete();
    }

    removeMovieFromFilming(id: string) {
        return this.firestore.collection('filming').doc(id).delete();
    }

    getMovieDataFromIMDBApi(name: string, year: number) {
        return this.http.get(`//www.omdbapi.com/?t=${(name).toLowerCase()}&y=${year}&plot=full&apikey=${OMDbApiKey}`);
    }

    private getDirectors() {
        return this.firestore.collection('directors')
            .snapshotChanges()
            .pipe(map(this.processSnapshot));
    }

    private getMovies() {
        return this.firestore.collection('movies')
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

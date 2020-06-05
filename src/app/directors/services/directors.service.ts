import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import {  BehaviorSubject, Observable } from 'rxjs';
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

    toggleBookmarkMovie(id: string, bookmarked: boolean) {
        return this.firestore.collection('movies').doc(id).update({ bookmarked });
    }

    toggleMovieWatchedStatus(id: string, watched: boolean) {
        return this.firestore.collection('movies').doc(id).update({ watched });
    }

    deleteDirector(id: string) {
        return this.firestore.collection('directors').doc(id).delete();
    }

    removeMovieFromDirectors(id: string) {
        return this.firestore.collection('movies').doc(id).delete();
    }
}

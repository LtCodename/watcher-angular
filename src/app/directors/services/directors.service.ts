import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DirectorsService {
    OMDbApiKey: string = '36827e98';

    constructor(private firestore: AngularFirestore, private  http: HttpClient ) { }

    getDirectors() {
        return this.firestore.collection('directors')
            .snapshotChanges()
            .pipe(map(this.processSnapshot));
    }

    getMovies() {
        return this.firestore.collection('movies')
            .snapshotChanges()
            .pipe(map(this.processSnapshot));
    }

    toggleBookmarkMovie(id: string, bookmarked: boolean) {
        return this.firestore.collection('movies').doc(id).update({ bookmarked });
    }

    toggleMovieWatchedStatus(id: string, watched: boolean) {
        return this.firestore.collection('movies').doc(id).update({ watched });
    }

    getMovieDataFromIMDBApi(name: string, year: number) {
        return this.http.get(`//www.omdbapi.com/?t=${(name).toLowerCase()}&y=${year}&plot=full&apikey=${this.OMDbApiKey}`);
    }

    private processSnapshot(data) {
        return data.map((e) => ({
            id: e.payload.doc.id,
            // @ts-ignore
            ...e.payload.doc.data()
        }));
    }
}

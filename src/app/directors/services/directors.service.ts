import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { forkJoin } from 'rxjs';

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

    updateYearInFilming(id: string, year: number) {
        return this.firestore.collection('filming').doc(id).update({ year });
    }

    toggleMovieWatchedStatus(id: string, watched: boolean) {
        return this.firestore.collection('movies').doc(id).update({ watched });
    }

    releaseMovie(name: string, year: number, director: string, idToRemove: string ) {
        let addToDirectors = this.firestore.collection('movies').add({
            name,
            year,
            director
        })

        let removeFromFilming = this.firestore.collection('filming').doc(idToRemove).delete()

        return forkJoin([addToDirectors, removeFromFilming]);
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

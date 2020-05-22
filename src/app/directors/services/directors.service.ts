import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { IMovieApiData } from "../directors.model";
import axios from "axios";

@Injectable({
    providedIn: 'root'
})
export class DirectorsService {
    OMDbApiKey: string = '36827e98';

    constructor(private firestore: AngularFirestore) { }

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

    async getMovieDataFromIMDBApi(name: string, year: number) {
        let fromServer:IMovieApiData = {};
        try {
            const { data } = await axios.get(
                `//www.omdbapi.com/?t=${(name).toLowerCase()}&y=${year}&plot=full&apikey=${this.OMDbApiKey}`, {
                });
            fromServer = {
                year: data['Year'],
                awards: data['Awards'],
                metascore: data['Metascore'],
                imdbRating: data['imdbRating']
            };
        } catch (e) {
            throw new Error('Something went wrong!');
        }
        return fromServer;
    }

    private processSnapshot(data) {
        return data.map((e) => ({
            id: e.payload.doc.id,
            // @ts-ignore
            ...e.payload.doc.data()
        }));
    }
}

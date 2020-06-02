import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { HttpClient } from '@angular/common/http';
import { OMDbApiKey } from 'src/app/directors/services/directors.service';

@Injectable({
  providedIn: 'root'
})
export class AddPanelService {

  constructor(private firestore: AngularFirestore, private http: HttpClient) { }

  addNewDirector(name: string) {
    return this.firestore.collection('directors').add({
      name
    })
  }

  searchApi(name: string) {
    return this.http.get(`//www.omdbapi.com/?s=${(name).toLowerCase()}&type=movie&apikey=${OMDbApiKey}`);
  }

  addNewMovie(directorId: string, movieName: string, releaseYear: number) {
    return this.firestore.collection('movies').add({
      director: directorId,
      name: movieName,
      watched: false,
      year: releaseYear
    })
  }

  addNewFilmingMovie(directorId: string, movieName: string, releaseYear: number) {
    return this.firestore.collection('filming').add({
      director: directorId,
      name: movieName,
      year: releaseYear
    })
  }
}
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMovie } from '../directors.model';
import { DirectorsService } from "../services/directors.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit, OnChanges {
  showMovies: boolean = false;
  percentage: number = 0;

  @Input() name: string;
  @Input() id: string;
  @Input() movies: IMovie[] = [];

  constructor(private directorsService: DirectorsService, private serverMessage: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.movies) {
      this.movies = this.movies.sort((a: any, b: any) => {
        return a.year - b.year;
      })
    }

    this.calculatePercentage();
  }

  onDirector(): void {
    this.showMovies = !this.showMovies;
  }

  calculatePercentage(): void {
    const watched = this.movies.filter((elem: IMovie) => elem.watched);
    const percentageRaw = ((watched.length * 100) / this.movies.length) || 0;
    this.percentage = Number(Math.round(percentageRaw));
  }

  toggleFavoritesDirectors(id: string, bookmarked: boolean):void {
    this.directorsService.toggleBookmarkMovie(id, bookmarked).then(r => {
      this.showServerMessage();
    }).catch(data => {
      this.showServerMessage(true);
    })
  }

  toggleWatchedDirectors(id: string, watched: boolean):void {
    this.directorsService.toggleMovieWatchedStatus(id, watched).then(r => {
      this.showServerMessage();
    }).catch(data => {
      this.showServerMessage(true);
    })
  }

  fetchMovieInformation(name: string, year: number):void {
    this.directorsService.getMovieDataFromIMDBApi(name, year).then(movieData => {
      console.log(movieData);
    }).catch(data => {
    })
  }

  showServerMessage(error: boolean = false): void {
    let message: string = "Updated successfully!";
    if (error) message = "Error!";

    this.serverMessage.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: "right"
    });
  }
}

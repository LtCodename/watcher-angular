import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DirectorsService } from "../../directors/services/directors.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieDetails: object = null;

  @Input() name: string = '';
  @Input() year: number;
  @Input() watched: boolean;
  @Input() bookmarked: boolean = false;
  @Input() director: string = '';
  @Input() directorName: string = '';
  @Input() mode: string = '';
  @Input() showWatchedDirectorButton: boolean = false;
  @Input() showInfoButton: boolean = false;
  @Input() showBookmarkButton: boolean = false;
  @Input() showReleasedButton: boolean = false;

  @Output() toggleFavoritesDirectors: EventEmitter<void> = new EventEmitter();
  @Output() toggleWatchedDirectors: EventEmitter<void> = new EventEmitter();

  constructor(private directorsService: DirectorsService) { }

  toggleFavorites(): void {
    this.toggleFavoritesDirectors.emit();
  }

  toggleWatched(): void {
    this.toggleWatchedDirectors.emit();
  }

  getMovieData(): void {
    if (this.movieDetails) {
      this.movieDetails = null;
      return;
    }

    this.directorsService.getMovieDataFromIMDBApi(this.name, this.year).subscribe(response => {
      this.movieDetails = response;
    })
  }

  ngOnInit(): void {
  }
}

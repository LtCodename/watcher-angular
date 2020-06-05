import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DirectorsService } from "../../directors/services/directors.service";
import { MatDialog } from '@angular/material/dialog';
import { MovieDataWindowComponent } from "../movie-data-window/movie-data-window.component";
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() name: string = '';
  @Input() year: number;
  @Input() watched: boolean;
  @Input() id: string;
  @Input() bookmarked: boolean = false;
  @Input() director: string = '';
  @Input() directorName: string = '';
  @Input() mode: string = '';
  @Input() month: number;
  @Input() showWatchedDirectorButton: boolean = false;
  @Input() showWatchedOscarsButton: boolean = false;
  @Input() showWatchedTheatersButton: boolean = false;
  @Input() showInfoButton: boolean = false;
  @Input() showBookmarkButton: boolean = false;
  @Input() showReleasedButton: boolean = false;
  @Input() showEditButton: boolean = false;
  @Input() releasedYear: number;

  @Output() toggleFavoritesMovie: EventEmitter<void> = new EventEmitter();
  @Output() toggleWatchedMovie: EventEmitter<void> = new EventEmitter();
  @Output() deleteMovie: EventEmitter<void> = new EventEmitter();
  @Output() editMovie: EventEmitter<void> = new EventEmitter();

  constructor(
      private directorsService: DirectorsService,
      public dialog: MatDialog,
      private alertService: AlertService,
  ) { }


  toggleFavorites(): void {
    this.toggleFavoritesMovie.emit();
  }

  toggleWatched(): void {
    this.toggleWatchedMovie.emit();
  }

  delete(): void {
    this.deleteMovie.emit();
  }

  edit(): void {
    this.editMovie.emit();
  }

  getMovieData(): void {
    let yearForDb: number = this.year;
    if(this.mode === 'theatersMode') {
      yearForDb = this.releasedYear;
    }

    this.directorsService.getMovieDataFromIMDBApi(this.name, yearForDb).subscribe(response => {
      if (response['Error']) {
        this.alertService.showAlert('Movie not found, update release year!');
        return;
      }

      this.dialog.open(MovieDataWindowComponent, {data: {
        movie: response
      }});
    })
  }

  ngOnInit(): void {
  }
}

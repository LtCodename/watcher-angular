import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DirectorsService } from "../../directors/services/directors.service";
import { MatDialog } from '@angular/material/dialog';
import { MovieDataWindowComponent } from "../movie-data-window/movie-data-window.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

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
  @Output() toggleMovieReleased: EventEmitter<void> = new EventEmitter();

  constructor(
      private directorsService: DirectorsService,
      public dialog: MatDialog,
      private serverMessage: MatSnackBar
  ) { }


  toggleFavorites(): void {
    this.toggleFavoritesDirectors.emit();
  }

  toggleWatched(): void {
    this.toggleWatchedDirectors.emit();
  }

  markAsReleased(): void {
    console.log('hello 1');
    this.toggleMovieReleased.emit();
  }

  getMovieData(): void {
    this.directorsService.getMovieDataFromIMDBApi(this.name, this.year).subscribe(response => {
      if (response['Error']) {
        this.serverMessage.open('Movie not found, update release year!', 'Dismiss', {
          duration: 3000,
          horizontalPosition: "right"
        });
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

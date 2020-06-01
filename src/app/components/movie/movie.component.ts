import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DirectorsService } from "../../directors/services/directors.service";
import { MatDialog } from '@angular/material/dialog';
import { MovieDataWindowComponent } from "../movie-data-window/movie-data-window.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ChangeYearWindowComponent } from '../change-year-window/change-year-window.component';
import { ConfirmWindowComponent } from '../confirm-window/confirm-window.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  yearChangeDialog: any;
  confirmWindow: any;

  @Input() name: string = '';
  @Input() year: number;
  @Input() watched: boolean;
  @Input() id: string;
  @Input() bookmarked: boolean = false;
  @Input() director: string = '';
  @Input() directorName: string = '';
  @Input() mode: string = '';
  @Input() showWatchedDirectorButton: boolean = false;
  @Input() showWatchedOscarsButton: boolean = false;
  @Input() showInfoButton: boolean = false;
  @Input() showBookmarkButton: boolean = false;
  @Input() showReleasedButton: boolean = false;

  @Output() toggleFavoritesDirectors: EventEmitter<void> = new EventEmitter();
  @Output() toggleWatchedDirectors: EventEmitter<void> = new EventEmitter();

  constructor(
      private directorsService: DirectorsService,
      public dialog: MatDialog,
      private serverMessage: MatSnackBar,
  ) { }


  toggleFavorites(): void {
    this.toggleFavoritesDirectors.emit();
  }

  toggleWatched(): void {
    this.toggleWatchedDirectors.emit();
  }

  toggleWatchedOscars(): void {
    this.directorsService.toggleWatchedOscars(this.id, !this.watched).then(response => {
      this.showMessage('Updated successfully!');
    }).catch(data => {
      this.showMessage('Error!');
      this.yearChangeDialog.close();
    })
  }

  cofirmMovieRelease(): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: () => this.markAsReleased()
    }});
  }

  markAsReleased(): void {
    this.directorsService.releaseMovie(this.name, this.year, this.director, this.id).subscribe((data) => {
      this.confirmWindow.close();
      this.showMessage('Updated successfully!');
    })
  }

  changeYearCallback(newYear: number): void {
    this.directorsService.updateYearInFilming(this.id, newYear).then(response => {
      this.yearChangeDialog.close();
      this.showMessage('Release year was updated!');
    }).catch(data => {
      this.showMessage('Error!');
      this.yearChangeDialog.close();
    })
  }

  showEditYearWindow(): void {
    this.yearChangeDialog = this.dialog.open(ChangeYearWindowComponent, {data: {
      changeYearCallback: (year: number) => this.changeYearCallback(year),
      oldYear: this.year
    }});
  }

  getMovieData(): void {
    this.directorsService.getMovieDataFromIMDBApi(this.name, this.year).subscribe(response => {
      if (response['Error']) {
        this.showMessage('Movie not found, update release year!');
        return;
      }

      this.dialog.open(MovieDataWindowComponent, {data: {
        movie: response
      }});
    })
  }

  confirmRemoveFromDirectors(): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: (id: string) => this.removeMovieFromDirectors(this.id)
    }});
  }

  removeMovieFromDirectors(id: string): void {
    this.directorsService.removeMovieFromDirectors(id).then((data) => {
      this.confirmWindow.close();
      this.showMessage('Updated successfully!');
    })
  }

  showMessage(msg: string): void {
    this.serverMessage.open(msg, 'Dismiss', {
      duration: 3000,
      horizontalPosition: "right"
    });
  }

  ngOnInit(): void {
  }
}

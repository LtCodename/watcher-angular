import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DirectorsService } from "../../directors/services/directors.service";
import { MatDialog } from '@angular/material/dialog';
import { MovieDataWindowComponent } from "../movie-data-window/movie-data-window.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ChangeYearWindowComponent } from '../change-year-window/change-year-window.component';
import { ConfirmWindowComponent } from '../confirm-window/confirm-window.component';
import { AuthErrorMessage } from 'src/app/app.component';

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
  @Input() showWatchedTheatersButton: boolean = false;
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
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
    })
  }

  toggleWatchedTheaters(): void {
    this.directorsService.toggleWatchedTheaters(this.id, !this.watched).then(response => {
      this.showMessage('Updated successfully!');
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
    })
  }

  toggleFavoritesTheaters(): void {
    this.directorsService.toggleFavoritesTheaters(this.id, !this.bookmarked).then(response => {
      this.showMessage('Updated successfully!');
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
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
    }, (error) => {
      this.confirmWindow.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
    })
  }

  changeDataCallback(newYear: number, newName: string): void {
    this.directorsService.updateYearInFilming(this.id, newYear, newName).then(response => {
      this.yearChangeDialog.close();
      this.showMessage('Release year was updated!');
    }).catch(error => {
      this.yearChangeDialog.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
    })
  }

  showEditYearWindow(): void {
    this.yearChangeDialog = this.dialog.open(ChangeYearWindowComponent, {data: {
      changeDataCallback: (year: number, name: string) => this.changeDataCallback(year, name),
      oldYear: this.year,
      oldName: this.name
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

  confirmRemoveFromFilming(): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: (id: string) => this.removeMovieFromFilming(this.id)
    }});
  }

  confirmRemoveFromOscars(): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: (id: string) => this.removeMovieFromOscars(this.id)
    }});
  }

  removeMovieFromOscars(id: string): void {
    this.directorsService.removeMovieFromOscars(id).then((data) => {
      this.confirmWindow.close();
      this.showMessage('Updated successfully!');
    }).catch(error => {
      this.confirmWindow.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
    })
  }

  removeMovieFromDirectors(id: string): void {
    this.directorsService.removeMovieFromDirectors(id).then((data) => {
      this.confirmWindow.close();
      this.showMessage('Updated successfully!');
    }).catch(error => {
      this.confirmWindow.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
    })
  }

  removeMovieFromFilming(id: string): void {
    this.directorsService.removeMovieFromFilming(id).then((data) => {
      this.confirmWindow.close();
      this.showMessage('Updated successfully!');
    }).catch(error => {
      this.confirmWindow.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
    })
  }

  showMessage(msg: string, time: number = 3000): void {
    this.serverMessage.open(msg, 'Dismiss', {
      duration: time,
      horizontalPosition: "right"
    });
  }

  ngOnInit(): void {
  }
}

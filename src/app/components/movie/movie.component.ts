import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DirectorsService } from "../../directors/services/directors.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MovieDataWindowComponent } from "../movie-data-window/movie-data-window.component";
import { ChangeYearWindowComponent } from '../change-year-window/change-year-window.component';
import { ConfirmWindowComponent } from '../confirm-window/confirm-window.component';
import { AuthErrorMessage } from 'src/app/app.component';
import { TheatersDataWindowComponent } from '../theaters-data-window/theaters-data-window.component';
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  yearChangeDialog: MatDialogRef<any>;
  theatersChangeDialog: MatDialogRef<any>;
  confirmWindow: MatDialogRef<any>;

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
  @Input() releasedYear: number;

  @Output() toggleFavoritesDirectors: EventEmitter<void> = new EventEmitter();
  @Output() toggleWatchedDirectors: EventEmitter<void> = new EventEmitter();

  constructor(
      private directorsService: DirectorsService,
      public dialog: MatDialog,
      private alertService: AlertService,
  ) { }


  toggleFavorites(): void {
    this.toggleFavoritesDirectors.emit();
  }

  toggleWatched(): void {
    this.toggleWatchedDirectors.emit();
  }

  toggleWatchedOscars(): void {
    this.directorsService.toggleWatchedOscars(this.id, !this.watched).then(response => {
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  toggleWatchedTheaters(): void {
    this.directorsService.toggleWatchedTheaters(this.id, !this.watched).then(response => {
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  toggleFavoritesTheaters(): void {
    this.directorsService.toggleFavoritesTheaters(this.id, !this.bookmarked).then(response => {
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
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
      this.alertService.showAlert('Updated successfully!');
    }, (error) => {
      this.confirmWindow.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  changeDataCallback(newYear: number, newName: string): void {
    this.directorsService.updateYearInFilming(this.id, newYear, newName).then(response => {
      this.yearChangeDialog.close();
      this.alertService.showAlert('Release year was updated!');
    }).catch(error => {
      this.yearChangeDialog.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
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

  showEditTheatersWindow(): void {
    this.theatersChangeDialog = this.dialog.open(TheatersDataWindowComponent, {data: {
      changeTheatersDataCallback: (year: number, name: string, month: number) => this.changeTheatersDataCallback(year, name, month),
      oldYear: this.year,
      oldName: this.name,
      oldMonth: this.month
    }});
  }

  changeTheatersDataCallback(newYear: number, newName: string, newMonth: number): void {
    this.directorsService.updateDataInTheaters(this.id, newYear, newName, newMonth).then(response => {
      this.theatersChangeDialog.close();
      this.alertService.showAlert('Information was updated!');
    }).catch(error => {
      this.theatersChangeDialog.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
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

  confirmRemoveFromTheaters(): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: (id: string) => this.removeMovieFromTheatres(this.id)
    }});
  }

  removeMovieFromOscars(id: string): void {
    this.directorsService.removeMovieFromOscars(id).then((data) => {
      this.confirmWindow.close();
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      this.confirmWindow.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  removeMovieFromTheatres(id: string): void {
    this.directorsService.removeMovieFromTheatres(id).then((data) => {
      this.confirmWindow.close();
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      this.confirmWindow.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  removeMovieFromDirectors(id: string): void {
    this.directorsService.removeMovieFromDirectors(id).then((data) => {
      this.confirmWindow.close();
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      this.confirmWindow.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  removeMovieFromFilming(id: string): void {
    this.directorsService.removeMovieFromFilming(id).then((data) => {
      this.confirmWindow.close();
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      this.confirmWindow.close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  ngOnInit(): void {
  }
}

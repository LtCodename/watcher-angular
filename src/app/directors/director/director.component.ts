import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DirectorsService } from "../services/directors.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/components/confirm-window/confirm-window.component';
import { AuthErrorMessage } from 'src/app/app.component';
import { IMovie } from 'src/interface';
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit, OnChanges {
  showMovies: boolean = false;
  percentage: number = 0;
  confirmWindow: MatDialogRef<any>;

  @Input() name: string;
  @Input() id: string;
  @Input() movies: IMovie[] = [];

  constructor(
    private directorsService: DirectorsService, 
    private alertService: AlertService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.movies) {
      this.movies = this.movies.sort((a: IMovie, b: IMovie) => {
        return a.year - b.year;
      })
    }

    this.calculatePercentage();
  }

  onDirector(): void {
    this.showMovies = !this.showMovies;
  }

  confirmRemove(): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: (id: string) => this.removeDirector(this.id)
    }});
  }

  removeDirector(id: string):void {
    this.directorsService.deleteDirector(id).then(r => {
      this.confirmWindow .close();
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      this.confirmWindow .close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  calculatePercentage(): void {
    const watched = this.movies.filter((elem: IMovie) => elem.watched);
    const percentageRaw = ((watched.length * 100) / this.movies.length) || 0;
    this.percentage = Number(Math.round(percentageRaw));
  }

  toggleFavoritesDirectors(id: string, bookmarked: boolean):void {
    this.directorsService.toggleBookmarkMovie(id, bookmarked).then(r => {
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  toggleWatchedDirectors(id: string, watched: boolean):void {
    this.directorsService.toggleMovieWatchedStatus(id, watched).then(r => {
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  confirmRemoveFromDirectors(id: string): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: () => this.removeMovieFromDirectors(id)
    }});
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
}

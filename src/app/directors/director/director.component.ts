import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DirectorsService } from "../services/directors.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/components/confirm-window/confirm-window.component';
import { AuthErrorMessage } from 'src/app/app.component';
import { IMovie } from 'src/interface';

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
    private serverMessage: MatSnackBar,
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
      this.showMessage('Updated successfully!');
    }).catch(error => {
      this.confirmWindow .close();
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
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
      this.showMessage('Updated successfully!');
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
    })
  }

  toggleWatchedDirectors(id: string, watched: boolean):void {
    this.directorsService.toggleMovieWatchedStatus(id, watched).then(r => {
      this.showMessage('Updated successfully!');
    }).catch(error => {
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
}

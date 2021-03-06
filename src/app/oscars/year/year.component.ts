import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/components/confirm-window/confirm-window.component';
import { OscarsService } from '../services/oscars.service';
import { AuthErrorMessage } from 'src/app/app.component';
import { IOscarMovie } from 'src/interface';
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() id: string;
  @Input() movies: IOscarMovie[];
  percentage: number = 0;
  bestPictureName: string = "";
  showYearsMovies: boolean = false;
  bestMovieSeen: boolean = false;
  confirmWindow: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog, 
    private oscarsService: OscarsService, 
    private alertService: AlertService
    ) { }

  confirmRemove(): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: (id: string) => this.removeYear(this.id)
    }});
  }

  removeYear(id: string):void {
    this.oscarsService.deleteYear(id).then(r => {
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

  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePercentage();
    this.calculateBestPicture();
  }

  calculatePercentage(): void {
    const watched = this.movies.filter((elem: IOscarMovie) => elem.watched);
    const percentageRaw = ((watched.length * 100) / this.movies.length) || 0;
    this.percentage = Number(Math.round(percentageRaw));
  }

  calculateBestPicture(): void {
    const best = this.movies.filter((elem: IOscarMovie) => elem.best);
    this.bestPictureName = best.length ? best[0].name : "Unknown";
    this.bestMovieSeen = best.length ? best[0].watched : false;
  }

  showMovies(): void {
    this.showYearsMovies = !this.showYearsMovies;
  }

  toggleWatchedOscars(id: string, watched: boolean): void {
    this.oscarsService.toggleWatchedOscars(id, watched).then(response => {
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  confirmRemoveFromOscars(id: string): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: () => this.removeMovieFromOscars(id)
    }});
  }

  removeMovieFromOscars(id: string): void {
    this.oscarsService.removeMovieFromOscars(id).then((data) => {
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

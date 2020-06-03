import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IOscarMovie } from '../oscars.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/components/confirm-window/confirm-window.component';
import { OscarsService } from '../services/oscars.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthErrorMessage } from 'src/app/app.component';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() id: string;
  @Input() movies: any;
  percentage: number = 0;
  bestPictureName: string = "";
  showYearsMovies: boolean = false;
  bestMovieSeen: boolean = false;
  confirmWindow: any;

  constructor(
    private dialog: MatDialog, 
    private oscarsService: OscarsService, 
    private serverMessage: MatSnackBar
    ) { }

  confirmRemove(): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: (id: string) => this.removeYear(this.id)
    }});
  }

  removeYear(id: string):void {
    this.oscarsService.deleteYear(id).then(r => {
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

  ngOnInit(): void {
  }

  showMessage(msg: string, time: number = 3000): void {
    this.serverMessage.open(msg, 'Dismiss', {
      duration: time,
      horizontalPosition: "right"
    });
  }
}

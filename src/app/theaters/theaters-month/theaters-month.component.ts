import { Component, OnInit, Input } from '@angular/core';
import { ITheaterMovie, MonthsNames } from 'src/interface';
import { DirectorsService } from 'src/app/directors/services/directors.service';
import { AlertService } from 'src/alert.service';
import { AuthErrorMessage } from 'src/app/app.component';

@Component({
  selector: 'app-theaters-month',
  templateUrl: './theaters-month.component.html',
  styleUrls: ['./theaters-month.component.css']
})
export class TheatersMonthComponent implements OnInit {

  @Input() name: string = "";
  @Input() movies: ITheaterMovie[] = [];

  names = MonthsNames;

  constructor(private directorsService: DirectorsService, private alertService: AlertService) { }

  toggleWatchedTheaters(id: string, watched: boolean): void {
    this.directorsService.toggleWatchedTheaters(id, watched).then(response => {
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  toggleFavoritesTheaters(id: string, bookmarked: boolean): void {
    this.directorsService.toggleFavoritesTheaters(id, bookmarked).then(response => {
      this.alertService.showAlert('Updated successfully!');
    }).catch(error => {
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

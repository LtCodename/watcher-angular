import { Component, OnInit, Input } from '@angular/core';
import { ITheaterMovie, MonthsNames } from 'src/interface';
import { DirectorsService } from 'src/app/directors/services/directors.service';
import { AlertService } from 'src/alert.service';
import { AuthErrorMessage } from 'src/app/app.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/components/confirm-window/confirm-window.component';
import { TheatersDataWindowComponent } from 'src/app/components/theaters-data-window/theaters-data-window.component';

@Component({
  selector: 'app-theaters-month',
  templateUrl: './theaters-month.component.html',
  styleUrls: ['./theaters-month.component.css']
})
export class TheatersMonthComponent implements OnInit {

  @Input() name: string = "";
  @Input() movies: ITheaterMovie[] = [];

  names = MonthsNames;
  confirmWindow: MatDialogRef<any>;
  theatersChangeDialog: MatDialogRef<any>;


  constructor(
    private directorsService: DirectorsService, 
    private alertService: AlertService, 
    private dialog: MatDialog
    ) { }

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

  confirmRemoveFromTheaters(id: string): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: () => this.removeMovieFromTheatres(id)
    }});
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

  showEditTheatersWindow(oldYear: number, oldName: string, oldMonth: number, id: string): void {
    this.theatersChangeDialog = this.dialog.open(TheatersDataWindowComponent, {data: {
      changeTheatersDataCallback: (year: number, name: string, month: number, id: string) => this.changeTheatersDataCallback(year, name, month, id),
      oldYear: oldYear,
      oldName: oldName,
      oldMonth: oldMonth,
      id
    }});
  }

  changeTheatersDataCallback(newYear: number, newName: string, newMonth: number, id: string): void {
    this.directorsService.updateDataInTheaters(id, newYear, newName, newMonth).then(response => {
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

  ngOnInit(): void {
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilmingService } from "../services/filming.service";
import { Subject } from "rxjs";
import { map, mergeMap, takeUntil } from "rxjs/operators";
import { DirectorsService } from 'src/app/directors/services/directors.service';
import { IDirector, IFilmingMovie } from 'src/interface';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/components/confirm-window/confirm-window.component';
import { AuthErrorMessage } from 'src/app/app.component';
import { AlertService } from 'src/alert.service';
import { ChangeYearWindowComponent } from 'src/app/components/change-year-window/change-year-window.component';

@Component({
  selector: 'app-filming-page',
  templateUrl: './filming-page.component.html',
  styleUrls: ['./filming-page.component.css']
})
export class FilmingPageComponent implements OnInit, OnDestroy {
  private notifier = new Subject();
  filming: IFilmingMovie[] = [];
  showSpinner = true;
  confirmWindow: MatDialogRef<any>;
  yearChangeDialog: MatDialogRef<any>;

  constructor(
    private filmingService: FilmingService, 
    private directorsService: DirectorsService,
    private alertService: AlertService,
    public dialog: MatDialog, ) {
    this.filmingService.filming$
      .pipe(
          takeUntil(this.notifier),
          mergeMap((filmingData) => this.directorsService.directors$.pipe(map((directorData: IDirector[]) => [filmingData, directorData])))
      )
      .subscribe(([filmingData, directorData]) => {
        filmingData.forEach((filmingMovie: IFilmingMovie) => {
          filmingMovie.directorData = directorData.find(director => director.id === filmingMovie.director);
        });
        this.filming = filmingData;
        this.showSpinner = false;
      }, () => {
        this.showSpinner = false;
        // Add some error processing here
    });
  }

  confirmMovieRelease(name: string, year: number, director: string, id: string): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: () => this.markAsReleased(name, year, director, id)
    }});
  }

  markAsReleased(name: string, year: number, director: string, id: string): void {
    this.directorsService.releaseMovie(name, year, director, id).subscribe((data) => {
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

  confirmRemoveFromFilming(id: string): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: () => this.removeMovieFromFilming(id)
    }});
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

  showEditYearWindow(name: string, year: number, id: string): void {
    this.yearChangeDialog = this.dialog.open(ChangeYearWindowComponent, {data: {
      changeDataCallback: (newYear: number, newName: string, id: string) => this.changeDataCallback(newYear, newName, id),
      oldYear: year,
      oldName: name,
      id
    }});
  }

  changeDataCallback(newYear: number, newName: string, id: string): void {
    console.log(newName, newYear)
    this.directorsService.updateYearInFilming(id, newYear, newName).then(response => {
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

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}

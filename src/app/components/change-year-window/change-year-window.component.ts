import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

interface IChangeYearWindowInterface {
  changeYearCallback(year: number): void;
  oldYear: number;
}

@Component({
  selector: 'app-change-year-window',
  templateUrl: './change-year-window.component.html',
  styleUrls: ['./change-year-window.component.css']
})
export class ChangeYearWindowComponent implements OnInit {

  releaseYear: any = this.data.oldYear;

  constructor(private message: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: IChangeYearWindowInterface) { }

  sumbitNewReleaseYear(): void {
    let year: number = parseInt(this.releaseYear);
    if (isNaN(year)) {
      this.showMessage('Please enter a number!');
      return;
    }

    if (this.releaseYear.length > 4) {
      this.showMessage('Please enter a valid year!');
      return;
    }

    this.data.changeYearCallback(year);
  }

  showMessage(mssg: string): void {
    this.message.open(mssg, 'Dismiss', {
      duration: 3000,
      horizontalPosition: "right"
    });
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AddPanelService } from '../add-panel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthErrorMessage } from 'src/app/app.component';

@Component({
  selector: 'app-add-oscars',
  templateUrl: './add-oscars.component.html',
  styleUrls: ['./add-oscars.component.css']
})
export class AddOscarsComponent implements OnInit {

  year: string = "";
  movieName: string = "";
  searchResults: any = [];

  constructor(private addService: AddPanelService, private serverMessage: MatSnackBar) { }

  ngOnInit(): void {
  }

  addNewYear(): void {
    if (!this.year.length) {
      this.showMessage("Enter proper year!");
      return;
    }

    this.addService.addNewYear(this.year).then(() => {
      this.year = "";
      this.showMessage("New year added!");
    }).catch((error) => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
    })
  }

  search(): void {
    this.addService.searchApi(this.movieName).subscribe((res: any) => {
      if (res['Response'] === 'False') {
        this.showMessage("No result for this search!");
      }
      
      if(res['Response']) {
        this.searchResults = res['Search'];
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

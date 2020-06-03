import { Component, OnInit } from '@angular/core';
import { AddPanelService } from '../add-panel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthErrorMessage } from 'src/app/app.component';

@Component({
  selector: 'app-add-directors',
  templateUrl: './add-directors.component.html',
  styleUrls: ['./add-directors.component.css']
})
export class AddDirectorsComponent implements OnInit {

  directorName: string = "";
  movieName: string = "";
  searchResults: any = [];

  constructor(private addService: AddPanelService, private serverMessage: MatSnackBar) { }

  addNewDirector(): void {
    if (!this.directorName.length) {
      this.showMessage("Enter director's name!");
      return;
    }

    this.addService.addNewDirector(this.directorName).then(() => {
      this.directorName = "";
      this.showMessage("New director added!");
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

  ngOnInit(): void {
  }
}

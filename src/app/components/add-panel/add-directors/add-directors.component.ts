import { Component, OnInit } from '@angular/core';
import { AddPanelService } from '../add-panel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      this.showServerMessage(false, "Enter director's name!");
      return;
    }

    this.addService.addNewDirector(this.directorName).then(() => {
      this.directorName = "";
      this.showServerMessage(false, "New director added!");
    }).catch(() => {
      this.showServerMessage(true);
    })
  }

  showServerMessage(error: boolean = false, message: string =  "Updated successfully!"): void {
    if (error) message = "Error!";

    this.serverMessage.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: "right"
    });
  }

  search(): void {
    this.addService.searchApi(this.movieName).subscribe((res: any) => {
      if (res['Response'] === 'False') {
        this.showServerMessage(false, "No result for this search!");
      }

      if(res['Response']) {
        this.searchResults = res['Search'];
      }
    })
  }

  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { AddPanelService } from '../add-panel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      this.showServerMessage(false, "Enter proper year!");
      return;
    }

    this.addService.addNewYear(this.year).then(() => {
      this.year = "";
      this.showServerMessage(false, "New year added!");
    }).catch(() => {
      this.showServerMessage(true);
    })
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

  showServerMessage(error: boolean = false, message: string =  "Updated successfully!"): void {
    if (error) message = "Error!";

    this.serverMessage.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: "right"
    });
  }

}

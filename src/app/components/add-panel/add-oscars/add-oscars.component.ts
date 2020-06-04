import { Component, OnInit } from '@angular/core';
import { AddPanelService } from '../add-panel.service';
import { AuthErrorMessage } from 'src/app/app.component';
import { ISearchResuls } from 'src/interface';
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-add-oscars',
  templateUrl: './add-oscars.component.html',
  styleUrls: ['./add-oscars.component.css']
})
export class AddOscarsComponent implements OnInit {

  year: string = "";
  movieName: string = "";
  searchResults: ISearchResuls[] = [];

  constructor(private addService: AddPanelService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  addNewYear(): void {
    if (!this.year.length) {
      this.alertService.showAlert("Enter proper year!");
      return;
    }

    this.addService.addNewYear(this.year).then(() => {
      this.year = "";
      this.alertService.showAlert("New year added!");
    }).catch((error) => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  search(): void {
    this.addService.searchApi(this.movieName).subscribe((res: ISearchResuls) => {
      if (res['Response'] === 'False') {
        this.alertService.showAlert("No result for this search!");
      }
      
      if(res['Response']) {
        this.searchResults = res['Search'];
      }
    })
  }
}

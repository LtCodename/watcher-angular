import { Component, OnInit } from '@angular/core';
import { AddPanelService } from '../add-panel.service';
import { AuthErrorMessage } from 'src/app/app.component';
import { ISearchResuls } from 'src/interface';
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-add-directors',
  templateUrl: './add-directors.component.html',
  styleUrls: ['./add-directors.component.css']
})
export class AddDirectorsComponent implements OnInit {

  directorName: string = "";
  movieName: string = "";
  searchResults: ISearchResuls[] = [];

  constructor(private addService: AddPanelService, private alertService: AlertService) { }

  addNewDirector(): void {
    if (!this.directorName.length) {
      this.alertService.showAlert("Enter director's name!");
      return;
    }

    this.addService.addNewDirector(this.directorName).then(() => {
      this.directorName = "";
      this.alertService.showAlert("New director added!");
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

  ngOnInit(): void {
  }
}

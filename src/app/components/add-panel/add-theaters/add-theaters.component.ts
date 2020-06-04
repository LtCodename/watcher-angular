import { Component, OnInit } from '@angular/core';
import { AddPanelService } from '../add-panel.service';
import { ISearchResuls } from 'src/interface';
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-add-theaters',
  templateUrl: './add-theaters.component.html',
  styleUrls: ['./add-theaters.component.css']
})
export class AddTheatersComponent implements OnInit {

  movieSearchName:string = "";
  searchResults: ISearchResuls[] = [];

  constructor(private addService: AddPanelService, private alertService: AlertService) { }

  search(): void {
    this.addService.searchApi(this.movieSearchName).subscribe((res: ISearchResuls) => {
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

import { Component, OnInit } from '@angular/core';
import { AddPanelService } from '../add-panel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISearchResuls } from 'src/interface';

@Component({
  selector: 'app-add-theaters',
  templateUrl: './add-theaters.component.html',
  styleUrls: ['./add-theaters.component.css']
})
export class AddTheatersComponent implements OnInit {

  movieSearchName:string = "";
  searchResults: ISearchResuls[] = [];

  constructor(private addService: AddPanelService, private serverMessage: MatSnackBar) { }

  search(): void {
    this.addService.searchApi(this.movieSearchName).subscribe((res: ISearchResuls) => {
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

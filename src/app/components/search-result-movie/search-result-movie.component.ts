import { Component, OnInit, Input } from '@angular/core';
import { DirectorsService } from 'src/app/directors/services/directors.service';

@Component({
  selector: 'app-search-result-movie',
  templateUrl: './search-result-movie.component.html',
  styleUrls: ['./search-result-movie.component.css']
})
export class SearchResultMovieComponent implements OnInit {

  @Input() name: string = "";
  @Input() year: string = "";

  directorName: string = "";

  constructor(private directorsService: DirectorsService) { }

  getMovieData(): void {
    let yearNumber: number = parseInt(this.year);
    this.directorsService.getMovieDataFromIMDBApi(this.name, yearNumber).subscribe((data: any) => {
      //console.log(data);
      this.directorName = data['Director'];
    })
  }

  ngOnInit(): void {
  }

}

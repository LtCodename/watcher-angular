import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit, OnChanges {
  showMovies: boolean = false;

  @Input() name: string;
  @Input() id: string;
  @Input() movies: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.movies) {
      this.movies = this.movies.sort((a: any, b: any) => {
        return a.year - b.year;
      })
    }
  }

  onDirector(): void {
    this.showMovies = !this.showMovies;
  }
}

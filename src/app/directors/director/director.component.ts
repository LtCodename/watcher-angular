import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit, OnChanges {
  showMovies: boolean = false;
  percentage: number = 0;

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

    this.calculatePercentage();
  }

  onDirector(): void {
    this.showMovies = !this.showMovies;
  }

  calculatePercentage(): void {
    const watched = this.movies.filter((elem:any) => elem.watched);
    const percentageRaw = ((watched.length * 100) / this.movies.length) || 0;
    this.percentage = Number(Math.round(percentageRaw));
  }
}

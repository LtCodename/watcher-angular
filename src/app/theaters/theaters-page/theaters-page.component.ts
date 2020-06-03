import { Component, OnInit } from '@angular/core';
import { TheatersService } from '../services/theaters.service';
import { takeUntil, mergeMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-theaters-page',
  templateUrl: './theaters-page.component.html',
  styleUrls: ['./theaters-page.component.css']
})
export class TheatersPageComponent implements OnInit {

  private notifier = new Subject();
  years: any = [];
  showSpinner = true;
  
  constructor(private theaterService: TheatersService) { 
    // this.theaterService.years$
    //   .pipe(
    //       takeUntil(this.notifier),
    //       mergeMap((yearsData) => this.theaterService.movies$.pipe(map((moviesData: any) => [yearsData, moviesData])))
    //   )
    //   .subscribe(([yearsData, moviesData]) => {
    //     yearsData.forEach((year: any) => {
    //       year.movies = moviesData.find(movie => movie.year === year.year);
    //     });
    //     this.years = yearsData;
    //     console.log(this.years);
    //     this.showSpinner = false;
    //   }, () => {
    //     this.showSpinner = false;
    //     // Add some error processing here
    // });
  }

  ngOnInit(): void {
  }

}

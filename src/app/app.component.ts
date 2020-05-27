import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  opened: boolean = false;
  currentRoute: string;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentPage: string;
        switch(this.router.url) {
          case "/":
            this.currentRoute = '> Home';
          break;
          case "/directors":
            this.currentRoute = '> Directors';
          break;
          case "/filming":
            this.currentRoute = '> Filming';
          break;
          case "/oscars":
            this.currentRoute = '> Oscars';
          break;
          case "/theaters":
            this.currentRoute = '> Theaters';
          break;
            default:
              this.currentRoute = '> Home';
        }
      }
    });
  }

  ngOnInit() {
  }

}

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
        switch(this.router.url) {
          case "/directors":
            this.currentRoute = 'Directors';
          break;
          case "/filming":
            this.currentRoute = 'Filming';
          break;
          case "/oscars":
            this.currentRoute = 'Oscars';
          break;
          case "/theaters":
            this.currentRoute = 'Theaters';
          break;
          case "/admin":
            this.currentRoute = 'Admin Page';
          break;
            default:
              this.currentRoute = 'Home';
        }
      }
    });
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  opened: boolean = false;
  currentRoute: string = 'Directors';

  constructor(private router: Router) {

  }

  ngOnInit() {
    console.log(window.location.pathname);
    console.log(this.router.url);
  }

}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private adminService: AdminService) { }

  login(): void {
    this.adminService.loginUser(this.email, this.password).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  }

  logout(): void {
    this.adminService.logoutUser().then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
  }

}

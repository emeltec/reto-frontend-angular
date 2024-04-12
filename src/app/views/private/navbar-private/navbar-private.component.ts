import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserSession } from 'src/app/interfaces/user-session';

@Component({
  selector: 'app-navbar-private',
  templateUrl: './navbar-private.component.html',
  styleUrls: ['./navbar-private.component.scss']
})
export class NavbarPrivateComponent implements OnInit {

  public userData: IUserSession = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const userdata = JSON.parse(localStorage.getItem('userdata') || '{}');
    this.userData = userdata;
  }

  logout(){
    this.router.navigate(['/']);
    localStorage.clear();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  loginFlag:boolean=true;
  user=JSON.parse(localStorage.getItem('user') || "{}");

  constructor() { }

  ngOnInit() {
  }

  logOut():any{
    localStorage.removeItem('token');
    window.location.reload();
    this.loginFlag=false;
  }

}

import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  username = localStorage.getItem("currentuser");
  path:any = require("./user_icon.png");
  email = localStorage.getItem('email');

  constructor() { }

  ngOnInit(): void {
    console.log("username", this.username);
  }

}

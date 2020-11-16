import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  username = localStorage.getItem("currentuser");
  email = localStorage.getItem('email');
  is_admin = JSON.parse(localStorage.getItem('admin'));

  constructor() { }

  ngOnInit(): void {
    console.log("username", this.username);
    console.log("admin123", this.is_admin);
  }

}

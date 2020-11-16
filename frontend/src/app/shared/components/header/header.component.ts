import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private _us:UserService, private _router:Router) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  logout() {
	  this._us.logout();
	  this._router.navigate(["/login"]);
	}
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('alert', { static: true }) alert: ElementRef;

  constructor(private _us:UserService, private _router: Router) { }

  public logo = require("src/app/auth/logo.jpg");

  public user:any = {  username: "", email: "", password: "" };

  ngOnInit(): void {
    this.alert.nativeElement.classList.remove('show');
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  error = "";

  hide = true;

  login(form) {
    this._us.login(form.value).subscribe(
      res => {
        let length = Object.keys(res).length;
  			if(length === 4) {
         localStorage.setItem("currentuser", res.username);
         localStorage.setItem("email", this.user.email);
         localStorage.setItem("user_id", res.userId);
  			 this._router.navigate(["/"]);
  			}
  			else {
  			 this._router.navigate(["/login"]);
  			}
  		},
  		err => {
        this.error = err.error.err;
        this.alert.nativeElement.classList.add('show');
      }
    )
  }

}

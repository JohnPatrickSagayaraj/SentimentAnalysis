import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _us:UserService, private _router: Router) { }

  public logo = require("src/app/auth/logo.png");

  public user:any = { username: "", email: "", password: "", confirm_password: "" };

  ngOnInit(): void {
  }

  hide = true;
  err = null;

  signup(form) {
    this._us.signup(form.value).subscribe(
      res => {
        this._router.navigate(["/login"]);
      },
      err => {
        this.err = "There was problem with credential.";
      }
    )
  }

}

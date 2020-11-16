import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

declare var require: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('alert', { static: true }) alert: ElementRef;

  constructor(private _us:UserService, private _router: Router) { }

  public logo = require("src/app/auth/logo.jpg");

  public user:any = { username: "", email: "", password: "", confirm_password: "", is_admin: false };

  ngOnInit(): void {
    this.alert.nativeElement.classList.remove('show');
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  hide = true;

  signup(form) {
    console.log("form", form.value);
    this._us.signup(form.value).subscribe(
      res => {
        this._router.navigate(["/login"]);
      },
      err => {
        this.alert.nativeElement.classList.add('show');
      }
    )
  }

}

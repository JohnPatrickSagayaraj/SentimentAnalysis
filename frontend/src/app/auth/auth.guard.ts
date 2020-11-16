import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate() {
  	let cache = localStorage.getItem("currentuser")
  	if(cache == null) {
  		this._router.navigate(["/login"]);
  	}
  	else {
  	  return true;
  	}
  }

}

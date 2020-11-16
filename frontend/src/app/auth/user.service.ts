import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  public dburl = "http://localhost:8080";

  public user:any = { username: "", email: "", password: "" };

  public login(user:User):Observable<User> {
    return this._http.post<User>(this.dburl + "/api/user/login", user);
  }

  public signup(user:User):Observable<User> {
    return this._http.post<User>(this.dburl + "/api/user/signup", user);
  }

  public logout() {
  	localStorage.clear();
  }
}

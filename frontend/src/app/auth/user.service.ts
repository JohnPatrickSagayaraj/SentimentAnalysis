import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  public dburl = "";

  public user:any = { username: "", email: "", password: "", is_admin: false };

  public isadmin:boolean = true;

  public login(user:User):Observable<User> {
    return this._http.post<User>(this.dburl + "/api/user/login", user);
  }

  public signup(user:User):Observable<User> {
    return this._http.post<User>(this.dburl + "/api/user/signup", user);
  }

  public logout() {
  	localStorage.clear();
  }

  public get_user(id:string, pagesize:number, page:number):Observable<User> {
    const query = `?pagesize=${pagesize}&page=${page}`;
    return this._http.get<User>(this.dburl + "/api/user/" + id + query);
  }

  public add_course(id:string, course:any):Observable<User> {
    return this._http.patch<User>(this.dburl + "/api/user/" + id, course);
  }

  public add_comment(id:string, courseid:string, comment:string):Observable<User> {
    return this._http.patch<User>(this.dburl + "/api/user/" + id + "/comment", { courseid: courseid, comment: comment })
  }
}

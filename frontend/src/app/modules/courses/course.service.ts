import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Course } from './course';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public dburl = ""

  constructor(private _http: HttpClient) { }

  public upload_course(course):Observable<Course> {
    console.log("course", course);
    return this._http.post<Course>(this.dburl + "/api/course/upload", course);
  }

  public get_all_courses(id:string, pagesize:number, page:number):Observable<Course[]> {
    const query = `?pagesize=${pagesize}&page=${page}&id=${id}`;
    return this._http.get<Course[]>(this.dburl + "/api/course/videos" + query);
  }

  public get_course(id:string):Observable<Course> {
    return this._http.get<Course>(this.dburl + "/api/course/video/" + id);
  }

  public add_user(id:string, user:any):Observable<Course> {
    return this._http.patch<Course>(this.dburl + "/api/course/" + id, user);
  }

  public add_comment(id:string, userid:string, comment:string):Observable<Course> {
    return this._http.patch<Course>(this.dburl + "/api/course/" + id + "/comment", { userid: userid, comment: comment })
  }

  public get_report():Observable<any> {
    return this._http.get<any>(this.dburl + '/api/course/report')
  }
}

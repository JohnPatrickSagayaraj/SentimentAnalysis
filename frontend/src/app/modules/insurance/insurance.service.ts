import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Insurance } from './insurance';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  public dburl = "http://localhost:8080";

  constructor(private _http: HttpClient) { }

  public calculate_insurance(insurance):Observable<any> {
    return this._http.post<any>(this.dburl + "/api/insurance/calculate", insurance);
  }

  public get_all_insurances(id:string, pagesize:number, page:number):Observable<any[]> {
    const query = `?pagesize=${pagesize}&page=${page}&id=${id}`;
    return this._http.get<any[]>(this.dburl + "/api/insurance" + query);
  }

  public get_insurance(id:string):Observable<any> {
    return this._http.get<any>(this.dburl + "/api/insurance/" + id);
  }

  public add_user(id:string, user:any):Observable<any> {
    return this._http.patch<any>(this.dburl + "/api/insurance/" + id, user);
  }

  public edit_insurance(insurance):Observable<any> {
    return this._http.patch<any>(this.dburl + "/api/insurance/"+ insurance._id, insurance);
  }

  public delete_insurance(id):Observable<any> {
    return this._http.delete<any>(this.dburl + "/api/insurance/" + id);
  }
}

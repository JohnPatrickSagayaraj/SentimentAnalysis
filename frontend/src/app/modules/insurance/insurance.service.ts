import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Insurance } from './insurance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  public dburl = "";

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

  public edit_insurance(insurance):Observable<any> {
    const id = insurance._id;
    delete insurance._id;
    return this._http.put<any>(this.dburl + "/api/insurance/"+ id, insurance);
  }

  public delete_insurance(id):Observable<any> {
    return this._http.delete<any>(this.dburl + "/api/insurance/" + id);
  }
}

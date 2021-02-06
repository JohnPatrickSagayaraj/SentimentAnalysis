import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Sentiment } from './sentiment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  public dburl = "";

  constructor(private _http: HttpClient) { }

  public create_sentiment(sentiment):Observable<any> {
    return this._http.post<any>(this.dburl + "/api/sentiment", sentiment);
  }

  public get_all_sentiments(id:string, pagesize:number, page:number):Observable<any[]> {
    const query = `?pagesize=${pagesize}&page=${page}&id=${id}`;
    return this._http.get<any[]>(this.dburl + "/api/sentiment" + query);
  }

  public get_sentiment(id:string):Observable<any> {
    return this._http.get<any>(this.dburl + "/api/sentiment/" + id);
  }

  public delete_sentiment(id):Observable<any> {
    return this._http.delete<any>(this.dburl + "/api/sentiment/" + id);
  }

  public create_review(review):Observable<any> {
    return this._http.post<any>(this.dburl + "/api/sentiment/review", review);
  }

  public get_all_reviews(id:string, pagesize:number, page:number):Observable<any[]> {
    const query = `?pagesize=${pagesize}&page=${page}&id=${id}`;
    return this._http.get<any[]>(this.dburl + "/api/sentiment/reviews" + query);
  }

  public delete_review(id):Observable<any> {
    return this._http.delete<any>(this.dburl + "/api/sentiment/review/" + id);
  }

  public get_all_products():Observable<any[]> {
    return this._http.get<any[]>(this.dburl + "/api/products");
  }

  public get_product(id:string):Observable<any> {
    return this._http.get<any>(this.dburl + "/api/products/" + id);
  }
}

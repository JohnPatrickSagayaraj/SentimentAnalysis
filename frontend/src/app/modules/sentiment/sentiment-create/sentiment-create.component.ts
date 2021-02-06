import { Component, OnInit } from '@angular/core';
import { Sentiment } from '../sentiment';
import { SentimentService } from '../sentiment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sentiment-create',
  templateUrl: './sentiment-create.component.html',
  styleUrls: ['./sentiment-create.component.css']
})
export class SentimentCreateComponent implements OnInit {

  products: any[] = [];

  ngOnInit(): void {
    this._is.get_all_products().subscribe(
      res => {
        this.products = res;
      },
      err => {
        console.log('err', err);
      } 
    )
  }

  constructor(private _is: SentimentService, private _router: Router) { }

  isloading: boolean = false;

  sentiment: any = {
    name: "",
    start_date: "",
    end_date: "",
    product_id: "",
    product_name: "",
    user: localStorage.getItem('user_id')
  };

  submit() {
    this.isloading = true;
    this.sentiment.product_name = this.products.filter((product) => product._id === this.sentiment.product_id)[0].product_name;
    this._is.create_sentiment(this.sentiment).subscribe(
      res => {
        this.isloading = false;
        this._router.navigate(["/sentiment/show/" + res._id]);
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SentimentService } from '../sentiment/sentiment.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private ss: SentimentService, private router: Router) { }

  products: any[] = [];

  ngOnInit(): void {
    this.ss.get_all_products().subscribe(
      res => {
        this.products = res;
      },
      err => {
        console.log('err', err);
      } 
    )
  }

  addReview(id) {
    this.router.navigate(["/product/" + id + "/review/new"]);
  }

}

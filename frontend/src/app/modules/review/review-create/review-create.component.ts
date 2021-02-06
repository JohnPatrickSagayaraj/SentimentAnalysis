import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SentimentService } from '../../sentiment/sentiment.service';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss']
})
export class ReviewCreateComponent implements OnInit {

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this._is.get_product(params.id).subscribe(
            res => {
              this.reviewPayload.product_id = res._id;
              this.reviewPayload.product_name = res.product_name;
            }
          )
        }
      }
    )
  }

  constructor(private _is: SentimentService, private _router: Router, private route: ActivatedRoute) { }

  isloading: boolean = false;

  reviewPayload: any = {
    review: "",
    user: localStorage.getItem('user_id'),
    product_id: '',
    product_name: ''
  };

  submit() {
    this.isloading = true;
    this._is.create_review(this.reviewPayload).subscribe(
      res => {
        this.isloading = false;
        this._router.navigate(["/reviews"]);
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SentimentService } from '../../sentiment/sentiment.service';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss']
})
export class ReviewCreateComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private _is: SentimentService, private _router: Router) { }

  isloading: boolean = false;

  reviewPayload: any = {
    review: "",
    user: localStorage.getItem('user_id')
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

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

  ngOnInit(): void {
  }

  constructor(private _is: SentimentService, private _router: Router) { }

  isloading: boolean = false;

  sentiment: any = {
    name: "",
    start_date: "",
    end_date: "",
    user: localStorage.getItem('user_id')
  };

  submit() {
    this.isloading = true;
    this._is.create_sentiment(this.sentiment).subscribe(
      res => {
        this.isloading = false;
        this._router.navigate(["/sentiment/show/" + res._id]);
      }
    )
  }
}

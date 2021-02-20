import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SentimentService } from '../sentiment.service';

@Component({
  selector: 'app-sentiment-show',
  templateUrl: './sentiment-show.component.html',
  styleUrls: ['./sentiment-show.component.css']
})
export class SentimentShowComponent implements OnInit {

  constructor(private _router: Router, private _is: SentimentService, private route: ActivatedRoute) {
  }

  result: any = {};
  graph: any = [];
  graphbar: any = [];
  graphbarhorizontal: any = [];

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this._is.get_sentiment(params.id).subscribe(
          res => {
            this.result = res;
            const x = ['Positive', 'Neutral', 'Negative'];
            const y = [res.reviews.filter(val => val > 0).length, res.reviews.filter(val => val === 0).length, res.reviews.filter(val => val < 0).length];
            this.graph = {
              data: [{
                type: "pie",
                values: y,
                labels: x,
                textinfo: "label+percent",
                textposition: "outside",
                automargin: true,
                marker:{
                  colors: ['rgba(8, 255, 0, 1)', 'rgba(0, 19, 255, 1)', 'rgba(255, 13, 0, 1)']
                }
              }],
              layout: {
                title: res.name + "(pie chart)",
                width: 970,
                height: 350,
                autosize: false
              }
            }
            this.graphbar = {
              data: [{
                type: "bar",
                y: y,
                x: x,
                marker:{
                  color: ['rgba(8, 255, 0, 1)', 'rgba(0, 19, 255, 1)', 'rgba(255, 13, 0, 1)']
                }
              }],
              layout: {
                title: res.name + '(bar chart)',
                width: 970,
                height: 350,
                autosize: false
              }
            }
            this.graphbarhorizontal = {
              data: [{
                type: "bar",
                y: x,
                x: y,
                orientation: 'h',
                marker:{
                  color: ['rgba(8, 255, 0, 1)', 'rgba(0, 19, 255, 1)', 'rgba(255, 13, 0, 1)']
                }
              }],
              layout: {
                title: res.name + '(horizontal bar chart)',
                width: 970,
                height: 350,
                autosize: false
              }
            }
          },
          err => {
            console.log(err);
          }
        )
      }
    )
  }
}

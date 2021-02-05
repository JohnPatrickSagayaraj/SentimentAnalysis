import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { SentimentService } from '../sentiment/sentiment.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(private _router: Router, private _is: SentimentService, private _us: UserService) { }

  displayedColumns: string[] = ['_id', 'review'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalpage = 1000;
  page = 1;
  pagesize = 9;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this._is.get_all_reviews(localStorage.getItem("user_id"), this.pagesize, this.page).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<any>(res);
      }
    )
  }

  pagechange(pageevent: any) {
    this._is.get_all_reviews(localStorage.getItem("user_id"), this.pagesize, pageevent.pageIndex + 1).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<any>(res);
      }
    )
  }
}

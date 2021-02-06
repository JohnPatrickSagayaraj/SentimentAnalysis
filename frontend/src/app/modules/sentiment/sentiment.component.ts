import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { SentimentService } from './sentiment.service';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  constructor(private _router: Router, private _is: SentimentService, private _us: UserService) { }

  displayedColumns: string[] = ['_id', 'name', 'start_date', 'end_date', 'product_name', 'show', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalpage = 1000;
  page = 1;
  pagesize = 9;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this._is.get_all_sentiments(localStorage.getItem("user_id"), this.pagesize, this.page).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<any>(res);
      }
    )
  }

  pagechange(pageevent: any) {
    this._is.get_all_sentiments(localStorage.getItem("user_id"), this.pagesize, pageevent.pageIndex + 1).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<any>(res);
      }
    )
  }

  showRecord(id) {
    this._router.navigate(["/sentiment/show/" + id]);
  }

  deleteRecord(id: number) {
    this._is.delete_sentiment(id).subscribe(
      res => {
        this.dataSource.paginator = this.paginator;
        this._is.get_all_sentiments(localStorage.getItem("user_id"), this.pagesize, this.page).subscribe(
          res => {
            this.dataSource = new MatTableDataSource<any>(res);
          }
        )
      },
      err => { console.log(err) }
    )
  }
}

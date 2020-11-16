import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { InsuranceService } from './insurance.service';
import { SafePipe } from './safe.pipe';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  constructor(private _router: Router, private _is: InsuranceService, private _us: UserService) { }

  displayedColumns: string[] = ['_id', 'name', 'age', 'gender', 'hypertension', 'pressure', 'sugar', 'overweight', 'smooking', 'alcohol', 'exercise', 'drugs', 'edit', 'show', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalpage = 1000;
  page = 1;
  pagesize = 9;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this._is.get_all_insurances(localStorage.getItem("user_id"), this.pagesize, this.page).subscribe(
      res => {
        console.log("res", res);
        this.dataSource = new MatTableDataSource<any>(res);
      }
    )
  }

  pagechange(pageevent: any) {
    console.log("pageevent", pageevent);
    this._is.get_all_insurances(localStorage.getItem("user_id"), this.pagesize, pageevent.pageIndex + 1).subscribe(
      res => {
        console.log("res", res);
        this.dataSource = new MatTableDataSource<any>(res);
      }
    )
  }

  // show(id:string) {

  //   this._is.get_course(id).subscribe(
  //     res => {
  //       this._is.add_user(id, { _id: localStorage.getItem("user_id")}).subscribe(
  //         res => {}
  //       )
  //       // this._us.add_course(localStorage.getItem("user_id"), res).subscribe(
  //       //   res => { this._router.navigate(["/course/show/", id]) },
  //       //   err => {}
  //       // )
  //     }
  //   )
  // }
}

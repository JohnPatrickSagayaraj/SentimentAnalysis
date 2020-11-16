import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { Router } from '@angular/router';
import { InsuranceService } from './insurance.service';
import { UserService } from '../../auth/user.service';
import { InsuranceShowComponent } from './insurance-show/insurance-show.component';
import { CalculateComponent } from './calculate/calculate.component';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  constructor(private _router: Router, private _is: InsuranceService, private _us: UserService, private dialog: MatDialog) { }

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

  editRecord(id) {
    this._router.navigate(["/insurance/" + id + "/edit"]);
  }

  calculate(id: number) {
    this.dialog.open(InsuranceShowComponent, {
      height: '400px',
      width: '600px',
      data: {
        id: id
      }
    });
  }

  showRecord(id) {
    this._router.navigate(["/insurance/show/" + id]);
    this.calculate(id);
  }

  deleteRecord(id: number) {
    this._is.delete_insurance(id).subscribe(
      res => {
        this.dataSource.paginator = this.paginator;
        this._is.get_all_insurances(localStorage.getItem("user_id"), this.pagesize, this.page).subscribe(
          res => {
            console.log("res", res);
            this.dataSource = new MatTableDataSource<any>(res);
          }
        )
      },
      err => { console.log(err) }
    )
  }
}

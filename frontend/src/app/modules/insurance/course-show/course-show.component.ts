import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InsuranceService } from '../insurance.service';
import { SafePipe } from '../safe.pipe';
import { MatDialog, MatDialogRef } from  '@angular/material';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.css']
})
export class CourseShowComponent implements OnInit {

  public id:string = "";
  public course:any = { name: "", description: "", uri: "" };

  constructor(private _route: ActivatedRoute, private _cs: InsuranceService, private _router:Router, private  dialog:  MatDialog) {
    this.id = this._route.snapshot.params.id;
  }

  ngOnInit(): void {
    // this._cs.get_course(this.id).subscribe(
    //   res => {
    //     this.course = res;
    //   }
    // )
  }

}

import { AfterContentInit, OnInit, Component, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { CourseService } from './course.service';
import { SafePipe } from './safe.pipe';
import { PageEvent } from '@angular/material';
import { MatGridList } from '@angular/material';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  @ViewChild('grid',{static:true}) grid: MatGridList;
  cols:number = 6;

  constructor(private _router: Router, private _cs: CourseService, private _us: UserService, private observableMedia: MediaObserver) { }

  courses:any[] = [];

  totalpage = 20;
  page = 1;
  pagesize = 8;

  ngOnInit(): void {
    this._cs.get_all_courses(localStorage.getItem("user_id"), this.pagesize, this.page).subscribe(
      res => {
        console.log("res", res);
        this.courses = res;
      }
    )
  }

  pagechange(pageevent: PageEvent) {
    console.log("pageevent", pageevent);
    this._cs.get_all_courses(localStorage.getItem("user_id"), this.pagesize, pageevent.pageIndex + 1).subscribe(
      res => {
        console.log("res", res);
        this.courses = res;
      }
    )
  }

  gridByBreakpoint = {
    xl: 6,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  }

  show(id:string) {

    this._cs.get_course(id).subscribe(
      res => {
        this._cs.add_user(id, { _id: localStorage.getItem("user_id")}).subscribe(
          res => {}
        )
        this._us.add_course(localStorage.getItem("user_id"), res).subscribe(
          res => { this._router.navigate(["/course/show/", id]) },
          err => {}
        )
      }
    )
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      console.log("change", this.gridByBreakpoint[change[0].mqAlias]);
      this.cols = this.gridByBreakpoint[change[0].mqAlias];
    });
  }

}

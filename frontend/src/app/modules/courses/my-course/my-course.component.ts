import { AfterContentInit, OnInit, Component, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { SafePipe } from '../safe.pipe';
import { PageEvent } from '@angular/material';
import { MatGridList } from '@angular/material';
import { UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.scss']
})
export class MyCourseComponent implements OnInit {

  @ViewChild('grid',{static:true}) grid: MatGridList;
  cols:number = 6;

  constructor(private _router: Router, private _cs: CourseService, private _us: UserService, private observableMedia: MediaObserver) { }

  courses:any[] = [];

  totalpage = 20;
  page = 1;
  pagesize = 8;

  ngOnInit(): void {
    this._us.get_user(localStorage.getItem("user_id"), this.pagesize, this.page).subscribe(
      res => {
        console.log("res", res);
        this.courses = res[0].courses;
      }
    )
  }

  pagechange(pageevent: PageEvent) {
    this._us.get_user(localStorage.getItem("user_id"), this.pagesize, pageevent.pageIndex + 1).subscribe(
      res => {
        console.log("res", res);
        this.courses = res[0].courses;
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
    this._router.navigate(["/course/show/", id])
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      console.log("change", this.gridByBreakpoint[change[0].mqAlias]);
      this.cols = this.gridByBreakpoint[change[0].mqAlias];
    });
  }

}

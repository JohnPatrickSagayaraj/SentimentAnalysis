import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  constructor(private _cs:CourseService, private _router:Router) { }

  ngOnInit(): void {
  }

  isloading:boolean = false;

  file:File = null;

  course:any = { _id: "", name: "", description: "", uri: "", startdate: "", enddate: "" };

  onFilePicked(event) {
    this.file = <File>event.target.files[0];
    console.log("file", this.file);
  }

  upload(form) {
    console.log("form", form.value);
    this.isloading = true;
    console.log("startdate", form.value.startdate);
    console.log("enddate", form.value.enddate);
    const fd = new FormData();
    fd.append("uri", this.file, this.file.name);
    fd.append("name", form.value.name);
    fd.append("description", form.value.description);
    fd.append("startdate", form.value.startdate);
    fd.append("enddate", form.value.enddate);

    console.log("fd", fd);
    this._cs.upload_course(fd).subscribe(
      res => {
        this.isloading = false;
        console.log("res", res);
        this._router.navigate(["/courses"]);
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { CourseService } from '../course.service';

declare var require: any;

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _cs: CourseService) {
    this.id = this._route.snapshot.params.id;
  }

  course = "Angular";

  public logo = require("src/app/modules/courses/Indium-software-Logo.png");

  ngOnInit(): void {
    this._cs.get_course(this.id).subscribe(
      res => {
        this.course = res.name;
      }
    )
  }

  name = localStorage.getItem("currentuser");

  date = new Date();

  id = "I2844";

  certificate() {
    var element = document.getElementById('certificate');
    html2canvas(element, { allowTaint: false, useCORS: true }).then((canvas) => {
      var imgdata = canvas.toDataURL('image/png');
      var doc = new jspdf("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      doc.addImage(imgdata, 'PNG', 0, 0, width, height);
      doc.save('certificate.pdf');
    })
  }
}

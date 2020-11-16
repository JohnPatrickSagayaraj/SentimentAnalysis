import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { CourseService } from '../course.service';
import { Subject } from 'rxjs';

declare var $;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  dataTable: any;
  dtOptions: any;
  courses:any;
  @ViewChild('dataTable', {static: true}) table;

  constructor(private _cs: CourseService){
  }

  ngOnInit(): void {
    this._cs.get_report().subscribe(
      res => {
        this.courses = res;
        this.dtOptions = {
          data: this.courses,
          pagingType: 'full_numbers',
          columns: [
            {title: 'Name', data: "name" },
            {title: 'No of users enrolled', data: "count" },
            {title: 'Review', data: "comment" }
          ],
          dom: 'Bfrtip',
          buttons: [
            'csv', 'excel', 'pdf', 'print'
          ]
        };
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.dataTable(this.dtOptions);
      }
    )
  }
}


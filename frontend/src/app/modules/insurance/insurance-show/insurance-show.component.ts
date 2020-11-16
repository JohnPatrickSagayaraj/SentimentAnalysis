import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InsuranceService } from '../insurance.service';
import { SafePipe } from '../safe.pipe';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material';

@Component({
  selector: 'app-insurance-show',
  templateUrl: './insurance-show.component.html',
  styleUrls: ['./insurance-show.component.css']
})
export class InsuranceShowComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InsuranceShowComponent>,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _is: InsuranceService) {
  }

  result: any = {};
  premium: number = 5000;

  ngOnInit() {
    this._is.get_insurance(this.data.id).subscribe(
      res => {
        this.result = res.result;
        console.log('response', this.result);
        this.premium = res.premium;
      },
      err => {
        console.log(err);
      }
    )
  }

  close() {
    this.dialogRef.close();
    this._router.navigate(["/insurances"]);
  }

}

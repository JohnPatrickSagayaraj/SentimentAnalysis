import {Component, Inject} from  '@angular/core';
import { Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material/dialog';
import { UserService } from '../../../auth/user.service';
import { InsuranceService } from '../insurance.service';

@Component({
templateUrl:  'calculate.component.html'
})
export class CalculateComponent {
  constructor(private  dialogRef:  MatDialogRef<CalculateComponent>, private _router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private _us: UserService, private _cs: InsuranceService) {
  }

  close() {
    this.dialogRef.close();
    this._router.navigate(["/insurances"]);
  }
}

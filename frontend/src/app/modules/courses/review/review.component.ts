import {Component, Inject, Injectable} from  '@angular/core';
import { Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { UserService } from '../../../auth/user.service';
import { CourseService } from '../course.service';

@Component({
templateUrl:  'review.component.html'
})
export  class  ReviewComponent {
  constructor(private  dialogRef:  MatDialogRef<ReviewComponent>, private _router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private _us: UserService, private _cs: CourseService) {
  }

  user:any = { comment: "" };

  public closeMe(form) {
    this._us.add_comment(localStorage.getItem('user_id'), this.data.id, this.user.comment).subscribe(
      res => {
        this._cs.add_comment(this.data.id, localStorage.getItem('user_id'), this.user.comment).subscribe(
          res => {
            this.dialogRef.close();
            this._router.navigate(['/course/' + this.data.id + '/certificate']);
          }
        )
      }
    )
  }
}

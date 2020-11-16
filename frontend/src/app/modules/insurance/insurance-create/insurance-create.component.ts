import { Component, OnInit } from '@angular/core';
import { Insurance } from '../insurance';
import { InsuranceService } from '../insurance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material';
import { CalculateComponent } from '../calculate/calculate.component';

@Component({
  selector: 'app-insurance-create',
  templateUrl: './insurance-create.component.html',
  styleUrls: ['./insurance-create.component.css']
})
export class InsuranceCreateComponent implements OnInit {

  operation = "Create";

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        console.log(params);
        if(params.id) {
          this.operation = "Edit";
          this._is.get_insurance(params.id).subscribe(
            res => {
              const result = res.result;
              Object.keys(result).forEach((element) => {
                if(typeof(result[element]) === 'boolean') {
                  this.insurance[element] = result[element].toString();
                } else {
                  this.insurance[element] = result[element];
                }
              });
            }
          )
        }
      }
    )
  }

  constructor(private _is: InsuranceService, private _router:Router, private  dialog:  MatDialog, private route: ActivatedRoute) { }

  premium: number = 5000;
  isloading:boolean = false;

  insurance:any = {
    name: "",
    gender: "male",
    age: null,
    hypertension: "false",
    pressure: "false",
    sugar: "false",
    overweight: "false",
    smooking: "false",
    alcohol: "false",
    exercise: "false",
    drugs: "false"
  };

  calculate() {
    this.dialog.open(CalculateComponent, {
      height: '250px',
      width: '300px',
      data: {
        id: this.premium
      }
    });
  }

  submit(form) {
    if(this.operation === 'Edit') {
      this._is.edit_insurance(this.insurance).subscribe(
        res => {
          this.premium = res.premium;
          this.calculate();
        },
        err => {}
      )
    } else {
      this._is.calculate_insurance(this.insurance).subscribe(
        res => {
          this.premium = res.premium;
          this.calculate();
        }
      )
    }
  }

}

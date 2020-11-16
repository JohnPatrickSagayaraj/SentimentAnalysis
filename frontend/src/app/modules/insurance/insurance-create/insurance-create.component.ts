import { Component, OnInit } from '@angular/core';
import { Insurance } from '../insurance';
import { InsuranceService } from '../insurance.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material';
import { CalculateComponent } from '../calculate/calculate.component';

@Component({
  selector: 'app-insurance-create',
  templateUrl: './insurance-create.component.html',
  styleUrls: ['./insurance-create.component.css']
})
export class InsuranceCreateComponent implements OnInit {

  constructor(private _is: InsuranceService, private _router:Router, private  dialog:  MatDialog) { }

  ngOnInit(): void {
  }

  premium: number = 5000;
  isloading:boolean = false;

  insurance:any = {
    name: "Meena",
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
    this._is.calculate_insurance(this.insurance).subscribe(
      res => {
        this.premium = res.premium;
        this.calculate();
      }
    )
  }

}

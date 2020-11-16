import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatPaginatorModule, MatGridListModule, MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule, MatDialogModule, MatDividerModule, MatRadioModule, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { InsuranceCreateComponent } from 'src/app/modules/insurance/insurance-create/insurance-create.component';
import { CalculateComponent } from 'src/app/modules/insurance/calculate/calculate.component';
import { InsuranceComponent } from 'src/app/modules/insurance/insurance.component';
import { InsuranceShowComponent } from 'src/app/modules/insurance/insurance-show/insurance-show.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    InsuranceComponent,
    InsuranceCreateComponent,
    InsuranceShowComponent,
    CalculateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatRadioModule,
    MatTableModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    InsuranceCreateComponent
  ]
})
export class DefaultModule { }

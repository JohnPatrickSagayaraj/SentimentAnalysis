import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatPaginatorModule, MatGridListModule, MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule, MatDialogModule, MatDividerModule, MatRadioModule, MatTableModule } from '@angular/material';
import { CourseShowComponent } from 'src/app/modules/insurance/course-show/course-show.component';
import { FormsModule } from '@angular/forms';
import { SafePipe } from 'src/app/modules/insurance/safe.pipe';
import { InsuranceCreateComponent } from 'src/app/modules/insurance/insurance-create/insurance-create.component';
import { CalculateComponent } from 'src/app/modules/insurance/calculate/calculate.component';
import { InsuranceComponent } from 'src/app/modules/insurance/insurance.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    InsuranceComponent,
    InsuranceCreateComponent,
    CourseShowComponent,
    SafePipe,
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
    InsuranceCreateComponent,
    CourseShowComponent,
    SafePipe
  ]
})
export class DefaultModule { }

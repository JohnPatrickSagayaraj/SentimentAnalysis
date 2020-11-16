import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from 'src/app/modules/courses/courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatPaginatorModule, MatGridListModule, MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule, MatDialogModule, MatDividerModule } from '@angular/material';
import { CourseCreateComponent } from 'src/app/modules/courses/course-create/course-create.component';
import { CourseShowComponent } from 'src/app/modules/courses/course-show/course-show.component';
import { CertificateComponent } from 'src/app/modules/courses/certificate/certificate.component';
import { FormsModule } from '@angular/forms';
import { SafePipe } from 'src/app/modules/courses/safe.pipe';
import { ReviewComponent } from 'src/app/modules/courses/review/review.component';
import { MyCourseComponent } from 'src/app/modules/courses/my-course/my-course.component';
import { ReportsComponent } from 'src/app/modules/courses/reports/reports.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    CoursesComponent,
    CourseCreateComponent,
    CourseShowComponent,
    CertificateComponent,
    SafePipe,
    ReviewComponent,
    MyCourseComponent,
    ReportsComponent
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
    MatDividerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    CourseCreateComponent,
    CourseShowComponent,
    CertificateComponent,
    SafePipe
  ]
})
export class DefaultModule { }

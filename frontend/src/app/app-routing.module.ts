import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthDefaultComponent } from './layouts/auth-default/auth-default.component';
import { CourseShowComponent } from './modules/courses/course-show/course-show.component';
import { CertificateComponent } from './modules/courses/certificate/certificate.component';
import { CourseCreateComponent } from './modules/courses/course-create/course-create.component';
import { AuthGuard } from './auth/auth.guard';
import { ReviewComponent } from './modules/courses/review/review.component';
import { MyCourseComponent } from './modules/courses/my-course/my-course.component';
import { ReportsComponent } from './modules/courses/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'mycourses',
        component: MyCourseComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'course/new',
        component: CourseCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'course/show/:id',
        component: CourseShowComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'course/:id/certificate',
        component: CertificateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'course/review',
        component: ReviewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'report',
        component: ReportsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

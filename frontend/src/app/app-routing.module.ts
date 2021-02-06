import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SentimentCreateComponent } from './modules/sentiment/sentiment-create/sentiment-create.component';
import { AuthGuard } from './auth/auth.guard';
import { SentimentComponent } from './modules/sentiment/sentiment.component';
import { SentimentShowComponent } from './modules/sentiment/sentiment-show/sentiment-show.component';
import { ReviewComponent } from './modules/review/review.component';
import { ReviewCreateComponent } from './modules/review/review-create/review-create.component';
import { ProductsComponent } from './modules/products/products.component';

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
        path: 'sentiments',
        component: SentimentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sentiment/new',
        component: SentimentCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sentiment/show/:id',
        component: SentimentShowComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reviews',
        component: ReviewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'product/:id/review/new',
        component: ReviewCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'products',
        component: ProductsComponent,
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

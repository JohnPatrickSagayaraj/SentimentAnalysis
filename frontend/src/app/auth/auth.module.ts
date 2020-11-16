import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDividerModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EqualValidator } from './signup/equal-validator.directive';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    EqualValidator
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    MatCheckboxModule
  ],
  exports: [
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule { }

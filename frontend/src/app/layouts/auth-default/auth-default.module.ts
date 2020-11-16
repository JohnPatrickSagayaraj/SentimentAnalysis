import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDefaultComponent } from './auth-default.component';

@NgModule({
  declarations: [
    AuthDefaultComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule
  ]
})
export class AuthDefaultModule { }

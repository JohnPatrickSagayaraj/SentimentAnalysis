import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatPaginatorModule, MatGridListModule, MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule, MatDialogModule, MatDividerModule, MatRadioModule, MatTableModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SentimentCreateComponent } from 'src/app/modules/sentiment/sentiment-create/sentiment-create.component';
import { SentimentComponent } from 'src/app/modules/sentiment/sentiment.component';
import { SentimentShowComponent } from 'src/app/modules/sentiment/sentiment-show/sentiment-show.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { ReviewComponent } from 'src/app/modules/review/review.component';
import { ProductsComponent } from 'src/app/modules/products/products.component';
import { ReviewCreateComponent } from 'src/app/modules/review/review-create/review-create.component';
 
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    SentimentComponent,
    SentimentCreateComponent,
    SentimentShowComponent,
    ReviewComponent,
    ReviewCreateComponent,
    ProductsComponent
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
    MatTableModule,
    PlotlyModule,
    MatSelectModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    SentimentCreateComponent
  ]
})
export class DefaultModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { OverviewComponent } from './components/powerbi/overview/overview.component';
import { SalesComponent } from './components/powerbi/sales/sales.component';
import { StockComponent } from './components/powerbi/stock/stock.component';
import { ProductionComponent } from './components/powerbi/production/production.component';
import { ClusteringComponent } from './components/powerbi/clustering/clustering.component';
import { TimeseriesComponent } from './components/powerbi/timeseries/timeseries.component';
import { PredictRevenueComponent } from './components/ml/predict-revenue/predict-revenue.component';
import { SentimentReviewComponent } from './components/ml/sentiment-review/sentiment-review.component';
import { BoxClassifierComponent } from './components/ml/box-classifier/box-classifier.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { Sales2Component } from './components/powerbi/sales2/sales2.component';
import { RecommendationVisualComponent } from './components/ml/recommendation-visual/recommendation-visual.component';
import { ClusteringStockComponent } from './components/ml/clustering-stock/clustering-stock.component';
import { ClassificationVisualComponent } from './components/ml/classification-visual/classification-visual.component';
import { RegressionVisualComponent } from './components/ml/regression-visual/regression-visual.component';
import { ArriimaVisualComponent } from './components/ml/arriima-visual/arriima-visual.component';
import { BlinearVisualComponent } from './components/ml/blinear-visual/blinear-visual.component';
import { ForecastVisualComponent } from './components/ml/forecast-visual/forecast-visual.component';
import { CosmeticsVisualComponent } from './components/ml/cosmetics-visual/cosmetics-visual.component';
import { RecommendationProductionComponent } from './components/ml/recommendation-production/recommendation-production.component';
import { ClassificationProductionComponent } from './components/ml/classification-production/classification-production.component';
import { RegressionProductionComponent } from './components/ml/regression-production/regression-production.component';

// ✅ Angular Material pour datepicker/mois/année
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { GenerateReportComponent } from './components/openai/generate-report/generate-report.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { HomeComponent } from './views/home/home.component';
import { HomeComponent2 } from './components/home2/home2.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    OverviewComponent,
    SalesComponent,
    StockComponent,
    ProductionComponent,
    ClusteringComponent,
    TimeseriesComponent,
    PredictRevenueComponent,
    SentimentReviewComponent,
    BoxClassifierComponent,
    SafePipe,
    Sales2Component,
    RecommendationVisualComponent,
    ClusteringStockComponent,
    ClassificationVisualComponent,
    RegressionVisualComponent,
    ArriimaVisualComponent,
    BlinearVisualComponent,
    ForecastVisualComponent,
    CosmeticsVisualComponent,
    RecommendationProductionComponent,
    ClassificationProductionComponent,
    RegressionProductionComponent,
    HomeComponent,
    HomeComponent2,
    GenerateReportComponent,
    ChatbotComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSliderModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

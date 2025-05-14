import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard'; // 🔒 Auth Guard
import { LoginComponent } from './views/login.component'; // ✅ CORRECT


//open Ai
import { GenerateReportComponent } from './components/openai/generate-report/generate-report.component';


// PowerBI Components
import { OverviewComponent } from './components/powerbi/overview/overview.component';
import { SalesComponent } from './components/powerbi/sales/sales.component';
import { Sales2Component } from './components/powerbi/sales2/sales2.component';
import { StockComponent } from './components/powerbi/stock/stock.component';
import { ProductionComponent } from './components/powerbi/production/production.component';
import { ClusteringComponent } from './components/powerbi/clustering/clustering.component';
import { TimeseriesComponent } from './components/powerbi/timeseries/timeseries.component';
// ML Components
import { PredictRevenueComponent } from './components/ml/predict-revenue/predict-revenue.component';
import { SentimentReviewComponent } from './components/ml/sentiment-review/sentiment-review.component';
import { BoxClassifierComponent } from './components/ml/box-classifier/box-classifier.component';
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
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { HomeComponent2 } from './components/home2/home2.component';

export const Approutes: Routes = [
  { path: '', component: HomeComponent2 },
    { path: 'home', component: HomeComponent2 },
    { path: 'chatbot', component: ChatbotComponent },

  // ✅ Page de connexion non protégée
  { path: 'login', component: LoginComponent },

  // ✅ Routes sécurisées par AuthGuard
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

      // Dashboard
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      // About
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },

      // Components
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },

      // Power BI pages
      { path: 'bi/overview', component: OverviewComponent },
      { path: 'bi/sales', component: SalesComponent },
      { path: 'bi/sales2', component: Sales2Component },
      { path: 'bi/stock', component: StockComponent },
      { path: 'bi/production', component: ProductionComponent },
      { path: 'bi/clustering', component: ClusteringComponent },
      { path: 'bi/timeseries', component: TimeseriesComponent },

      // Machine Learning pages
      { path: 'ml/predict-revenue', component: PredictRevenueComponent },
      { path: 'ml/sentiment-review', component: SentimentReviewComponent },
      { path: 'ml/box-classifier', component: BoxClassifierComponent },
      { path: 'ml/recommendation-visual', component: RecommendationVisualComponent },
      { path: 'ml/clustering-stock', component: ClusteringStockComponent },
      { path: 'ml/classification-visual', component: ClassificationVisualComponent },
      { path: 'ml/regression-visual', component: RegressionVisualComponent },
      { path: 'ml/arriima-visual', component: ArriimaVisualComponent },
      { path: 'ml/blinear-visual', component: BlinearVisualComponent },
      { path: 'ml/forecast-visual', component: ForecastVisualComponent },
      { path: 'ml/cosmetics-visual', component: CosmeticsVisualComponent },
      { path: 'ml/recommendation-production', component: RecommendationProductionComponent },
      { path: 'classification-production', component: ClassificationProductionComponent },
      { path: 'regression-production', component: RegressionProductionComponent },
      // OpenAI pages
      { path: 'generate-report', component: GenerateReportComponent },
    ]
  },

  // ❗ Fallback : tout ce qui ne matche pas => redirigé vers login
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


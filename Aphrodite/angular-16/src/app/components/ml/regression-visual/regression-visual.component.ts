import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-regression-visual',
  templateUrl: './regression-visual.component.html',
  styleUrls: ['./regression-visual.component.scss']
})
export class RegressionVisualComponent {
  capacity: number = 0;
  prediction: number | null = null;
  alert: string = '';
  recommendation: string = '';

  constructor(private http: HttpClient) {}

  predictUsage(): void {
    const formData = new FormData();
    formData.append('capacity', this.capacity.toString());

    this.http.post<any>('http://localhost:5000/regression_stock', formData).subscribe({
      next: res => {
        this.prediction = res.prediction;
        this.alert = res.alert;
        this.recommendation = res.recommendation;
      },
      error: err => {
        this.prediction = null;
        this.alert = 'Erreur';
        this.recommendation = err.message || 'Erreur inconnue';
      }
    });
  }
}

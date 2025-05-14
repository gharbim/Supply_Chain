import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-arriima-visual',
  templateUrl: './arriima-visual.component.html',
  styleUrls: ['./arriima-visual.component.scss']
})
export class ArriimaVisualComponent {
  input_value: number = 1;
  prediction: number[] = [];

  constructor(private http: HttpClient) {}

  predict() {
    const formData = new FormData();
    formData.append('input_value', this.input_value.toString());

    this.http.post<any>('http://localhost:5000/predict_arriima', formData).subscribe({
      next: res => {
        this.prediction = res.prediction;
      },
      error: err => {
        this.prediction = [];
        console.error('Erreur de prédiction ARIMA', err);
      }
    });
  }
}

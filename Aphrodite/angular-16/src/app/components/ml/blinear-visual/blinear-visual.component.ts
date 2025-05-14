import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blinear-visual',
  templateUrl: './blinear-visual.component.html',
  styleUrls: ['./blinear-visual.component.scss']
})
export class BlinearVisualComponent {
  inputValue: number = 0;
  prediction: number | null = null;

  constructor(private http: HttpClient) {}

  predict(): void {
    const formData = new FormData();
    formData.append('input_value', this.inputValue.toString());

    this.http.post<any>('http://localhost:5000/predict_blinear', formData).subscribe({
      next: res => {
        this.prediction = res.prediction;
      },
      error: err => {
        console.error('Erreur:', err);
        this.prediction = null;
      }
    });
  }
}

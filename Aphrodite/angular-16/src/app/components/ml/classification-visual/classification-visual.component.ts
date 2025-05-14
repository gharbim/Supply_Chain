import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-classification-visual',
  templateUrl: './classification-visual.component.html',
  styleUrls: ['./classification-visual.component.scss']
})
export class ClassificationVisualComponent {
  capacity: number = 0;
  prediction: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  classifyStock(): void {
    const formData = new FormData();
    formData.append('capacity', this.capacity.toString());

    this.http.post<any>('http://localhost:5000/classification_stock', formData).subscribe({
      next: (res) => {
        this.prediction = res.prediction;
        this.message = res.message;
      },
      error: (err) => {
        this.prediction = 'Erreur';
        this.message = err.message || 'Erreur inconnue';
      }
    });
  }
}

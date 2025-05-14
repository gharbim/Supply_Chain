import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-classification-production',
  templateUrl: './classification-production.component.html',
  styleUrls: ['./classification-production.component.scss']
})
export class ClassificationProductionComponent {
  dosage: number | null = null;
  predictionResult: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  getPrediction(): void {
    this.predictionResult = '';
    this.errorMessage = '';

    if (this.dosage === null || isNaN(this.dosage)) {
      this.errorMessage = 'Veuillez entrer un dosage valide.';
      return;
    }

    if (this.dosage <= 0) {
      this.errorMessage = 'Le dosage doit être strictement supérieur à 0.';
      return;
    }

    if (this.dosage > 9) {
      this.errorMessage = 'Le dosage ne peut pas dépasser 9.';
      return;
    }

    const formData = new FormData();
    formData.append('dosage', this.dosage.toString());

    this.http.post<any>('http://localhost:5000/classification_production', formData).subscribe({
      next: (res: any) => {
        this.predictionResult = res.prediction || 'Réponse vide';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur lors de la prédiction.';
      }
    });
  }
}

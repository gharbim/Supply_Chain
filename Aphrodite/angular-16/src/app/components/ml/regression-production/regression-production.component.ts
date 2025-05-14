import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-regression-production',
  templateUrl: './regression-production.component.html',
  styleUrls: ['./regression-production.component.scss']
})
export class RegressionProductionComponent implements OnInit {
  productFK: number | null = null;
  brandFK: number | null = null;
  dosage: number | null = null;
  productionDurationHours: number | null = null;
  predictionResult: string = '';

  products: any[] = [];
  brands: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
    this.http.get<any>('http://localhost:5000/regression_production/options').subscribe({
      next: (res) => {
        this.products = res.products || [];
        this.brands = res.brands || [];
      },
      error: (err) => {
        console.error('Erreur chargement options:', err);
      }
    });
  }

  preventNegative(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === 'Minus') {
      event.preventDefault();
    }
  }

  getPrediction(): void {
    if (
      this.productFK === null ||
      this.brandFK === null ||
      this.dosage === null ||
      this.productionDurationHours === null
    ) {
      this.predictionResult = '❌ Veuillez remplir tous les champs.';
      return;
    }

    if (this.dosage <= 0 || this.productionDurationHours <= 0) {
      this.predictionResult = '❌ Le dosage et la durée doivent être strictement positifs.';
      return;
    }

    const formData = new FormData();
    formData.append('productFK', this.productFK.toString());
    formData.append('brandFK', this.brandFK.toString());
    formData.append('dosage', this.dosage.toString());
    formData.append('production_duration_hours', this.productionDurationHours.toString());

    this.http.post<any>('http://localhost:5000/regression_production', formData).subscribe({
      next: (res) => {
        this.predictionResult = `✅ Résultat : ${res.prediction}`;
      },
      error: (err) => {
        console.error('Erreur prédiction:', err);
        this.predictionResult = '❌ Erreur lors de la prédiction.';
      }
    });
  }
}

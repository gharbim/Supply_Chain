import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommendation-visual',
  templateUrl: './recommendation-visual.component.html',
  styleUrls: ['./recommendation-visual.component.scss']
})
export class RecommendationVisualComponent implements OnInit {
  brands: string[] = [];
  recommendations: any[] = [];
  showEmptyMessage = false;

  filters = {
    price_min: 0,
    price_max: 1000,
    rating_min: 0,
    brand: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    this.http.get<string[]>('http://localhost:5000/recommandation_stock/brands')
      .subscribe({
        next: (data) => this.brands = data,
        error: (err) => console.error('Erreur chargement marques', err)
      });
  }

  getRecommendations() {
    this.http.post<any[]>('http://localhost:5000/recommandation_stock', this.filters)
      .subscribe({
        next: (data) => {
          this.recommendations = data;
          this.showEmptyMessage = data.length === 0;
        },
        error: (err) => console.error('Erreur recommandation', err)
      });
  }
}

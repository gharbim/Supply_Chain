import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clustering-stock',
  templateUrl: './clustering-stock.component.html',
  styleUrls: ['./clustering-stock.component.scss']
})
export class ClusteringStockComponent {
  capacity: number = 0;
  quantity: number = 0;
  interpretation: string = '';
  pourcentage: number | null = null;

  constructor(private http: HttpClient) {}

  sendRequest() {
    const payload = {
      capacity: this.capacity,
      quantity: this.quantity
    };

    this.http.post<any>('http://localhost:5000/clustering_stock', payload).subscribe({
      next: (res) => {
        this.interpretation = res.interpretation;
        this.pourcentage = res.pourcentage;
      },
      error: (err) => {
        console.error('Erreur clustering:', err);
        this.interpretation = "Erreur de prédiction.";
        this.pourcentage = null;
      }
    });
  }
}

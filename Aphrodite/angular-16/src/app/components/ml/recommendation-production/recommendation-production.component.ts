import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-recommendation-production',
  templateUrl: './recommendation-production.component.html',
  styleUrls: ['./recommendation-production.component.scss']
})
export class RecommendationProductionComponent implements OnInit {
  productNames: string[] = [];
  skinTypes: string[] = [];
  usageFrequencies: string[] = [];

  selectedProduct = '';
  selectedSkin = '';
  selectedUsage = '';

  predictionData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5000/recommendation_production/options').subscribe({
      next: (data) => {
        this.productNames = data.product_names || [];
        this.skinTypes = data.skin_types || [];
        this.usageFrequencies = data.usage_frequencies || [];
      },
      error: (err) => {
        console.error('❌ ERREUR CHARGEMENT OPTIONS:', err);
      }
    });
  }

  getRecommendations(): void {
    if (!this.selectedProduct || !this.selectedSkin || !this.selectedUsage) {
      alert('❗ Merci de remplir tous les champs avant de lancer la recommandation.');
      return;
    }
  
    const params = new HttpParams()
      .set('product_name', this.selectedProduct)
      .set('user_skin_type', this.selectedSkin)
      .set('user_usage', this.selectedUsage);
  
    // 🧼 Étape 1 : détruire l'ancienne table AVANT de mettre à jour predictionData
    if ($.fn.DataTable.isDataTable('#datatable')) {
      $('#datatable').DataTable().clear().destroy();
    }
  
    // 🧪 Étape 2 : appeler l'API Flask
    this.http.post<any>('http://localhost:5000/recommendation_production', params).subscribe({
      next: (response) => {
        this.predictionData = Array.isArray(response) ? response : [];
  
        // ⏱ Étape 3 : laisser le temps à Angular de mettre à jour le DOM
        setTimeout(() => {
          if (this.predictionData.length > 0) {
            $('#datatable').DataTable({
              pageLength: 5,
              dom: 'Bfrtip',
              buttons: [
                {
                  extend: 'csvHtml5',
                  text: '📁 Export CSV',
                  className: 'btn btn-sm btn-warning'
                },
                {
                  extend: 'pdfHtml5',
                  text: '🧾 Export PDF',
                  className: 'btn btn-sm btn-danger',
                  orientation: 'landscape',
                  pageSize: 'A4'
                }
              ],
              language: {
                search: "🔍 Recherche:",
                lengthMenu: "Afficher _MENU_ entrées",
                info: "Affichage de _START_ à _END_ sur _TOTAL_ produits",
                paginate: {
                  previous: "⬅",
                  next: "➡"
                }
              }
            });
          }
        }, 100); // délai réduit mais suffisant
      },
      error: err => {
        console.error('❌ ERREUR RECO:', err);
        this.predictionData = [];
      }
    });
  }
  
}

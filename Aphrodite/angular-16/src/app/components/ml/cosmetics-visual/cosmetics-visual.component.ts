import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cosmetics-visual',
  templateUrl: './cosmetics-visual.component.html'
})
export class CosmeticsVisualComponent {
  selectedFile: File | null = null;
  predictionResult: string | null = null;
  previewUrl: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:5000/cosmetics_predict', formData).subscribe({
      next: (res) => {
        this.predictionResult = res.prediction;
      },
      error: (err) => {
        console.error('Erreur de prédiction :', err);
      }
    });
  }
}

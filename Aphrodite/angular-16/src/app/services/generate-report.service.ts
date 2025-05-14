import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateReportService {
  private apiUrl = 'http://localhost:5000/generate-report'; // Votre API backend

  constructor(private http: HttpClient) {}

  generateReport(profile: string, prompt: string): Observable<any> {
    const payload = { profile, prompt };  // Envoie les deux paramètres : profil et prompt
    return this.http.post<any>(this.apiUrl, payload);
  }
}

import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-forecast-visual',
  templateUrl: './forecast-visual.component.html',
  styleUrls: ['./forecast-visual.component.scss']
})
export class ForecastVisualComponent {
  startDate: Date = new Date(2025, 0); // janvier 2025
  nMonths: number = 3;
  plotUrl: string = '';
  forecastTable: any[] = [];
  minDate: Date = new Date(2025, 0); // date min

  constructor(private http: HttpClient, private adapter: DateAdapter<any>) {
    this.adapter.setLocale('fr'); // langue calendrier
  }

  chosenMonthHandler(normalizedMonth: Date, datepicker: any) {
    this.startDate = new Date(normalizedMonth.getFullYear(), normalizedMonth.getMonth(), 1);
    datepicker.close();
  }

  getForecast(): void {
    const formattedDate = this.startDate.toISOString().split('T')[0];

    const params = new HttpParams()
      .set('start_date', formattedDate)
      .set('n_months', this.nMonths.toString());

    this.http.get<any>('http://localhost:5000/forecast_production', { params }).subscribe({
      next: (data) => {
        this.plotUrl = 'data:image/png;base64,' + data.plot_url;
        this.forecastTable = data.forecast_table;
        this.startDate = new Date(data.default_date);
        this.nMonths = data.n_months;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la prévision', err);
      }
    });
  }

  downloadCSV(): void {
    const formattedDate = this.startDate.toISOString().split('T')[0];
    const params = new HttpParams()
      .set('start_date', formattedDate)
      .set('n_months', this.nMonths.toString());

    const url = `http://localhost:5000/download_forecast_csv?${params.toString()}`;
    window.open(url, '_blank');
  }
}

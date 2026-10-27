import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../config/api.config';
import { ReservationRow, ReservationSummary } from '../../interfaces/reservation-report.interface';
import { ReservationState } from '../../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/reservations`;

  getAll(estado?: ReservationState): Observable<ReservationRow[]> {
    const params = estado ? new HttpParams().set('estado', estado) : new HttpParams();
    return this.http.get<ReservationRow[]>(this.baseUrl, { params });
  }

  getSummary(): Observable<ReservationSummary> {
    return this.http.get<ReservationSummary>(`${this.baseUrl}/summary`);
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../config/api.config';
import { EventAvailability, EventFilters } from '../../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/events`;

  getAll(filters: EventFilters = {}): Observable<EventAvailability[]> {
    let params = new HttpParams();

    if (filters.ciudad) {
      params = params.set('ciudad', filters.ciudad);
    }

    if (filters.estado) {
      params = params.set('estado', filters.estado);
    }

    return this.http.get<EventAvailability[]>(this.baseUrl, { params });
  }

  getById(codigo: number): Observable<EventAvailability> {
    return this.http.get<EventAvailability>(`${this.baseUrl}/${codigo}`);
  }

}

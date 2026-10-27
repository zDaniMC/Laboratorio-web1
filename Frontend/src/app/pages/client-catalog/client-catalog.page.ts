import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { EVENT_STATES, EventAvailability, EventFilters, EventState } from '../../interfaces/event.interface';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-client-catalog.page',
  imports: [CurrencyPipe, DatePipe, DecimalPipe],
  templateUrl: './client-catalog.page.html',
  styleUrl: './client-catalog.page.scss',
})
export class ClientCatalogPage implements OnInit {

  private readonly eventsService = inject(EventsService);

  readonly states = EVENT_STATES;
  readonly events = signal<EventAvailability[]>([]);
  readonly cities = signal<string[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  private filters: EventFilters = {};

  ngOnInit(): void {
    this.loadEvents();
  }

  onCityChange(ciudad: string): void {
    this.filters = { ...this.filters, ciudad: ciudad || undefined };
    this.loadEvents();
  }

  onStateChange(estado: string): void {
    this.filters = { ...this.filters, estado: (estado || undefined) as EventState | undefined };
    this.loadEvents();
  }

  occupancy(event: EventAvailability): number {
    return Math.round((event.entradas_vendidas / event.capacidad) * 100);
  }

  stateClass(estado: EventState): string {
    const classes: Record<EventState, string> = {
      'Programado': 'scheduled',
      'En Boleteria': 'ticketing',
      'En Vivo': 'live',
      'Finalizado': 'finished',
      'Cancelado': 'cancelled',
    };
    return classes[estado];
  }

  private loadEvents(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.eventsService.getAll(this.filters).subscribe({
      next: (events) => {
        this.events.set(events);
        this.fillCities(events);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.events.set([]);
        this.errorMessage.set(error.error?.error ?? 'No fue posible conectar con el servidor.');
        this.loading.set(false);
      },
    });
  }

  private fillCities(events: EventAvailability[]): void {
    if (this.cities().length === 0) {
      const cities = [...new Set(events.map((event) => event.ciudad))].sort();
      this.cities.set(cities);
    }
  }

}

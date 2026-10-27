import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RESERVATION_STATES, ReservationRow, ReservationSummary } from '../../interfaces/reservation-report.interface';
import { ReservationState } from '../../interfaces/reservation.interface';
import { ReservationsService } from '../../services/reservations/reservations.service';

@Component({
  selector: 'app-agent-report.page',
  imports: [CurrencyPipe, DatePipe, DecimalPipe],
  templateUrl: './agent-report.page.html',
  styleUrl: './agent-report.page.scss',
})
export class AgentReportPage implements OnInit {

  private readonly reservationsService = inject(ReservationsService);

  readonly states = RESERVATION_STATES;
  readonly summary = signal<ReservationSummary | null>(null);
  readonly reservations = signal<ReservationRow[]>([]);
  readonly selectedState = signal<ReservationState | null>(null);
  readonly loadingSummary = signal(false);
  readonly loadingTable = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly maxEventTotal = computed(() => {
    const totals = this.summary()?.por_evento.map((item) => item.total) ?? [];
    return Math.max(...totals, 1);
  });

  ngOnInit(): void {
    this.loadSummary();
    this.loadReservations();
  }

  filterByState(estado: ReservationState | null): void {
    this.selectedState.set(estado);
    this.loadReservations();
  }

  barWidth(total: number): number {
    return (total / this.maxEventTotal()) * 100;
  }

  statePercent(estado: ReservationState): number {
    const summary = this.summary();
    if (!summary || summary.total_reservas === 0) {
      return 0;
    }
    return (summary.por_estado[estado] / summary.total_reservas) * 100;
  }

  stateClass(estado: ReservationState): string {
    const classes: Record<ReservationState, string> = {
      'Reservada': 'reserved',
      'Confirmada': 'confirmed',
      'Cancelada': 'cancelled',
    };
    return classes[estado];
  }

  private loadSummary(): void {
    this.loadingSummary.set(true);

    this.reservationsService.getSummary().subscribe({
      next: (summary) => {
        this.summary.set(summary);
        this.loadingSummary.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.showError(error);
        this.loadingSummary.set(false);
      },
    });
  }

  private loadReservations(): void {
    this.loadingTable.set(true);
    this.errorMessage.set(null);

    this.reservationsService.getAll(this.selectedState() ?? undefined).subscribe({
      next: (reservations) => {
        this.reservations.set(reservations);
        this.loadingTable.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.reservations.set([]);
        this.showError(error);
        this.loadingTable.set(false);
      },
    });
  }

  private showError(error: HttpErrorResponse): void {
    this.errorMessage.set(error.error?.error ?? 'No fue posible conectar con el servidor.');
  }

}

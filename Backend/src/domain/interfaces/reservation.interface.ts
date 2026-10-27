export const RESERVATION_STATES = ['Reservada', 'Confirmada', 'Cancelada'] as const;

export type ReservationState = (typeof RESERVATION_STATES)[number];

export interface Reservation {
  codigo: number;
  evento_codigo: number;
  evento_nombre: string;
  ciudad: string;
  cliente: string;
  fecha: Date;
  entradas: number;
  total: number;
  observaciones: string | null;
  estado: ReservationState;
}

export interface ReservationsByEvent {
  evento_codigo: number;
  evento_nombre: string;
  reservas: number;
  entradas: number;
  total: number;
}

export interface ReservationSummary {
  total_reservas: number;
  total_entradas: number;
  valor_total: number;
  por_estado: Record<ReservationState, number>;
  por_evento: ReservationsByEvent[];
}

export const EVENT_STATES = [
  'Programado',
  'En Boleteria',
  'En Vivo',
  'Finalizado',
  'Cancelado',
] as const;

export type EventState = (typeof EVENT_STATES)[number];

export interface Event {
  codigo: number;
  nombre: string;
  descripcion: string;
  teatro: string;
  ciudad: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  capacidad: number;
  precio: number;
  observaciones: string | null;
  estado: EventState;
  entradas_vendidas: number;
  entradas_disponibles: number;
}

export interface EventFilters {
  ciudad?: string;
  estado?: EventState;
}

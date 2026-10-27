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
    observaciones: string;
    estado: EventState;
}

export interface EventAvailability extends Omit<Event, 'fecha_inicio' | 'fecha_fin' | 'observaciones'> {
    fecha_inicio: string;
    fecha_fin: string;
    observaciones: string | null;
    entradas_vendidas: number;
    entradas_disponibles: number;
}

export interface EventFilters {
    ciudad?: string;
    estado?: EventState;
}

export const EVENT_STATES: EventState[] = [
    'Programado',
    'En Boleteria',
    'En Vivo',
    'Finalizado',
    'Cancelado',
];

export type EventState = 
    | 'Programado'
    | 'En Boleteria'
    | 'En Vivo'
    | 'Finalizado'
    | 'Cancelado';

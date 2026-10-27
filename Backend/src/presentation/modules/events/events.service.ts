import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Event, EventFilters } from "../../../domain/interfaces/event.interface";

export class EventsService {

  private readonly baseQuery = `
    SELECT
      e.codigo,
      e.nombre,
      e.descripcion,
      e.teatro,
      e.ciudad,
      e.fecha_inicio,
      e.fecha_fin,
      e.capacidad,
      e.precio::float AS precio,
      e.observaciones,
      e.estado,
      COALESCE(SUM(r.entradas) FILTER (WHERE r.estado <> 'Cancelada'), 0)::int AS entradas_vendidas,
      (e.capacidad - COALESCE(SUM(r.entradas) FILTER (WHERE r.estado <> 'Cancelada'), 0))::int AS entradas_disponibles
    FROM eventos e
    LEFT JOIN reservas r ON r.evento_codigo = e.codigo
  `;

  public async getAll(filters: EventFilters = {}): Promise<Event[]> {
    const conditions: string[] = [];
    const values: string[] = [];

    if (filters.ciudad) {
      values.push(filters.ciudad);
      conditions.push(`LOWER(e.ciudad) = LOWER($${values.length})`);
    }

    if (filters.estado) {
      values.push(filters.estado);
      conditions.push(`e.estado = $${values.length}`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const sql = `${this.baseQuery} ${where}
      GROUP BY e.codigo
      ORDER BY e.fecha_inicio ASC;`;

    const result = await pool.query<Event>(sql, values);
    return result.rows;
  }

  public async getById(codigo: number): Promise<Event> {
    const sql = `${this.baseQuery}
      WHERE e.codigo = $1
      GROUP BY e.codigo;`;

    const result = await pool.query<Event>(sql, [codigo]);
    const [event] = result.rows;

    if (!event) {
      throw CustomError.notFound(`No existe un evento con código ${codigo}`);
    }

    return event;
  }

}

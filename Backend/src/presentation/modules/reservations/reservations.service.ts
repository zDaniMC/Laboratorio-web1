import { pool } from "../../../config/database";
import {
  Reservation,
  ReservationState,
  ReservationSummary,
  ReservationsByEvent,
  RESERVATION_STATES,
} from "../../../domain/interfaces/reservation.interface";

export class ReservationsService {

  public async getAll(estado?: ReservationState): Promise<Reservation[]> {
    const values: string[] = [];
    let where = "";

    if (estado) {
      values.push(estado);
      where = "WHERE r.estado = $1";
    }

    const sql = `
      SELECT
        r.codigo,
        r.evento_codigo,
        e.nombre AS evento_nombre,
        e.ciudad,
        r.cliente,
        r.fecha,
        r.entradas,
        r.total::float AS total,
        r.observaciones,
        r.estado
      FROM reservas r
      INNER JOIN eventos e ON e.codigo = r.evento_codigo
      ${where}
      ORDER BY r.fecha DESC;`;

    const result = await pool.query<Reservation>(sql, values);
    return result.rows;
  }

  public async getSummary(): Promise<ReservationSummary> {
    const totalsSql = `
      SELECT
        COUNT(*)::int AS total_reservas,
        COALESCE(SUM(entradas) FILTER (WHERE estado <> 'Cancelada'), 0)::int AS total_entradas,
        COALESCE(SUM(total) FILTER (WHERE estado <> 'Cancelada'), 0)::float AS valor_total
      FROM reservas;`;

    const byStateSql = `
      SELECT estado, COUNT(*)::int AS cantidad
      FROM reservas
      GROUP BY estado;`;

    const byEventSql = `
      SELECT
        e.codigo AS evento_codigo,
        e.nombre AS evento_nombre,
        COUNT(r.codigo)::int AS reservas,
        COALESCE(SUM(r.entradas) FILTER (WHERE r.estado <> 'Cancelada'), 0)::int AS entradas,
        COALESCE(SUM(r.total) FILTER (WHERE r.estado <> 'Cancelada'), 0)::float AS total
      FROM eventos e
      INNER JOIN reservas r ON r.evento_codigo = e.codigo
      GROUP BY e.codigo, e.nombre
      ORDER BY total DESC;`;

    type Totals = Pick<ReservationSummary, "total_reservas" | "total_entradas" | "valor_total">;

    const [totals, byState, byEvent] = await Promise.all([
      pool.query<Totals>(totalsSql),
      pool.query<{ estado: ReservationState; cantidad: number }>(byStateSql),
      pool.query<ReservationsByEvent>(byEventSql),
    ]);

    const porEstado = Object.fromEntries(
      RESERVATION_STATES.map((state) => [state, 0])
    ) as Record<ReservationState, number>;

    byState.rows.forEach(({ estado, cantidad }) => (porEstado[estado] = cantidad));

    const emptyTotals: Totals = { total_reservas: 0, total_entradas: 0, valor_total: 0 };

    return {
      ...(totals.rows[0] ?? emptyTotals),
      por_estado: porEstado,
      por_evento: byEvent.rows,
    };
  }

}

import { Request, Response } from "express";
import { CustomError } from "../../../domain/errors/custom.error";
import { HandleError } from "../../../domain/errors/handle.error";
import { RESERVATION_STATES, ReservationState } from "../../../domain/interfaces/reservation.interface";
import { ReservationsService } from "./reservations.service";

export class ReservationsController {

  private readonly reservationsService = new ReservationsService();

  getAll = (req: Request, res: Response): void => {
    const { estado } = req.query;

    if (estado !== undefined && !RESERVATION_STATES.includes(estado as ReservationState)) {
      HandleError.error(
        CustomError.badRequest(`Estado inválido. Valores permitidos: ${RESERVATION_STATES.join(", ")}`),
        res
      );
      return;
    }

    this.reservationsService.getAll(estado as ReservationState | undefined)
    .then((reservations) => res.status(200).json(reservations))
    .catch((error) => HandleError.error(error, res));
  };

  getSummary = (req: Request, res: Response): void => {
    this.reservationsService.getSummary()
    .then((summary) => res.status(200).json(summary))
    .catch((error) => HandleError.error(error, res));
  };

}

import { Request, Response } from "express";
import { CustomError } from "../../../domain/errors/custom.error";
import { HandleError } from "../../../domain/errors/handle.error";
import { EVENT_STATES, EventFilters, EventState } from "../../../domain/interfaces/event.interface";
import { EventsService } from "./events.service";

export class EventsController {

  private readonly eventsService = new EventsService();

  getAll = (req: Request, res: Response): void => {
    let filters: EventFilters;

    try {
      filters = this.parseFilters(req);
    } catch (error) {
      HandleError.error(error, res);
      return;
    }

    this.eventsService.getAll(filters)
    .then((events) => res.status(200).json(events))
    .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response): void => {
    const codigo = Number(req.params.codigo);

    if (!Number.isInteger(codigo) || codigo <= 0) {
      HandleError.error(CustomError.badRequest("El código del evento debe ser un número entero positivo"), res);
      return;
    }

    this.eventsService.getById(codigo)
    .then((event) => res.status(200).json(event))
    .catch((error) => HandleError.error(error, res));
  };

  private parseFilters(req: Request): EventFilters {
    const { ciudad, estado } = req.query;
    const filters: EventFilters = {};

    if (typeof ciudad === "string" && ciudad.trim()) {
      filters.ciudad = ciudad.trim();
    }

    if (typeof estado === "string" && estado.trim()) {
      if (!EVENT_STATES.includes(estado as EventState)) {
        throw CustomError.badRequest(`Estado inválido. Valores permitidos: ${EVENT_STATES.join(", ")}`);
      }
      filters.estado = estado as EventState;
    }

    return filters;
  }

}

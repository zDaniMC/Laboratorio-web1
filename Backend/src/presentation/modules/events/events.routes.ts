import { Router } from "express";
import { EventsController } from "./events.controller";

export class EventsRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new EventsController();

    router.get("/", controller.getAll);

    router.get("/:codigo", controller.getById);

    return router;
  }
}

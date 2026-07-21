import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // 'use' para indicar la ruta y como segundo argumento las rutas en callback
    router.use("/api/todos", TodoRoutes.routes);

    return router;
  }
}

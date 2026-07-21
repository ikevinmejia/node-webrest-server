import { Router } from "express";
import { TodoDatasourceImpl } from "src/infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "src/infrastructure/repositories/todo.repository.impl";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource);

    const todoController = new TodosController(todoRepository);

    // EL CONTROLADOR ES EL CALLBACK de lo que retorna la ruta
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);

    // Create
    router.post("/", todoController.createTodo);
    // Actualizar
    router.put("/:id", todoController.updateTodo);
    // Eliminar
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}

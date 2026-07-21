import { Request, Response } from "express";
import {
  CreateTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "src/domain";
import { CreateTodoDto, UpdateTodoDto } from "src/domain/dtos";
import { DeleteTodo } from "../../domain/use-cases/todo/delete-todo";

type Todo = {
  id: number;
  text: string;
  completedAt: Date | null;
};

export class TodosController {
  // * Inyeccion de dependencias
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, resp: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => resp.json(todos))
      .catch((error) => resp.status(400).json({ error }));
  };

  public getTodoById = (req: Request, resp: Response) => {
    const id = +req.params.id;
    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todos) => resp.json(todos))
      .catch((error) => resp.status(400).json({ error }));
  };

  public createTodo = (req: Request, resp: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return resp.status(400).json({ error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => resp.json(todo))
      .catch((error) => resp.status(401).json({ error }));
  };

  public updateTodo = (req: Request, resp: Response) => {
    const id = +req.params.id;

    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error) return resp.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todos) => resp.json(todos))
      .catch((error) => resp.status(400).json({ error }));
  };

  public deleteTodo = (req: Request, resp: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => resp.json(todo))
      .catch((error) => resp.status(400).json({ error }));
  };
}

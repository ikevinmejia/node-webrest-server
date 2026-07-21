import { TodoEntity } from "src/domain/entities/todo.entity";
import { TodoRepository } from "src/domain/repositories/todo.repository";

export interface GetTodosUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }
}

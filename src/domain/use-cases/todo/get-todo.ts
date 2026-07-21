import { TodoEntity } from "src/domain/entities/todo.entity";
import { TodoRepository } from "src/domain/repositories/todo.repository";

export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.findById(id);
  }
}

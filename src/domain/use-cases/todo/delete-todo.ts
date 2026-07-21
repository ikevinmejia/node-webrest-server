import { TodoEntity } from "src/domain/entities/todo.entity";
import { TodoRepository } from "src/domain/repositories/todo.repository";

export interface DeleteTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  }
}

import { CreateTodoDto } from "src/domain/dtos";
import { TodoEntity } from "src/domain/entities/todo.entity";
import { TodoRepository } from "src/domain/repositories/todo.repository";

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}

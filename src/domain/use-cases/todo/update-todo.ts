import { UpdateTodoDto } from "src/domain/dtos";
import { TodoEntity } from "src/domain/entities/todo.entity";
import { TodoRepository } from "src/domain/repositories/todo.repository";

export interface UpdateTodoUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.updateById(dto);
  }
}
